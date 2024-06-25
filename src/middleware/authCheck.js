const { verify } = require("jsonwebtoken");

const authCheck = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    req.userId = null;
    req.clearCookie("token");
    return res.redirect("/auth/signin");
  }

  const { userId } = verify(token, process.env.JWT_SECRET);
  req.userId = userId;

  next();
};

module.exports = authCheck;
