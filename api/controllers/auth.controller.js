import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";
import prisma from "../lib/prisma.js";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const otpStore = {};

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create user!" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }

    console.log('User fetched for login:', user);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password validation result:', isPasswordValid);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: false,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    const { password: userPassword, ...userInfo } = user;

    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json(userInfo);
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Failed to login!" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};

export const sendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ message: "Email not registered!" });
    }

    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    otpStore[email] = otp;

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Your OTP for Password Reset",
      text: `Your OTP is ${otp}`
    });

    res.status(200).json({ message: "OTP sent to your email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send OTP!" });
  }
};

export const verifyOtpAndResetPassword = async (req, res) => {
  const { email, otp, password } = req.body;

  try {
    if (otpStore[email] !== otp) {
      return res.status(400).json({ message: "Invalid OTP!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed Password:', hashedPassword);

    const updatedUser = await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    console.log('Password updated in database for:', updatedUser.email);
    console.log('New hashed password in database:', updatedUser.password);

    delete otpStore[email];

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: 'Error resetting password' });
  }
};
