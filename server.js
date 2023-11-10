// creating the Server using Express js
const express = require("express"); // this is the framework of the node js
const app = express();
const dotenv = require("dotenv").config(); // for the eniviorment file to provide more Security
const cors = require("cors");
// databconnection or Seeding Script files
const ConnectionSeeding = require("./Server/DatabaseConnection/seedingScript");
// middlewares //
app.use(express.json()); // parese the data coming from the HTTP body or the Server
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // for aacessing the data in two diffrent orgins
// calling the Seeding function
ConnectionSeeding();
const port = process.env.PORT || 5000;
app.get("/hell", (req, res) => {
  res.send("hello world");
});
// creating a Server using app

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
