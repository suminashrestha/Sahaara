import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const sendVerificationCode = (email: string, code: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.ETHEREAL_USER as string,
      pass: process.env.ETHEREAL_PASS as string,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const main = async () => {
    try {
      const info = await transporter.sendMail({
        from: '"Sahaara 🐶" <sahaara201@gmail.com>',
        to: email,
        subject: "Your Verification Code",
        text: `Your verification code is ${code}`,
        html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
        <h2 style="color: #333; font-size: 24px; margin-bottom: 20px;">Hello there!</h2>
        <p style="margin-bottom: 20px;">Thank you for signing up. Please use the following verification code to confirm your email address:</p>
        <div style="background-color: #f4f4f4; padding: 10px 20px; border-radius: 5px; margin-bottom: 20px;">
            <p style="font-size: 24px; font-weight: bold; color: #555; margin: 0;">${code}</p>
        </div>
        <p style="margin-bottom: 20px;">If you did not request this, simply ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="color: #777; margin-bottom: 0;">Best regards,<br />Sahaara</p>
        <p style="color: #777; font-size: 14px; margin-top: 5px;">(This is an automated message. Please do not reply.)</p>
    </div>
    
        `,
      });

      console.log("Message sent: %s", info.messageId);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  main().catch(console.error);
};

export { sendVerificationCode };
