const { strikethrough } = require("colors");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Bootcamp = require("./Bootcamp")
const User = require("./User")

const ReviewSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: [true, "Please add a title for the review"],
        maxlength: 100
    },
    text: {
        type: String,
        required: [true, "Please add some text"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
        required: [true, "Please add a rating between 1 and 10"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    bootcamp: {
        type: Schema.Types.ObjectId,
        ref: "Bootcamp",
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

//user can only add one review per a bootcamp
//Prevent user from submitting more than one review per bootcamp
ReviewSchema.index({ bootcamp: 1, user: 1 }, { unique: true })

//Static method to get avg rating and save
ReviewSchema.statics.getAverageRating = async function(bootcampId) {

    const obj = await this.aggregate([
        {
            $match: { bootcamp: bootcampId }
        },
        {
            $group: {
                _id: "$bootcamp",
                averageRating: { $avg: "$rating" }
            }
        }
    ])
    
    try {
        await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
            averageRating: obj[0].averageRating
        })
    } catch (error) {
        console.log(error);
    }
}

//Call getAverage after save
ReviewSchema.post("save", function() {
    this.constructor.getAverageRating(this.bootcamp);
})

//Call getAverage before remove
ReviewSchema.pre("remove", function() {
    this.constructor.getAverageRating(this.bootcamp);
})


module.exports = mongoose.model("Review", ReviewSchema);