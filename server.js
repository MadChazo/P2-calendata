// Required npm modules
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
// Required files
const routes = require("./controllers");
const sequelize = require("./config/connection.js");
const helpers = require("./utils/helpers.js");

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: "W}dK!pVsp8ir7:7^TCAA",
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({ db: sequelize }),
};

const hbs = exphbs.create({ helpers });

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`\n Server running on port ${PORT}.`));
});