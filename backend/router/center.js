const router = require("express").Router();

const {
    getAllCenters,
    getCenterById,
    getCenterSpecs,
    getCenterGames
} = require("../controllers/center.controller");
const { route } = require("./auth");

router.get("/", getAllCenters);
router.get("/:id", getCenterById)
router.get("/:id/specs", getCenterSpecs);
router.get("/:id/games", getCenterGames);

module.exports = router;
