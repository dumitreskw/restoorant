export const sendToken = (res, user, statusCode, message) => {
  const token = user.getJWTToken();
  console.log(token);
  const userData = {
    _id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
  };

  const options = {
    httpOnly: true,
    expires: new Date(Date.now() + process.env.JWT_EXPIRE * 60 * 1000),
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, message, user: userData });
};
