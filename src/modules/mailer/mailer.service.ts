import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import { MailerDto } from './dto/mailer.dto';

@Injectable()
export class MailerService {
  private resend: Resend;

  constructor(private readonly configService: ConfigService) {
    this.resend = new Resend('re_Yi4bng8K_MuBTcY5bEa65r4NE9qKfc4ZL');
  }

  async sendMail(mailer: MailerDto) {
    const { from, to, subject, text, html } = mailer;
    
    try {
      const emailOptions: any = {
        from: from || 'onboarding@resend.dev',
        to: Array.isArray(to) ? to : [to],
        subject,
      };

      // Add text or html content
      if (html) {
        emailOptions.html = html;
      }
      if (text) {
        emailOptions.text = text;
      }

      const { data, error } = await this.resend.emails.send(emailOptions);

      if (error) {
        console.error('Resend error:', error);
        throw new Error(`Failed to send email: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('MailerService error:', error);
      throw error;
    }
  }
}