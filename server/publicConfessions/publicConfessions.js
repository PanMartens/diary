const sequelize = require("../db/index");
const user = require("../db/models/user")(sequelize);
const confessions = require("../db/models/confession")(sequelize);

const isPublic = (req, res) => {
  user
    .find({
      where: {
        name: req.body.name
      }
    })
    .then(row => {
      if (row.public) {
        findConfessions(row);
      } else {
        res.send({ isNotPublic: true });
      }
    });

  const findConfessions = UserPublic => {
    confessions
      .findAll({
        where: {
          owner_id: UserPublic.Id_user
        }
      })
      .then(rows => {
        res.send({ rows });
      });
  };
};

module.exports = isPublic;
