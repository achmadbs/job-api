const jwt = require("jsonwebtoken");
const config = require("../../config");

exports.parseAuth = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  try {
    const token = authHeader && authHeader.split(" ")[1];
    const decoded = jwt.verify(token, config.jwtSecretKey);

    if (decoded) {
      if (new Date() > new Date(decoded.exp * 1000))
        return res
          .status(401)
          .json({ status: 401, message: "Credential is not valid" });
      req.user = { ...decoded };
    }
  } catch (err) {
    return res
      .status(401)
      .json({ status: 401, message: "Credential is not valid" });
  }
  await next();
};
