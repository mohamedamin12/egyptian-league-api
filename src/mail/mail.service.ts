import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, RequestTimeoutException } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailService: MailerService) {}

  /**
   * sending email after logged in his account
   * @param email of the registered user
   */
  async sendLoginEmail(email: string) {
    try {
      const today = new Date();
      await this.mailService.sendMail({
        to: email,
        from: `<no-reply@my-nest-app.com>`,
        subject: 'log in',
        template: 'login',
        context: { email, today },
      });
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException();
    }
  }

  /**
   * sending verify email template
   * @param email the logged in user
   * @param link link with id of the user verification token
   */
  async verifyEmailTemplate(email: string, link: string) {
    try {
      await this.mailService.sendMail({
        to: email,
        from: `<no-reply@my-nest-app.com>`,
        subject: 'verify email account',
        template: 'verify-email',
        context: { link },
      });
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException();
    }
  }

  /**
   * sending reset password template
   * @param email the logged in user
   * @param restPasswordLink link with id of the user and rest password
   */
  async resetPasswordTemplate(email: string , restPasswordLink: string) {
    try {
      await this.mailService.sendMail({
        to: email,
        from: `<no-reply@my-nest-app.com>`,
        subject: 'Reset Password', 
        template: 'reset-password',
        context: {restPasswordLink}
      });
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException();
    }
  }
}
