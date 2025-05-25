fetch('../../components/modal.html')
  .then((res) => res.text())
  .then((html) => {
    document.getElementById('modalContainer').innerHTML = html;
  });

function showModal(title, content, onConfirm) {
  const modal = new bootstrap.Modal(document.getElementById('commonModal'));
  document.getElementById('commonModalLabel').innerText = title;
  document.querySelector('#commonModal .modal-body').innerText = content;
  const btn = document.getElementById('modalConfirmBtn');
  btn.onclick = () => {
    if (onConfirm) onConfirm();
    modal.hide();
  };
  modal.show();
}

document.addEventListener('DOMContentLoaded', () => {
  const sendForm = document.getElementById('sendCodeForm');
  const resetForm = document.getElementById('resetForm');

  sendForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    if (!email) return;
    try {
      const res = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        showModal('Thành công', 'Mã xác thực đã được gửi tới email của bạn.');
        sendForm.style.display = 'none';
        resetForm.style.display = 'block';
      } else {
        showModal('Lỗi', data.message || 'Không thể gửi mã xác thực');
      }
    } catch (err) {
      console.error(err);
      showModal('Lỗi', 'Không thể kết nối tới máy chủ');
    }
  });

  resetForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const code = document.getElementById('code').value.trim();
    const newPassword = document.getElementById('newPassword').value.trim();
    if (!code || !newPassword) return;
    try {
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, newPassword }),
      });
      const data = await res.json();
      if (data.success) {
        showModal('Thành công', 'Đặt lại mật khẩu thành công', () => {
          window.location.href = 'login.html';
        });
      } else {
        showModal('Lỗi', data.message || 'Không thể đặt lại mật khẩu');
      }
    } catch (err) {
      console.error(err);
      showModal('Lỗi', 'Không thể kết nối tới máy chủ');
    }
  });
});
