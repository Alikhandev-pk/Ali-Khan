/** True only when every variable needed to deliver contact-form messages is set (server-side only). */
export function isContactConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL && process.env.CONTACT_FROM_EMAIL);
}
