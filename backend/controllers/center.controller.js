const {
    getAllCentersModel,
    getCenterByIdModel,
    getCenterSpecsModel,
    getCenterGamesModel
} = require("../models/center.model");

const getAllCenters = async (req, res) => {

    try {

        const centers = await getAllCentersModel();

        res.json(centers);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error obteniendo centers"
        });

    }

};

const getCenterById = async (req, res) => {

    try {

        const { id } = req.params;

        const center = await getCenterByIdModel(id);

        res.json(center);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error obteniendo center"
        });

    }

};


const getCenterSpecs = async (req, res) => {

    try {

        const { id } = req.params;

        const specs = await getCenterSpecsModel(id);

        res.json(specs);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error obteniendo specs"
        });

    }

};

const getCenterGames = async (req, res) => {

    try {

        const { id } = req.params;

        const games = await getCenterGamesModel(id);

        res.json(games);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error obteniendo juegos"
        });

    }

};

module.exports = {
    getAllCenters,
    getCenterById,
    getCenterSpecs,
    getCenterGames
};
