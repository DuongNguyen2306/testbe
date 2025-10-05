import { Body, Controller, Post } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerDto } from './dto/mailer.dto';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('test')
  async testEmail(@Body() body: { email: string }) {
    try {
      const mailer: MailerDto = {
        to: body.email,
        subject: 'Test Email từ Back2Use - Resend Integration',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #333; text-align: center;">🎉 Test Email thành công!</h1>
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="font-size: 16px; color: #333; margin: 0 0 15px 0;">Xin chào,</p>
              <p style="font-size: 16px; color: #666; margin: 0 0 20px 0;">Đây là email test để kiểm tra tích hợp Resend với Back2Use.</p>
              <p style="font-size: 16px; color: #666; margin: 0 0 20px 0;">Nếu bạn nhận được email này, có nghĩa là Resend đã hoạt động tốt!</p>
            </div>
            <div style="text-align: center; padding: 20px; border-top: 1px solid #eee;">
              <p style="color: #666; margin: 0; font-size: 14px;">Trân trọng,<br><strong>Đội ngũ Back2Use</strong></p>
            </div>
          </div>
        `,
      };

      const result = await this.mailerService.sendMail(mailer);
      return {
        success: true,
        message: 'Test email đã được gửi thành công!',
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Lỗi gửi test email: ' + error.message,
      };
    }
  }
}
