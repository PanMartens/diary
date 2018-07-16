Sequelize = require("sequelize");

module.exports = sequelize => {
  return sequelize.define("confessions", {
    id_confession: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    owner_id: { type: Sequelize.INTEGER },
    data: { type: Sequelize.STRING },
    title: { type: Sequelize.STRING }
  });
};
