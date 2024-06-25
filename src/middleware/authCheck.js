const { verify } = require("jsonwebtoken");

const authCheck = (req, res, next) => {
  console.log("test");
  const { token } = req.cookies;
  if (!token) {
    req.userId = null;
    res.clearCookie("token");
    return res.redirect("/auth/signin");
  }

  const { userId } = verify(token, process.env.JWT_SECRET);
  req.userId = userId;

  next();
};

module.exports = authCheck;
