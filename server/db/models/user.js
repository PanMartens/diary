Sequelize = require("sequelize");

module.exports = sequelize => {
  return sequelize.define("users", {
    Id_user: { type: Sequelize.STRING, primaryKey: true },
    name: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING },
    public: { type: Sequelize.BOOLEAN }
  });
};
