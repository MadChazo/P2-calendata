const router = require("express").Router();

const sortRoutes = require("./sort-routes.js");

router.use("/", sortRoutes);

module.exports = router;
