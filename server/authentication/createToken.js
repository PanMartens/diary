const jwt = require("jsonwebtoken");

const createToken = (id, name, email, public, cb) => {
  //id or somethin like that,  propably id will be the best
  jwt.sign(
    { id, name, email, public },
    "secretkey",
    { expiresIn: "300000000s" },
    (err, auth) => {
      cb(auth);
    }
  );
};

module.exports = createToken;
