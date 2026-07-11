require("dotenv").config();

const express = require("express");

const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const cors = require("cors");
const connectDB = require("./config/db");

connectDB();



const app = express();
app.use(cors({
    origin: process.env.URL,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/resumes", resumeRoutes);



app.get("/", (req, res) => {

    res.send("Resume Parser API Running");

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});

