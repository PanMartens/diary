const sequelize = require("../db/index");
const confessions = require("../db/models/confession")(sequelize);
const uuid = require("uuid/v4");

const createNewConfession = (req, res, next) => {
  if (!req.body.data || !req.body.title) {
    res.send({ message: "Fill the fields" });
  } else {
    confessions.create({
      id_confession: uuid(),
      owner_id: req.body.owner_id,
      data: req.body.data,
      title: req.body.title
    });
    res.send({ message: "New confession has been created" });
  }
};

module.exports = createNewConfession;
