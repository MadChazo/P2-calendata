const router = require("express").Router();
const { User, Defaults, Categories, Events } = require("../models");
const {
  generateDays,
  generateMonths,
  getLastDayString,
} = require("../utils/helpers.js");
const Op = require("sequelize").Op;

// Get calendar display page
router.get("/", async (req, res) => {
  try {
    if (!req.session.loggedIn) {
      res.redirect("/login");
      return;
    }
    const nowDate = new Date();
    const months = generateMonths(nowDate);
    const currentUser = await User.findByPk(req.session.userID);
    const dbUserData = await User.findAll();
    const users = dbUserData.map((user) => user.get({ plain: true }));
    const userCategories = await Defaults.findAll({
      where: { id: req.session.userID },
      include: [{ model: Categories }],
    });
    const categories = userCategories.map((category) =>
      category.get({ plain: true })
    );
    const categoryIDs = categories.map((category) => category.id);
    const firstDateString = `${nowDate.getFullYear()}-${
      nowDate.getMonth() + 1
    }-${nowDate.getDate()} 00:00:00`;
    const lastDateString = getLastDayString(nowDate);
    // const dbEventData = await Events.findAll({
    //   where: {
    //     start_date: {
    //       [Op.between]: [firstDateString, lastDateString],
    //     },
    //     category_id: { [Op.in]: categoryIDs },
    //   },
    // });
    const dbEventData = await Events.findAll();
    const events = dbEventData.map((event) => event.get({ plain: true }));
    console.log(events);
    const days = generateDays(nowDate, 28);
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

router.get("/event", async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/login");
    return;
  }
  res.render("event-entry");
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
