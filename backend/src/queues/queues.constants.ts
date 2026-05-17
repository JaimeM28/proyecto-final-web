export const MAIL_QUEUE = 'mail';

export enum MailJob {
  EMAIL_VERIFICATION = 'email-verification',
  PASSWORD_RESET = 'password-reset',
  SERVICE_REQUEST_CREATED = 'service-request-created',
  SERVICE_REQUEST_ACCEPTED = 'service-request-accepted',
  SERVICE_REQUEST_REJECTED = 'service-request-rejected',
}
