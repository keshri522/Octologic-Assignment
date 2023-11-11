const express = require("express");
const app = express();
const router = express.Router(); // global level routes can be access any where
//  controllers for the routes
const {
  WheelsFunction,
  getModels,
  bookvehicle,
} = require("../controllers/data");
// creating some routes based on the details coming from the frotend
router.get("/wheels", WheelsFunction); // this will rerturn all the vehicletypes based on the number of wheels
router.get("/model", getModels); // this route will rturn the model based on the vehicle types
router.post("/bookvehicle", bookvehicle); // this route will book the vehicle but first handling the erro
module.exports = router;
