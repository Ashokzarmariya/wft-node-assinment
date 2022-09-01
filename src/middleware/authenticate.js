require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const tokenVerify = (token) => {
  return new Promise(function (resolve, reject) {
    jwt.verify(token, process.env.SECERET_KEY, function (err, user) {
      if (err) return reject(err);
      resolve(user);
    });
  });
};

const authenticate = async (req, res, next) => {
  if (!req.headers?.authorization)
    return res.status(501).send({ message: "please provide a token" });

  const bearerToken = req.headers.authorization;

  if (!bearerToken.startsWith("Bearer "))
    return res.status(501).send({ message: "please provide a valide token" });

  const token = bearerToken.split(" ")[1];

  let user;

  try {
    user = tokenVerify(token);
    if (!user) return res.status(401).send({ message: "your token is expire" });
  } catch (err) {
    return res.status(500).send(err.message);
  }
  req.user = user;
  next();
};

module.exports = authenticate;
