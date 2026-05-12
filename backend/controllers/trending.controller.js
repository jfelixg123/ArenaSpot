const {
    getTrendingCentersModel
} = require("../models/trending.model");

const getTrendingCenters = async (req, res) => {

    try {

        const centers = await getTrendingCentersModel();

        res.json(centers);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error obteniendo trending centers"
        });

    }

};

module.exports = {
    getTrendingCenters
};
