import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

interface IRecuiterData {
  userId: string;
  userType: "individual" | "organization";
  numberOfFamily: number;
  residence: string;
  homeStatus: string;
  haveOtherPets: string;
  allergies: string;
  petExperience: string;
}

const sendMailToUser = (to: string, data: IRecuiterData) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
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
        to: to,
        subject: "Someone is interested in Adopting your pet 🐶",
        html: `
          <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
            <h2 style="color: #333; font-size: 24px; margin-bottom: 20px;">Hello there!</h2>
            <p style="margin-bottom: 20px;">Someone is interested in adopting your pet. Here are the details:</p>
            <ul style="background-color: #f4f4f4; padding: 10px 20px; border-radius: 5px; margin-bottom: 20px; list-style-type: none;">
              <li><strong>User's Type:</strong> ${data.userType.toUpperCase()}</li>
              <li><strong>User Profile:<a href="http://localhost:5173/userprofile/${
                data.userId
              }">Click here to see user's profile</a> </strong> </li>
              <li><strong>Number of Family Members:</strong> ${
                data.numberOfFamily
              }</li>
              <li><strong>Residence:</strong> ${data.residence}</li>
              <li><strong>Home Status:</strong> ${data.homeStatus}</li>
              <li><strong>Other Pets:</strong> ${data.haveOtherPets}</li>
              <li><strong>Allergies:</strong> ${data.allergies}</li>
              <li><strong> Pet Experience:</strong> ${
                data.petExperience
              }</li>
            </ul>
            <p style="margin-bottom: 20px;">Please contact the interested person for more details.</p>
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

export { sendMailToUser };
