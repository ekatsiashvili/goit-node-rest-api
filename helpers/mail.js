import nodemailer from "nodemailer";

const config = {
  host: process.env.MAIL_SERVER_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_SERVER_USER,
    pass: process.env.MAIL_SERVER_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

export const sendVerificationMail = async (email, verificationToken) => {
  const emailOptions = {
    from: process.env.MAIL_SERVER_USER,
    to: email,
    subject: "Email verification",
    html: `
    <div style="
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      padding: 20px;
      font-family: Arial, sans-serif;">
    <h1>Ласкаво просимо!</h1>
    <p>Дякуємо за реєстрацію. Щоб активувати свій акаунт, натисніть на кнопку нижче:</p>
    <p>
      <a style="
      display: inline-block;
      padding: 10px 20px;
      background-color: #007BFF;
      color: #ffffff;
      text-decoration: none;
      border-radius: 4px;
      margin-top: 20px;
      margin-bottom: 20px;"
      href="http://localhost:3000/api/auth/verify/${verificationToken}">
        Активувати акаунт
      </a>
    </p>
    <p>З найкращими побажаннями,<br>Команда підтримки</p>
    </div>
    `,
  };

  transporter
    .sendMail(emailOptions)
    .then((info) => console.log(info))
    .catch((err) => console.log(err));
};
