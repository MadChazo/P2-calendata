const router = require("express").Router();
const { User, Defaults, Categories, Events } = require("../../models");
const { generateDays, generateMonths } = require("../../utils/helpers.js");

router.get("/month/:month", async (req, res) => {
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
    const selectedMonth = month.split("-");
    const firstDay = new Date(selectedMonth[0], selectedMonth[1], 1);
    if (selectedMonth[1] == 2 && selectedMonth[0] % 4 == 0) {
      var days = generateDays(firstDay, 29);
      var numDays = 29;
    } else if (selectedMonth[1] == 2) {
      var days = generateDays(firstDay, 28);
      var numDays = 28;
    } else if (
      selectedMonth[1] == 1 ||
      selectedMonth[1] == 3 ||
      selectedMonth[1] == 5 ||
      selectedMonth[1] == 7 ||
      selectedMonth[1] == 8 ||
      selectedMonth[1] == 10 ||
      selectedMonth[1] == 12
    ) {
      var days = generateDays(firstDay, 31);
      var numDays = 31;
    } else {
      var days = generateDays(firstDay, 30);
      var numDays = 30;
    }
    const dbEventData = await Events.findAll({
      where: {
        startDate: {
          [Op.between]: [
            `${selectedMonth[0]}-${selectedMonth[1]}-01 00:00:00`,
            `${selectedMonth[0]}-${selectedMonth[1]}-${numDays} 11:59:59`,
          ],
        },
        category_id: { [Op.in]: categoryIDs },
      },
    });
    const events = dbEventData.map((event) => event.get({ plain: true }));
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

router.get("/user/:id", async (req, res) => {});

router.get("/category/:id", async (req, res) => {});

module.exports = router;
