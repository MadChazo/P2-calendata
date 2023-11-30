const sequelize = require('../config/connection');
const { Categories, Defaults, Events, User } = require('../models');

const categoriesSeedData = require('./categoriesSeedData.json');
const defaultsSeedData = require('./defaultsSeedData.json');
const eventsSeedData = require('./eventsSeedData.json');
const userSeedData = require('./userSeedData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
  
    const categories = await Categories.bulkCreate(categoriesSeedData, {
        individualHooks: true,
        returning: true,
    });

    const defaults = await Defaults.bulkCreate(defaultsSeedData, {
        individualHooks: true,
        returning: true,
    });

    for (const { id } of defaults) {
        const newDefaultCategory = await Categories.create({
          category_id: id,
        });
        const newCategoryUser = await User.create({
            user_id: id,
        });
    }

    const events = await Events.bulkCreate(eventsSeedData, {
        individualHooks: true,
        returning: true,
    });

    for (const { id } of events) {
        const newEventCategory = await Categories.create({
          category_id: id,
        });
        const newEventUser = await User.create({
            user_id: id,
          });
      }

    const users = await User.bulkCreate(userSeedData, {
        individualHooks: true,
        returning: true,
      });
  
    process.exit(0);
  };

seedDatabase();
