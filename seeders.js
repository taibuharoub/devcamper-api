const fs = require("fs")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const colors = require("colors");

//Load env vars
dotenv.config({ path: "./config/config.env" })

//Load the mOdels
const Bootcamp = require("./models/Bootcamp");
const Course = require("./models/Course");

//Connect to DB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

//Read JSON files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8"))

const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8"))

//Import into DB
const importData = async () => {
    try {
        await Bootcamp.create(bootcamps);
        // await Course.create(courses);

        console.log("Data Imported...".green.inverse);
        process.exit();
    } catch (error) {
        console.log(error);
    }
}

//Delete data
const deleteData = async () => {
    try {
        await Bootcamp.deleteMany();
        await Course.deleteMany();

        console.log("Data Destoryed...".red.inverse);
        process.exit();
    } catch (error) {
        console.log(error);
    }
}

if(process.argv[2] === "-i") {
    importData();
} else if(process.argv[2] === "-d") {
    deleteData();
}