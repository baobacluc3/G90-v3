Petcare
├── assets/ # Tài nguyên tĩnh
│ ├── images/ # Hình ảnh giao diện
│ │ ├── logo.png # Logo hệ thống
│ │ └── pet-icon.png # Icon thú cưng
│ ├──
│ └──
├── css/
│ └── custom.css # CSS tùy chỉnh giao diện
├── js/ # Scripts chức năng
│ ├── api.js # Xử lý gọi API
│ ├── utils.js # Hàm tiện ích
│ ├── auth.js # Đăng nhập, đăng ký, quên mật khẩu
│ ├── profile.js # Quản lý thông tin cá nhân
│ ├── pet.js # Hồ sơ thú cưng
│ ├── vaccination.js # Tiêm phòng thú cưng
│ ├── services.js # Dịch vụ/sản phẩm thú cưng
│ ├── booking.js # Đặt lịch khám bệnh
│ ├── cart.js # Giỏ hàng, thanh toán
│ ├── order.js # Theo dõi đơn hàng
│ ├── promotion.js # Ưu đãi, khuyến mãi
│ ├── review.js # Đánh giá, phản hồi
│ ├── project.js # Quản lý dự án
│ ├── chatbot.js # Chatbot AI (Admin)
│ ├── user.js # Quản lý người dùng
│ ├── report.js # Báo cáo, thống kê
│ ├── security.js # Phân quyền, bảo mật
│ ├── invoice.js # Hóa đơn, mã QR
│ ├── category.js # Danh mục sản phẩm/dịch vụ
│ ├── clinic.js # Cơ sở thú y
│ ├── inventory.js # Kho hàng
│ ├── promo.js # Chương trình khuyến mãi
│ ├── customer.js # Khách hàng
│ ├── health.js # Sức khỏe thú cưng
│ ├── appointment.js # Lịch hẹn thú y
│ ├── order-process.js # Xử lý đơn hàng
│ ├── chatbot-support.js # Chatbot hỗ trợ tư vấn
│ └── payment.js # Thanh toán & hóa đơn
├── pages/
│ ├── auth/ # Xác thực người dùng
│ │ ├── login.html # PB01 - Đăng nhập
│ │ ├── register.html # PB02 - Đăng ký
│ │ └── forgot-password.html# PB03 - Quên mật khẩu
│ ├── user/ # Giao diện người dùng
│ │ ├── profile.html # PB04 - Thông tin cá nhân _
│ │ ├── pet-profile.html # PB05 - Hồ sơ thú cưng _
│ │ ├── vaccination.html # PB06 - Lịch tiêm phòng*
│ │ ├── services.html # PB07 - Dịch vụ, sản phẩm
│ │ ├── booking.html # PB08 - Đặt lịch khám *
│ │ ├── cart.html # PB09 - Giỏ hàng _
│ │ ├── orders.html # PB10 - Trạng thái đơn hàng
│ │ ├── promotions.html # PB11 - Sự kiện và khuyến mãi _
│ │ ├── review.html # PB12 - Đánh giá, phản hồi
│ │ └── chatbot-suport.html # PB13 - Tư vấn qua chatbot
clinics.html # PB19 - Cơ sở thú y
│ ├── admin/ # Quản trị hệ thống
│ │ ├── project.html # PB - Hiển thị dashboard của dự án
│ │ ├── users.html # PB14 - Quản lý người dùng
│ │ ├── reports.html # PB15 - Báo cáo thống kê
│ │ ├── security.html # PB16 - Phân quyền bảo mật
│ │ ├── invoices.html # PB17 - Hóa đơn, mã QR
│ │ ├── categories.html # PB18 - Danh mục sản phẩm/dịch vụ
│ │ ├── clinics.html # PB19 - Cơ sở thú y
│ │ ├── inventory.html # PB20 - Kho hàng
│ │ ├── promos.html # PB21 - Chương trình khuyến mãi
│ │ ├── customers.html # PB22 - Khách hàng
│ │ ├── pet-health.html # PB23 - Sức khỏe thú cưng
│ │ ├── appointments.html # PB24 - Lịch hẹn thú y
│ │ ├── order-process.html # PB25 - Xử lý đơn hàng
│ │ ├── chatbot.html # PB26 - Chatbot AI (admin)
│ │ └── payments.html # PB27 - Xác nhận thanh toán
│ ├── home.html # Trang chủ
│ └── 404.html # Trang lỗi
├── components/ # Thành phần tái sử dụng
│ ├── header.html # Thanh điều hướng
│ ├── footer.html # Chân trang
│ ├── sidebar.html # Menu bên trái (admin)
│ └── modal.html # Modal dùng chung
├── index.html # Trang chính (chuyển hướng login)
├── package.json # Thông tin dependencies
└── README.md # Tài liệu mô tả dự án
\n### Cấu hình Email\nTạo file `.env` với biến `EMAIL_USER` và `EMAIL_PASS` để gửi mã khôi phục mật khẩu.
