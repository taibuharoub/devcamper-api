const express = require("express");
const dotenv = require("dotenv");

//load env vars
dotenv.config({ path: "./config/config.env" });

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Started in ${process.env.NODE_ENV} mode at http://localhost:${PORT}`);
})
