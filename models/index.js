const User = require("./User");
const Categories = require("./Categories");
const Defaults = require("./Defaults");
const Events = require("./Events");

User.hasMany(Events, {
  foreignKey: "user_id",
});

User.hasMany(Defaults, {
  foreignKey: "user_id",
});

Events.belongsTo(Categories, {
  foreignKey: "category_id",
});

Defaults.belongsTo(User, {
  foreignKey: "user_id",
});

Events.belongsTo(User, {
  foreignKey: "user_id",
});

Defaults.belongsTo(Categories, {
  foreignKey: "category_id",
});

Categories.hasMany(Defaults, {
  foreignKey: "category_id",
});

module.exports = { User, Categories, Defaults, Events };
