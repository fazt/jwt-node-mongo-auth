const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");

const User = db.user;
const Role = db.role;

const verifyToken = async (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) return res.status(403).json({ message: "No Token provided" });

  try {
    const decoded = jwt.verify(token, config.secret);
    req.userId = decoded.id;

    const user = await User.findById(req.userId, {password: 0})
    if (!user) return res.status(404).json({message: 'No user found'});

    next();
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized!" });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    const roles = await Role.find({
      _id: { $in: user.roles },
    });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        return next();
      }
    }

    res.status(403).json({ message: "Required Admin Role" });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

const isModerator = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "moderator") {
        next();
        return;
      }
    }

    return res.status(403).send({ message: "Require Moderator Role!" });

  } catch (error) {
    console.log('error:', error)
    return res.status(500).send({ message: error});
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator
}

module.exports = authJwt;