const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();

const allowedOrigin = process.env.ALLOWED_ORIGIN || "";

app.use(
  cors({
    origin: allowedOrigin ? allowedOrigin.split(",").map((item) => item.trim()) : false,
  }),
);
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: Number(process.env.SMTP_PORT || 587) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const toAddress = process.env.SMTP_TO || "sebastian.kolut@gmail.com";

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Uzupełnij wszystkie pola." });
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: toAddress,
      replyTo: email,
      subject: `Nowa wiadomość ze strony od ${name}`,
      text: `Imię i nazwisko: ${name}\nEmail: ${email}\n\nWiadomość:\n${message}`,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ error: "Nie udało się wysłać wiadomości." });
  }
});

const port = Number(process.env.PORT || 3001);
app.listen(port, () => {
  console.log(`Backend działa na porcie ${port}`);
});
