const TourModel = require("../models/toure.model");
// const Tour = require("../models/toure.model");

module.exports.getAllTours = async (req, res, next) => {

    try {
        const filters = { ...req.query };
        const customFilters = ["page", "limit", "sort"]
        customFilters.forEach(filter => delete filters[filter])
        const customFilter = {};
        if (req.query.sort) {
            const sortBy = req.query.sort.split(",").join(" ");
            customFilter.sortBy = sortBy;
        }
        if (req.query.fields) {
            const filterBy = req.query.fields.split(",").join(" ");
            customFilter.filterBy = filterBy;
        }
        if (req.query.page) {
            const { page = 1, limit = 5 } = req.query;
            const skip = (+page - 1) * +limit;
            customFilter.skipValue = skip;
            customFilter.limitValue = +limit;
        }
        const tour = await TourModel.find({})
            .skip(customFilter.skipValue)
            .limit(customFilter.limitValue)
            .select(customFilter.filterBy)
            .sort(customFilter.sortBy)
        const totalProduct = await TourModel.countDocuments(filters);
        const pageCount = Math.ceil((totalProduct / customFilter.limitValue))

        res.status(200).json({
            success: true,
            data: {
                pageCount,
                totalProduct,
                tour
            }
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "data insert fail",
            error: error.message
        });
    }

}

module.exports.saveATour = async (req, res, next) => {

    try {
        const tour = new TourModel(req.body)
        // const result = await TourModel.create(req.body)
        const result = await tour.save()
        res.status(200).json({
            success: true,
            message: "data insert successful",
            data: result
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "data insert fail",
            error: error.message
        });
    }
}

module.exports.getATour = async (req, res, next) => {
    try {
        const { id } = req.params;
        const tour = await TourModel.findById(id);
        if (tour) {
            res.status(200).json({
                success: true,
                message: "Data Load successful",
                data: tour
            });
        } else {
            res.status(400).json({
                success: false,
                message: "NO data found from this id",
            });
        }
      

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Data Load Fail",
            error: error.message
        });
    }
    next();
}

module.exports.updateARour = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateDoc = req.body;
        const tour = await TourModel.findById(id);
        if (tour) {
            const result = await TourModel.updateOne({ _id: id }, { $set: updateDoc })

            res.status(200).json({
                success: true,
                message: "Data Load successful",
                data: result
            });
        }

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Data Load Fail",
            error: error.message
        });
    }
}

module.exports.deleteATour = async (req, res, next) => {

    try {
        const { id } = req.params;
        const result = await TourModel.deleteOne({ _id: id })
        if (result.deletedCount) {
            res.status(200).json({
                success: true,
                message: "Yes Data deleted",
            })
        } else (
            res.status(400).json({
                success: false,
                message: " Data not found for deleted",
            })
        )
        console.log(result)

    } catch (error) {
        res.status(400).json({
            success: false,
            error: error
        });
    }

}

module.exports.trendingTours = async (req, res, next) => {
    try {

        const tour = await TourModel.find({}).sort({ view: -1 }).limit(3)
        res.status(200).json({
            success: true,
            data: tour
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "data insert fail",
            error: error.message
        });
    }


}

module.exports.cheapestTours = async (req, res, next) => {
    try {

        const tour = await TourModel.find({}).sort({ price: 1 }).limit(3)
        res.status(200).json({
            success: true,
            data: tour
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "data insert fail",
            error: error.message
        });
    }
}