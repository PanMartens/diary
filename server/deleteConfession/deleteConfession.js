const sequelize = require("../db/index");
const confessions = require("../db/models/confession")(sequelize);

const deleteConfession = (req, res) => {
  confessions.destroy({
    where: {
      id_confession: req.body.id_confession
    }
  });
};

module.exports = deleteConfession;
