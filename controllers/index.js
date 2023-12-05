const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./home-routes.js");
const sortRoutes = require("./sort");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/sort", sortRoutes);

module.exports = router;
