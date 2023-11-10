// this is file where i am creating the cconnection between my sql databse and node js
// also creating the tables  that contains some rows and columns

const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config();

// creating a mysql databse here
const DbConnection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

// first we need to create a table and chekc if already exists then go with that otherwise create
const tableCreate = `
  CREATE TABLE IF NOT EXISTS vehicles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vehiclesType VARCHAR(255),
    wheeelsCount INT,
    subsubmodel VARCHAR(255)
  )
`;
// once table is Create then  i need to insert some data as soon  as the table Created
const vehicleData = [
  { vehiclesType: "hatchback", wheeelsCount: 4, subsubmodel: "Indica 403" },
  { vehiclesType: "hatchback", wheeelsCount: 4, subsubmodel: "Scorpio" },
  { vehiclesType: "suv", wheeelsCount: 4, subsubmodel: "Toyota Nive" },
  { vehiclesType: "suv", wheeelsCount: 4, subsubmodel: "Thar 4v4" },
  { vehiclesType: "sedan", wheeelsCount: 4, subsubmodel: "Nisan Marco p1" },
  { vehiclesType: "sedan", wheeelsCount: 4, subsubmodel: "Toyota  Nimble" },

  {
    vehiclesType: "cruiser",
    wheeelsCount: 2,
    submodel: "HayaBusha 1000RR",
  },
  { vehiclesType: "cruiser", wheeelsCount: 2, subsubmodel: "Nija Zr 1300CC" },

  { vehiclesType: "sports", wheeelsCount: 2, subsubmodel: "Porsche 901" },
  { vehiclesType: "sports", wheeelsCount: 2, subsubmodel: "Bulet Nida 1000CC" },
];

// here i am creating the function that will Create the table once my Server Started in my Online MySql Server
// based on this table i can fetch all the details of the vehical Data
const TableCreating = () => {
  DbConnection.connect((err) => {
    if (err) {
      console.log(`Error connecting to Database : ${err}`);
      return; // if there is any error it will return back from here
    }
    // else if no error then show a message that databse connected successfully
    else {
      console.log("Database connected successfully");
      // here checking if table is already exits
      const checkTableQuery = "SHOW TABLES LIKE 'vehicles'";
      DbConnection.query(checkTableQuery, (err, results) => {
        if (err) {
          console.log(err);
          DbConnection.end(); // Close the database connection
          return;
        } else {
          // need to check if resutl===0 then  only intsert the data
          if (results.length === 0) {
            // then insdert into this
            DbConnection.query(TableCreating, (err, results) => {
              if (err) {
                console.log(`Error ins Creating the table: ${err}`);
              } else {
                console.log(`Table created successfully`);
                InsertDataIntoTable(); // this function will insert the data into the table
              }
            });
          }
          // in the else condition i need to chekc whether
        }
        // need to  Create the table first
        DbConnection.query(tableCreate, (err, results) => {
          if (err) {
            console.log(`error in creating table ${err}`);
          } else {
            console.log("table created successfully");
          }
        });
      });
    }
  });
  // this function will insert the data in the table
  const InsertDataIntoTable = () => {
    // need to insert the vehicleDate into this newlyCreated table
    vehicleData.forEach((data) => {
      const insertQuery = `INSERT INTO vehicles (vehiclesType, wheeelsCount, subsubmodel) VALUES ('${data.vehiclesType}','${data.wheeelsCount}','${data.subsubmodel}')`;
      DbConnection.query(insertQuery, (err, results) => {
        if (err) {
          console.log(`error in inserting data ${err}`);
        } else {
          console.log("data inserted successfully");
        }
      });
    });
  };
};

// calling the table Created Function that will Validate the Table and Create the tables
module.exports = TableCreating;
