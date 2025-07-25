import User from "../model/user.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { generateToken } from "../security/jwt-util.js";

const saltRounds = 10;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rijankrishna14@gmail.com",
    pass: "tglhchrqalvdaqce",
  },
});

// Generate OTP
const generateOTP = () => crypto.randomInt(100000, 999999).toString();

const sendOtp = (email, otp) => {
  transporter.sendMail({
    from: "Finder Keeper",
    to: email,
    subject: "OTP Verification",
    text: `Your OTP is: ${otp}`,
  });
};

export const sendOtps = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user || user == null) {
    res.status(400).json({ message: "User not found" });
  }
  const otp = generateOTP();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
  transporter.sendMail({
    from: "Finder Keeper",
    to: email,
    subject: "OTP Verification",
    text: `Your OTP is: ${otp}`,
  });
  await User.update({ otp }, { where: { email } });
  res.status(200).json({ message: "Otp has been sent to your email" });
};

export const addUser = async (req, res) => {
  const { fullname, email, password } = req.body;

  let user = await User.findOne({ where: { email } });
  const otp = generateOTP();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
  console.log(user != null);
  if (user != null) {
    if (user.dataValues.isVerified === false) {
      await sendOtp(email);
      return res
        .status(203)
        .json({ message: "User already exists but not verified" });
    }
    return res.status(400).json({ message: "User already exists" });
  }

  try {
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        console.log("Error hashing password", err);
      } else {
        await User.create({
          fullname,
          email,
          password: hash,
          otp,
          otpExpiry,
        });
        await sendOtp(email, otp);
        return res
          .status(201)
          .json({ message: "User registered successfully" });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    console.log(req.body);
    console.log(email, otp);

    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(400).json({ message: "User not found" });
    if (user.isVerified)
      return res.status(400).json({ message: "User already verified" });

    if (user.otp !== otp || user.otpExpiry < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    await User.update(
      {
        isVerified: true,
        otp: null,
        otpExpiry: null,
      },
      {
        where: {
          email,
        },
      }
    );

    res
      .status(201)
      .json({ message: "Email verified successfully. You can now log in." });
  } catch (error) {
    res.status(500).json({ message: "Error verifying OTP", error });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body.formData;
  try {
    let user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "user does not exists" });
    const storedHashedPassword = user.password;
    bcrypt.compare(password, storedHashedPassword, (err, result) => {
      if (err) {
        console.error("Error comparing passwords:", err);
      } else {
        if (result) {
          const token = generateToken({ id: user.id });
          return res.status(201).json({
            fullname: user.fullname,
            user_id: user.id,
            email: user.email,
            contact: user.contact,
            token,
          });
        } else {
          res.status(400).json({ message: "Incorrect password" });
        }
      }
    });
  } catch (error) {}
};
export const resetPassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    const [updated] = await User.update(
      { password: hash },
      { where: { email } }
    );

    if (updated) {
      res.status(200).json({ message: "Password updated successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Server error" });
  }
};
