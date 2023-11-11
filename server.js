// creating the Server using Express js
const express = require("express"); // this is the framework of the node js
const app = express();
const dotenv = require("dotenv").config(); // for the eniviorment file to provide more Security
const cors = require("cors");
const router = require("./Server/routes/data");
// databconnection or Seeding Script files
const {
  TableCreating,
  DbConnection,
} = require("./Server/DatabaseConnection/seedingScript");
// middlewares //
app.use(express.json()); // parese the data coming from the HTTP body or the Server
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // for aacessing the data in two diffrent orgins
app.use("/", router); // this is working only one / routes

// calling the Seeding function
TableCreating();
const port = process.env.PORT || 5000;
app.get("/hell", (req, res) => {
  const find = 'SELECT * FROM vehicles WHERE fromDate = "2023-09-01"';
  DbConnection.query(find, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    console.log(result);
    res.status(200).json({ data: result });
  });
});

// creating a Server using app

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
