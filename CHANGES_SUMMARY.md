# 🔧 Tóm tắt các thay đổi để fix lỗi build trên Render

## ❌ **Lỗi gặp phải:**
```
src/modules/admin/admin.service.ts:35:14 - error TS2322: Type '{ name: string; address: string; }' is not assignable to type 'string'.
35         to: [{ name: businessForm.storeName, address: businessForm.storeMail }],
```

## ✅ **Đã sửa:**

### 1. **Cập nhật MailerDto** (`src/modules/mailer/dto/mailer.dto.ts`)
```typescript
// CŨ (Nodemailer)
export class MailerDto {
  from?: Address;
  to: Address[];
  subject: string;
  text?: string;
  html?: string;
  placeholder?: Record<string, string>;
}

// MỚI (Resend)
export class MailerDto {
  from?: string;
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  placeholder?: Record<string, string>;
}
```

### 2. **Cập nhật MailerService** (`src/modules/mailer/mailer.service.ts`)
```typescript
// Thay thế Nodemailer bằng Resend
import { Resend } from 'resend';

@Injectable()
export class MailerService {
  private resend: Resend;

  constructor(private readonly configService: ConfigService) {
    this.resend = new Resend(this.configService.get('RESEND_API_KEY'));
  }

  async sendMail(mailer: MailerDto) {
    // Sử dụng Resend API thay vì Nodemailer
  }
}
```

### 3. **Cập nhật AuthService** (`src/modules/auth/auth.service.ts`)
```typescript
// CŨ
const mailer: MailerDto = {
  to: [{ name: authDto.name, address: authDto.email }],
  subject: 'Account Verification OTP',
  html,
};

// MỚI
const mailer: MailerDto = {
  to: authDto.email,
  subject: 'Xác nhận đăng ký tài khoản - Back2Use',
  html,
};
```

### 4. **Cập nhật AdminService** (`src/modules/admin/admin.service.ts`)
```typescript
// CŨ
const mailResult = await this.mailerService.sendMail({
  to: [{ name: businessForm.storeName, address: businessForm.storeMail }],
  subject: 'Business Approved',
  html: businessApprovedTemplate(businessForm.storeName),
});

// MỚI
const mailResult = await this.mailerService.sendMail({
  to: businessForm.storeMail,
  subject: 'Business Approved - Back2Use',
  html: businessApprovedTemplate(businessForm.storeName),
});
```

## 🚀 **Các bước tiếp theo:**

1. **Commit và push code:**
   ```bash
   git add .
   git commit -m "fix: update MailerDto to use Resend instead of Nodemailer"
   git push origin main
   ```

2. **Cấu hình Environment Variables trên Render:**
   - Thêm `RESEND_API_KEY=re_Yi4bng8K_MuBTcY5bEa65r4NE9qKfc4ZL`
   - Thêm `DEFAULT_FROM_EMAIL=onboarding@resend.dev`
   - Xóa các biến SMTP cũ (MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS)

3. **Render sẽ tự động build lại** và không còn lỗi TypeScript

## 📧 **Lợi ích của Resend:**
- ✅ Không bị Render chặn (như SMTP)
- ✅ API đơn giản hơn
- ✅ Deliverability cao hơn
- ✅ Developer experience tốt hơn
- ✅ Analytics và tracking

## 🔍 **Kiểm tra:**
Sau khi deploy, test email service:
```bash
POST https://your-app.onrender.com/mailer/test
Content-Type: application/json

{
  "email": "test@example.com"
}
```
