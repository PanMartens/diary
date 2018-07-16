const sequelize = require("../db/index");
const user = require("../db/models/user")(sequelize);

const userFindAllPublic = (req, res) => {
  user
    .findAll({
      where: { public: true }
    })
    .then(rows => {
      res.send({ rows });
    });
};

module.exports = userFindAllPublic;
