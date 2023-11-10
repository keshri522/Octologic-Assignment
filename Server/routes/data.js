const express = require("express");
const app = express();
const router = express.Router(); // global level routes can be access any where
//  controllers for the routes
const WheelsFunction = require("../controllers/data");
// creating some routes based on the details coming from the frotend
router.get("/wheels", WheelsFunction);
module.exports = router;
