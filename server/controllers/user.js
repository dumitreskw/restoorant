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
      otp_expiry: new Date(Date.now() + process.env.OTP_EXPIRE * 60 * 1000),
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
    res.status(500).json({ success: false, message: error });
  }
};
