import { createTransport } from "nodemailer";
import { generateVerificationToken } from "./tokens";

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

export async function sendVerificationEmail(email) {
  const token = await generateVerificationToken(email);
  const url = `${process.env.NEXTAUTH_URL}/auth/verify-email?token=${token}`;

  await transporter.sendMail({
    from: `"Todo App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your email",
    html: `Click <a href="${url}">here</a> to verify your email.`
  });
}

export async function sendPasswordResetEmail(email) {
  const token = await generateVerificationToken(email);
  const url = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;

  await transporter.sendMail({
    from: `"Todo App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Reset your password",
    html: `Click <a href="${url}">here</a> to reset your password.`
  });
}