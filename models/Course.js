const { strikethrough } = require("colors");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Bootcamp = require("./Bootcamp")

const CourseSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: [true, "Please add a course title"]
    },
    description: {
        type: String,
        required: [true, "Please add a description"]
    },
    weeks: {
        type: String,
        required: [true, "Please add number of weeks"]
    },
    tuition: {
        type: Number,
        required: [true, "Please add a tuition cost"]
    },
    minimumSkill: {
        type: String,
        required: [true, "Please add a minimum skill"],
        enum: ["beginner", "intermediate", "advanced"]
    },
    scholarshipAvailable: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    bootcamp: {
        type: Schema.Types.ObjectId,
        ref: "Bootcamp",
        required: true
    }
})


//Static method to get avg of course tuitions
CourseSchema.statics.getAverageCost = async function(bootcampId) {

    const obj = await this.aggregate([
        {
            $match: { bootcamp: bootcampId }
        },
        {
            $group: {
                _id: "$bootcamp",
                averageCost: { $avg: "$tuition" }
            }
        }
    ])
    
    try {
        await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
            averageCost: Math.ceil(obj[0].averageCost / 10) * 10
        })
    } catch (error) {
        console.log(error);
    }
}

//Call getAverage after save
CourseSchema.post("save", function() {
    this.constructor.getAverageCost(this.bootcamp);
})

//Call getAverage before remove
CourseSchema.pre("remove", function() {
    this.constructor.getAverageCost(this.bootcamp);
})

module.exports = mongoose.model("Course", CourseSchema);