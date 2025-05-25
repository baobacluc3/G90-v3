const express = require('express');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const db = require('../db');

const router = express.Router();

// In-memory store for reset codes
const resetCodes = new Map();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Thiếu email hoặc password' });
  }
  const query = 'SELECT * FROM TaiKhoan WHERE Gmail = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Lỗi login:', err);
      return res.status(500).json({ success: false, message: 'Lỗi database' });
    }
    if (results.length === 0) {
      return res.json({ success: false, message: 'Sai email hoặc password' });
    }
    const user = results[0];
    const role = user.ID_ChucVu === 1 ? 'admin' : 'user';
    bcrypt.compare(password, user.MatKhau, (err, match) => {
      if (err || !match) {
        return res.json({ success: false, message: 'Sai email hoặc password' });
      }
      return res.json({ success: true, user: { ...user, role } });
    });
  });
});

router.post('/register', (req, res) => {
  const { hoTen, gmail, dienThoai, matKhau, chucVu } = req.body;
  if (!hoTen || !gmail || !matKhau) {
    return res.status(400).json({ success: false, message: 'Thiếu thông tin bắt buộc: Họ tên, email và mật khẩu' });
  }
  const checkEmailQuery = 'SELECT ID_TaiKhoan FROM TaiKhoan WHERE Gmail = ?';
  db.query(checkEmailQuery, [gmail], (err, existing) => {
    if (err) {
      console.error('Lỗi kiểm tra email:', err);
      return res.status(500).json({ success: false, message: 'Lỗi kiểm tra email' });
    }
    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: 'Email này đã được sử dụng' });
    }
    bcrypt.hash(matKhau, 10, (err, hash) => {
      if (err) {
        console.error('Lỗi hash mật khẩu:', err);
        return res.status(500).json({ success: false, message: 'Lỗi tạo tài khoản' });
      }
      const insertQuery = 'INSERT INTO TaiKhoan (HoTen, Gmail, DienThoai, MatKhau, ID_ChucVu) VALUES (?, ?, ?, ?, ?)';
      db.query(insertQuery, [hoTen, gmail, dienThoai || null, hash, chucVu || 3], (err2, result) => {
        if (err2) {
          console.error('Lỗi tạo tài khoản:', err2);
          return res.status(500).json({ success: false, message: 'Lỗi tạo tài khoản' });
        }
        console.log('Tạo tài khoản thành công, ID:', result.insertId);
        return res.json({ success: true, message: 'Đăng ký tài khoản thành công', userId: result.insertId });
      });
    });
  });
});

router.post('/forgot-password', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: 'Thiếu email' });
  }
  const query = 'SELECT ID_TaiKhoan FROM TaiKhoan WHERE Gmail = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Lỗi tìm email:', err);
      return res.status(500).json({ success: false, message: 'Lỗi database' });
    }
    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'Email không tồn tại' });
    }
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    resetCodes.set(email, { code, expires: Date.now() + 15 * 60 * 1000 });
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Mã đặt lại mật khẩu',
      text: `Mã xác thực của bạn là: ${code}. Mã có hiệu lực trong 15 phút.`,
    };
    transporter.sendMail(mailOptions, (err2) => {
      if (err2) {
        console.error('Lỗi gửi email:', err2);
        return res.status(500).json({ success: false, message: 'Không gửi được email' });
      }
      return res.json({ success: true, message: 'Đã gửi mã xác thực' });
    });
  });
});

router.post('/reset-password', (req, res) => {
  const { email, code, newPassword } = req.body;
  if (!email || !code || !newPassword) {
    return res.status(400).json({ success: false, message: 'Thiếu thông tin' });
  }
  const entry = resetCodes.get(email);
  if (!entry || entry.code !== code || entry.expires < Date.now()) {
    return res.status(400).json({ success: false, message: 'Mã xác thực không hợp lệ hoặc đã hết hạn' });
  }
  resetCodes.delete(email);
  bcrypt.hash(newPassword, 10, (err, hash) => {
    if (err) {
      console.error('Lỗi hash mật khẩu:', err);
      return res.status(500).json({ success: false, message: 'Lỗi cập nhật mật khẩu' });
    }
    const updateQuery = 'UPDATE TaiKhoan SET MatKhau = ? WHERE Gmail = ?';
    db.query(updateQuery, [hash, email], (err2) => {
      if (err2) {
        console.error('Lỗi cập nhật mật khẩu:', err2);
        return res.status(500).json({ success: false, message: 'Không thể cập nhật mật khẩu' });
      }
      return res.json({ success: true, message: 'Đặt lại mật khẩu thành công' });
    });
  });
});

module.exports = router;
