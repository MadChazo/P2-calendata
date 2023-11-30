const router = require("express").Router();
const { User, Defaults, Category, Event } = require("../models");

// Generates months array from current month
function generateMonths(date) {
  const months = [];
  for (i = 0; i < 12; i++) {
    date.setMonth(Date.now().getMonth() + i);
    let month = date.toLocaleString("default", { month: "long" });
    let year = date.getFullYear();
    let monthNum = year + "-" + date.getMonth();
    let monthWord = month + " " + year;
    months.push({ monthNum, monthWord });
  }
  return months;
}

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
      include: [{ model: Category }],
    });
    const categories = userCategories.map((category) =>
      category.get({ plain: true })
    );
    const categoryIDs = categories.map((category) => category.get(id));
    const dbEventData = await Event.findAll({
      where: {
        startDate: {
          [Op.between]: ["2023-11-29 00:00:00", "2023-12-29 11:59:59"],
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
