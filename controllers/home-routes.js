const router = require("express").Router();
const { User, Defaults, Categories, Events } = require("../models");
const { generateDays, generateMonths } = require("../utils/helpers.js");

// Get calendar display page
router.get("/", async (req, res) => {
  try {
    if (!req.session.loggedIn) {
      res.redirect("/login");
      return;
    }
    const months = generateMonths(Date.now());
    const currentUser = await User.findbyPk(req.session.userID);
    const dbUserData = await User.findAll();
    const users = dbUserData.map((user) => user.get({ plain: true }));
    const userCategories = await Defaults.findAll({
      where: { id: req.session.userID },
      include: [{ model: Categories }],
    });
    const categories = userCategories.map((category) =>
      category.get({ plain: true })
    );
    const categoryIDs = categories.map((category) => category.get(id));
    const dbEventData = await Events.findAll({
      where: {
        startDate: {
          [Op.between]: ["2023-11-29 00:00:00", "2023-12-29 11:59:59"],
        },
        category_id: { [Op.in]: categoryIDs },
      },
    });
    const events = dbEventData.map((event) => event.get({ plain: true }));
    const days = generateDays(Date.now(), 28);
    res.render("display", {
      currentUser,
      months,
      users,
      categories,
      days,
      events,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/signup", async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

module.exports = router;
