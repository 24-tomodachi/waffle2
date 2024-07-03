const { verify } = require("jsonwebtoken");

const authCheck = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    req.userId = null;
    res.clearCookie("token");
    return res.redirect("/auth/signin");
  }

  try {
    const { userId } = verify(token, process.env.JWT_SECRET);
    req.userId = userId;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      req.userId = null;
      res.clearCookie("token");
      return res.redirect("/auth/signin");
    }
  }
};

module.exports = authCheck;
