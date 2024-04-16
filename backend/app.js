const express = require("express");
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const port = 3000;
const connectDB = require('./config/database'); 

connectDB();
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const conferencePaperRoutesRoutes = require('./routes/conferencePaperRoutes');
app.use("/paper", conferencePaperRoutesRoutes);

const userRoutes = require('./routes/userRoutes');
app.use("/user", userRoutes);

const queryRoutes = require('./routes/queryRoutes')
app.use("/query", queryRoutes);


app.get('/', (req, res) => {
  res.status(200).json("Hello world");
});

// Start the server
app.listen(port, () => {
  console.log(`This application is working on port ${port}`);
});
