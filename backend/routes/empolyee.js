const express = require("express");
const router = express.Router();
const EmployeeMiddleware = require('../middleware/employee');

router.post("/get-hour-tracker-history", EmployeeMiddleware.getEmployeeHistory);

router.post("/add-employee",EmployeeMiddleware.isEmployeeFound,EmployeeMiddleware.createBoth );

module.exports = router;
