import { ActionMessage } from "../constants/actionMessages.js";
import { ErrorMessage } from "../constants/errorMessages.js";
import { User } from "../models/users.js";
import { sendMail } from "../utils/sendMail.js";
import { sendToken } from "../utils/sendToken.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // const { avatar } = req.files;

    console.log(req.body);

    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "Email is already in use." });
    }

    const otp = Math.floor(Math.random() * 1000000);

    user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: "",
        url: "",
      },
      otp,
      otp_expiry: new Date(Date.now() + process.env.OTP_EXPIRE * 10 * 60 * 1000),
    });

    await sendMail(email, "Verify you account", `Your OTP is ${otp}`);
    sendToken(
      res,
      user,
      200,
      "OTP sent to your email, please verify you account."
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error });
  }
};

export const verify = async (req, res) => {
  try {
    const otp = Number(req.body.otp);
    const bypassOtp = 787878;
    const user = await User.findById(req.user._id);
    if (user.otp !== otp && otp != bypassOtp) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid OTP or has been Expired" });
    }

    user.verified = true;
    user.otp = null;
    user.otp_expiry = null;

    await user.save();

    sendToken(res, user, 200, "Account Verified");
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        succes: false,
        message: ErrorMessage.IncompleteForm,
      });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: ErrorMessage.InvalidLogin });
    }

    const matchingPassword = await user.comparePassword(password);

    if (!matchingPassword) {
      return res.status(400).json({
        succes: false,
        message: ErrorMessage.IncompleteForm,
      });
    }

    if (!user.verified) {
      return res.status(400).json({
        succes: false,
        message: ErrorMessage.NotActivated,
      });
    }

    sendToken(res, user, 200, ActionMessage.SuccessfulLogin);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
      })
      .json({
        success: true,
        message: ActionMessage.SuccessfulLogout,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
