const sequelize = require('../config/connection');
const { Categories, Defaults, Events, User } = require('../models');

const categoriesSeedData = require('./categoriesSeedData.json');
const defaultsSeedData = require('./defaultsSeedData.json');
const eventsSeedData = require('./eventsSeedData.json');
const userSeedData = require('./userSeedData.json');



seedDatabase();
