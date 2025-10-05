export function otpEmailTemplate(name: string, otp: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Xác nhận đăng ký tài khoản</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #333; margin: 0;">🎉 Chào mừng đến với Back2Use!</h1>
        </div>
        
        <div style="padding: 20px; background-color: #f8f9fa; border-radius: 8px; margin-bottom: 20px;">
          <p style="font-size: 16px; color: #333; margin: 0 0 15px 0;">Xin chào <strong>${name}</strong>,</p>
          <p style="font-size: 16px; color: #666; margin: 0 0 20px 0;">Cảm ơn bạn đã đăng ký tài khoản! Để hoàn tất quá trình đăng ký, vui lòng sử dụng mã OTP bên dưới:</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <div style="display: inline-block; background-color: #007bff; color: white; padding: 15px 30px; border-radius: 8px; font-size: 24px; font-weight: bold; letter-spacing: 3px;">${otp}</div>
          </div>
          
          <p style="font-size: 14px; color: #666; margin: 20px 0 0 0;">Mã này có hiệu lực trong 5 phút. Nếu bạn không yêu cầu đăng ký tài khoản, vui lòng bỏ qua email này.</p>
        </div>
        
        <div style="text-align: center; padding: 20px; border-top: 1px solid #eee;">
          <p style="color: #666; margin: 0; font-size: 14px;">Trân trọng,<br><strong>Đội ngũ Back2Use</strong></p>
        </div>
      </div>
    </body>
    </html>
  `;
}
