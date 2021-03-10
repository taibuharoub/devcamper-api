const fs = require("fs")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const colors = require("colors");

//Load env vars
dotenv.config({ path: "./config/config.env" })

//Load the mdels
const Bootcamp = require("./models/Bootcamp");

//Connect to DB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

//Read JSON files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8"))

//Import into DB
const importData = async () => {
    try {
        await Bootcamp.create(bootcamps);

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