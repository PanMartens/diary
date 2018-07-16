const jwt = require("jsonwebtoken");

const vefify = (req, res, next) => {
  //
  const token = req.body.token;

  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err) {
      console.log("failed to authenticate");
      //return res.json({ success: false, message: 'Failed to authenticate token.' });;
      res.json({ err });
    } else {
      res.json({ decoded });
    }
  });
};

module.exports = vefify;
