const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load .env variables

const app = express();
app.use(express.json());
const cors = require('cors');
const userRoutes = require('./routes/User');
const taskRoutes = require('./routes/Task');
app.use(cors());
const conn = async () => {
    try {
        const response = await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected successfully:", response.connection.host);
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }
};

conn();
app.use("/api/v1",userRoutes)
app.use("/api/v1",taskRoutes)
//localhost:1000/api/v1/sign-in

// app.use("/", (req, res) => {
//     res.send("Hello, World!");
// });

 
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
