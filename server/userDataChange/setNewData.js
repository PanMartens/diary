const sequelize = require("../db/index");
const user = require("../db/models/user")(sequelize);
const passwordHash = require("password-hash");
const createToken = require("../authentication/createToken");

const setNewUserData = async (req, res, next) => {
  if (!req.body.name || !req.body.email) {
    res.send({ message: "Your name and email fields can't be empty" });
  } else if (req.body.password != req.body.repeatedPassword) {
    res.send({ message: "Your new repeated password is not the same" });
  } else if ((await isName(req)) && (await isEmail(req))) {
    res.send({ message: "User with this email or name already exists" });
  } else if (req.body.password == "" && req.body.repeatedPassword == "") {
    user
      .update(
        {
          name: req.body.name,
          email: req.body.email,
          public: req.body.public
        },
        {
          where: { Id_user: req.body.id } // tu sie  zatrzymalem   dokonczyc
        }
      )
      .then(createNewToken(req, res, next));
  } else {
    user
      .update(
        {
          name: req.body.name,
          email: req.body.email,
          password: passwordHash.generate(req.body.password),
          public: req.body.public
        },
        {
          where: { Id_user: req.body.id } // tu sie  zatrzymalem   dokonczyc
        }
      )
      .then(createNewToken(req, res, next));
  }
};

const createNewToken = (req, res, next) => {
  createToken(
    req.body.id,
    req.body.name,
    req.body.email,
    req.body.public,
    token => {
      res.json({ token });
    }
  );
};

const isName = async req => {
  let result = await user
    .find({
      where: {
        name: req.body.name
      }
    })
    .then(row => {
      if (row && req.body.email == row.email) {
        return false;
      } else {
        return Boolean(row);
      }
    });

  return result;
};

const isEmail = async req => {
  let result = await user
    .find({
      where: {
        email: req.body.email
      }
    })
    .then(row => {
      console.log(row);
      return Boolean(row);
    });

  return result;
};

module.exports = setNewUserData;
