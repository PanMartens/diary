const sequelize = require("./db/index");
const passwordHash = require("password-hash");
const user = require("./db/models/user")(sequelize);
const uuid = require("uuid/v4");

const register = (req, res) => {
  if (
    !req.body.name ||
    !req.body.password ||
    !req.body.email ||
    req.body.password != req.body.password2
  ) {
    res.json({ message: "You typed the data not correctly" });
    res.end();
  } else {
    req.body.password = passwordHash.generate(req.body.password);

    // //   //user.create({name: req.body.name, password: req.body.password, email: req.body.email});

    //...

    user
      .find({
        where: {
          name: req.body.name
        }
      })
      .then(row => {
        if (row != null) {
          res.send({ message: "User with this login has already exists" });
        } else {
          checkEmail(req);
        }
      });

    const checkEmail = req => {
      user
        .find({
          where: {
            email: req.body.email
          }
        })
        .then(row => {
          if (row != null) {
            res.send({ message: "User with this email has already exists" });
          } else {
            user.create({
              Id_user: uuid(),
              name: req.body.name,
              password: req.body.password,
              email: req.body.email,
              public: false
            });
            res.send({
              message:
                "Congratulations user has been created, come back to log in"
            });
          }
        });
    };
  }
};

module.exports = register;
