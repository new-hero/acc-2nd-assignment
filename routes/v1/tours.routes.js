const express = require("express");
const router = express.Router();
const tourController=require("../../controllers/tour.conroller");
const viewCountIncriment = require("../../utils/countIncriment");

router
.route("/tours")
.get(tourController.getAllTours)
.post(tourController.saveATour);

router
.route("/tours/:id")
.get(tourController.getATour, viewCountIncriment)
.patch(tourController.updateARour)
.delete(tourController.deleteATour);

router
.route("/tour/trending")
.get(tourController.trendingTours)
router
.route("/tour/cheapest")
.get(tourController.cheapestTours)

module.exports = router