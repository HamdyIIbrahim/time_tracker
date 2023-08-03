const express = require('express');
const app = express();
const mongoose =require('mongoose');
const cors = require('cors');
require('dotenv').config();
const EmployeeRoutes = require("./routes/empolyee");
const TrackerRoutes = require("./routes/hourTracker");
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("database connected");
}).catch(()=>{
    console.log("failed to connect");
})

app.use("/employee",EmployeeRoutes);
app.use("/tracker",TrackerRoutes);


app.listen(5000,(req,res)=>{
    console.log("Listing on port 5000")
})

