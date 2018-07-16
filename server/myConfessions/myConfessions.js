const sequelize = require("../db/index");
const confessions = require("../db/models/confession")(sequelize);

const myConfessions = (req, res) => {
  confessions
    .findAll({
      where: {
        owner_id: req.body.Id_user
      }
    })
    .then(rows => {
      res.send({ rows });
    });
};

module.exports = myConfessions;
