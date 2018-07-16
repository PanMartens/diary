const sequelize = require("../db/index");
const confessions = require("../db/models/confession")(sequelize);

const changeConfession = (req, res) => {
  confessions.update(
    {
      title: req.body.title,
      data: req.body.data
    },
    {
      where: {
        id_confession: req.body.id_confession
      }
    }
  );
};

module.exports = changeConfession;
