const express = require("express");
const router = express.Router();
const tourController=require("../../controllers/tour.conroller")

router
.route("/")
.get(tourController.getAllTours)
.post(tourController.saveATour);

module.exports = router
