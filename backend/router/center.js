const router = require("express").Router();

const {
    getAllCenters
} = require("../controllers/center.controller");

router.get("/", getAllCenters);

module.exports = router;
