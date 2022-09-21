const TourModel = require("../models/toure.model");

const viewCountIncriment = async (req, res, next) => {
    const { id } = req.params;
    const tour = await TourModel.findById(id);
    if (tour){
        const result =await TourModel.updateOne({tour},{$inc:{view:1}})
        return result;
    }
    next()
    

}
module.exports = viewCountIncriment;