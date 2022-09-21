const mongoose = require("mongoose");

const toursSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name must be need"],
        trim: true,
        minLength: [3, "Please give minimum 3 charecter"],
        maxLength: [100, "Name is too large"],
        unique:[true, "Name alrady exists"]
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: [0, "price can not be negative"],
        default: 200
    },
    view: {
        type: Number,
        default: 0,
    }
})

toursSchema.pre('save', function (next) {
    console.log('befor saving data')
    next();
})
// toursSchema.post('save', function (doc, next) {
//     console.log('after saving data')
//     next();
// })

const TourModel = mongoose.model('TourModel', toursSchema)


module.exports =TourModel ;