const { User } = require('./models');

(async () => {
  try {
    const users = await User.findAll();
    console.log(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
  }
})();
