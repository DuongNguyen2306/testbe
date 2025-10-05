# 🚀 Hướng dẫn Deploy Back2Use lên Render với Resend

## 📋 Tổng quan
Dự án Back2Use đã được cấu hình để sử dụng **Resend** thay vì SMTP cho việc gửi email, giúp tránh bị chặn bởi Render.

## 🔧 Cấu hình Environment Variables trên Render

### 1. Truy cập Render Dashboard
- Đăng nhập vào [render.com](https://render.com)
- Chọn service Back2Use của bạn
- Vào tab **Environment**

### 2. Thêm các biến môi trường sau:

#### **Cấu hình cơ bản:**
```bash
NODE_ENV=production
PORT=3000
```

#### **Database (MongoDB Atlas):**
```bash
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/back2use?retryWrites=true&w=majority
```

#### **JWT Configuration:**
```bash
JWT_ACCESS_SECRET=your_super_secure_access_secret_key_here_change_this_in_production
JWT_ACCESS_EXPIRES_IN=1h
JWT_REFRESH_SECRET=your_super_secure_refresh_secret_key_here_change_this_in_production
JWT_REFRESH_EXPIRES_IN=7d
```

#### **Resend Email (Thay thế SMTP):**
```bash
RESEND_API_KEY=re_Yi4bng8K_MuBTcY5bEa65r4NE9qKfc4ZL
DEFAULT_FROM_EMAIL=onboarding@resend.dev
DEFAULT_FROM_NAME=Back2Use Team
```

#### **Google OAuth:**
```bash
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_CALLBACK_URL=https://your-app-name.onrender.com/auth/google-redirect
```

#### **Cloudinary:**
```bash
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

#### **CORS & Security:**
```bash
CORS_ORIGIN=https://your-frontend-domain.com,https://your-app-name.onrender.com
LOG_LEVEL=info
ENABLE_SWAGGER=false
ENABLE_CORS=true
```

## 🔑 Lấy Resend API Key

1. Truy cập [resend.com](https://resend.com)
2. Đăng ký/Đăng nhập tài khoản
3. Vào **API Keys** section
4. Tạo API key mới
5. Copy API key và paste vào `RESEND_API_KEY`

## 📧 Cấu hình Domain cho Resend (Tùy chọn)

### Sử dụng domain mặc định:
- Email sẽ được gửi từ `onboarding@resend.dev`
- Hoạt động ngay lập tức, không cần cấu hình thêm

### Sử dụng domain riêng:
1. Vào Resend Dashboard > **Domains**
2. Thêm domain của bạn (VD: `yourdomain.com`)
3. Cấu hình DNS records theo hướng dẫn
4. Cập nhật `DEFAULT_FROM_EMAIL=noreply@yourdomain.com`

## 🚀 Deploy Steps

1. **Push code lên GitHub:**
   ```bash
   git add .
   git commit -m "feat: integrate Resend email service"
   git push origin main
   ```

2. **Render sẽ tự động deploy** khi detect thay đổi

3. **Kiểm tra logs** trong Render Dashboard để đảm bảo không có lỗi

## 🧪 Test Email Service

Sau khi deploy, test email service:

```bash
POST https://your-app-name.onrender.com/mailer/test
Content-Type: application/json

{
  "email": "your-email@example.com"
}
```

## ✅ Lợi ích của Resend so với SMTP

- ✅ **Không bị chặn** bởi Render
- ✅ **Deliverability cao** hơn
- ✅ **API đơn giản** và dễ sử dụng
- ✅ **Analytics** và tracking email
- ✅ **Webhook** support
- ✅ **Rate limiting** thông minh
- ✅ **Developer experience** tốt hơn

## 🔍 Troubleshooting

### Lỗi thường gặp:

1. **"Invalid API key"**
   - Kiểm tra `RESEND_API_KEY` có đúng không
   - Đảm bảo API key có quyền gửi email

2. **"Email not delivered"**
   - Kiểm tra email address có hợp lệ không
   - Xem logs trong Resend Dashboard

3. **"CORS error"**
   - Cập nhật `CORS_ORIGIN` với domain frontend chính xác

### Kiểm tra logs:
```bash
# Trong Render Dashboard > Logs
# Hoặc sử dụng Render CLI
render logs --service your-service-name
```

## 📞 Support

- **Resend Documentation:** [resend.com/docs](https://resend.com/docs)
- **Render Documentation:** [render.com/docs](https://render.com/docs)
- **Back2Use Issues:** Tạo issue trên GitHub repo

---

**🎉 Chúc mừng!** Bạn đã thành công migrate từ SMTP sang Resend và deploy lên Render!
