const HourTracker = require("../models/hourTracker");
const Employee = require("../models/employee");
exports.isEmployeeFound= async (req, res,next) => {
    const { email, fullTime, workFromHome, overTime, excelUrl} = req.body;
    const isFound = await Employee.findOne({ email: email });
    if (isFound) {
      const id = isFound.id;
        let currentDate = new Date();
        currentDate.setUTCHours(currentDate.getUTCHours()+3);
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1; 
        let year = currentDate.getFullYear();
      const addTracker = await HourTracker.create({
        userId: id,
        fullTime,
        workFromHome,
        overTime,
        date:`${day}-${month}-${year}`,
        excelUrl,
      });
      res.status(200).json("user found and tracker created");
    }else{
        next();
    }
}
exports.createBoth= async (req, res,next) => {
    const { name, email, fullTime, workFromHome, overTime, excelUrl} = req.body;
    const newEmployee = await Employee.create({
        name: name,
        email: email,
      });
      if (!newEmployee) {
        res.status(400).json("faild to create employee");
      } else {
        const id = newEmployee.id;
        let currentDate = new Date();
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1; 
        let year = currentDate.getFullYear();
        const addTracker = await HourTracker.create({
          userId: id,
          fullTime,
          workFromHome,
          overTime,
          date:`${day}-${month}-${year}`,
          excelUrl,
        });
        if (!addTracker) {
          res.status(400).json("faild to create tracker");
        } else {
          res.status(200).json("both add successfully");
        }
      }
}

exports.getEmployeeHistory =async (req, res) => {
    const email = req.body.email;
    const employee = await Employee.findOne({ email: email });
  
    const trackerResult = await HourTracker.find({ userId: employee._id }).populate('userId', 'name email');
  
    if (trackerResult.length === 0) {
      res.status(400).json("the user has no history");
    }
    res.status(200).json(trackerResult);
}
