const router = require("express").Router();

const {
    getTrendingCenters
} = require("../controllers/trending.controller");

router.get("/trending-centers", getTrendingCenters);

module.exports = router;
