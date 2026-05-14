const {
    getAllCentersModel
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

module.exports = {
    getAllCenters
};
