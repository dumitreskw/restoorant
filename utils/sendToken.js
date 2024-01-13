export const sendToken = (res, user, statusCode, message) => {
  const token = user.getJWTToken();
  
  const userData = {
    _id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    role: user.role
  };

  const options = {
    httpOnly: false,
    expires: new Date(Date.now() + process.env.JWT_EXPIRE * 24 * 60 * 60 * 1000),
    sameSite: 'None'
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, message: message, user: userData });
};
