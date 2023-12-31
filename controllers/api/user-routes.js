const router = require('express').Router();
const { User } = require('../../models');

// Create new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userID = dbUserData.id; 

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//  Router Post Login
router.post('/login', async (req, res) => {
  console.log(req.body);
  try {
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Sorry, incorrect username or password. Please try again!' });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);
    console.log(validPassword);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: ' Sorry, incorrect username or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userID = dbUserData.id; 

      res
        .status(200)
        .json({ user: dbUserData, message: 'Yay! You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Router Post Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
