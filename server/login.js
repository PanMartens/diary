const sequelize = require("./db/index");
const passwordHash = require("password-hash");
const user = require("./db/models/user")(sequelize);
const createToken = require("./authentication/createToken");

const login = (req, res) => {
  if (!req.body.name || !req.body.password) {
    res.json({ message: "You haven't filled fields" });
    res.end();
  }

  user
    .find({
      where: {
        name: req.body.name
      }
    })
    .then(row => {
      if (row != null) {
        console.log(row);

        if (passwordHash.verify(req.body.password, row.password)) {
          console.log("creating token");
          createToken(row.Id_user, row.name, row.email, row.public, token => {
            res.json({ token });
          });
        } else {
          res.send({ message: "Wrong password" });
        }
      } else {
        res.send({ message: "User with this login doesn't exists" });
      }
    });
};

module.exports = login;
