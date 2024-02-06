const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const tokenHeader = req.headers.authorization;
  if (!tokenHeader) {
    return res.status(401).json({ message: "Mising  authorization token" });
  }

  const token = tokenHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    res.status(401).json({ message: "Invalid token", error: error.message });
  }
};

module.exports = authenticateToken;
