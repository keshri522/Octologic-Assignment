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
    subsubmodel VARCHAR(255),
    fromDate DATE,
    toDate DATE
  )
`;
// once table is Create then  i need to insert some data as soon  as the table Created
const vehicleData = [
  {
    vehiclesType: "hatchback",
    wheeelsCount: 4,
    subsubmodel: "Indica 403",
    fromDate: "2023/4/01",
    toDate: "2023/9/30",
  },
  {
    vehiclesType: "hatchback",
    wheeelsCount: 4,
    subsubmodel: "Scorpio",
    fromDate: "2023/5/01",
    toDate: "2023/10/12",
  },
  {
    vehiclesType: "suv",
    wheeelsCount: 4,
    subsubmodel: "Toyota Nive",
    fromDate: "2022/1/01",
    toDate: "2022/9/11",
  },
  {
    vehiclesType: "suv",
    wheeelsCount: 4,
    subsubmodel: "Thar 4v4",
    fromDate: "2023/4/01",
    toDate: "2023/9/30",
  },
  {
    vehiclesType: "sedan",
    wheeelsCount: 4,
    subsubmodel: "Nisan Marco p1",
    fromDate: "2023/7/01",
    toDate: "2023/11/30",
  },
  {
    vehiclesType: "sedan",
    wheeelsCount: 4,
    subsubmodel: "Toyota  Nimble",
    fromDate: "2023/4/01",
    toDate: "2023/9/30",
  },

  {
    vehiclesType: "cruiser",
    wheeelsCount: 2,
    subsubmodel: "HayaBusha 1000RR",
    fromDate: "2023/9/01",
    toDate: "2023/10/22",
  },
  {
    vehiclesType: "cruiser",
    wheeelsCount: 2,
    subsubmodel: "Nija Zr 1300CC",
    fromDate: "2023/4/01",
    toDate: "2023/9/30",
  },

  {
    vehiclesType: "sports",
    wheeelsCount: 2,
    subsubmodel: "Porsche 901",
    fromDate: "2021/4/03",
    toDate: "2022/9/30",
  },
  {
    vehiclesType: "sports",
    wheeelsCount: 2,
    subsubmodel: "Bulet Nida 1000CC",
    fromDate: "2023/2/11",
    toDate: "2023/12/30",
  },
];

// here i am creating the function that will Create the table once my Server Started in my Online MySql Server

const TableCreating = () => {
  DbConnection.connect((err) => {
    if (err) {
      console.log(`Error connecting to Database : ${err}`);
      return;
    } else {
      console.log("Database connected successfully");
      // Check if table already exists with same name
      const checkTableQuery = "SHOW TABLES LIKE 'vehicles'";
      DbConnection.query(checkTableQuery, (err, results) => {
        if (err) {
          console.log(err);
          // DbConnection.end();
          return;
        } else {
          // console.log(results.length); just for debugging
          if (results.length === 0) {
            // if this is true then only insert data
            // Table does not exist, create it
            DbConnection.query(tableCreate, (err, createResults) => {
              if (err) {
                console.log(`Error creating the table: ${err}`);
                // DbConnection.end();
              } else {
                console.log("Table created successfully");
                InsertDataIntoTable();
              }
            });
          } else {
            // Table exists, check if it has data
            const checkDataQuery = "SELECT COUNT(*) AS rowCount FROM vehicles";
            DbConnection.query(checkDataQuery, (err, dataResults) => {
              if (err) {
                console.log(`Error checking data in the table: ${err}`);
                // DbConnection.end(); //close the connection if any error
              } else {
                const TotalRowsCount = dataResults[0].rowCount; // return totla number of rows
                if (TotalRowsCount < vehicleData.length) {
                  console.log("No data is in the Table");
                } else {
                  console.log("Table already exists");
                  // DbConnection.end(); // close the connection
                }
              }
            });
          }
        }
      });
    }
  });

  // Function to insert data into the 'vehicles' table
  const InsertDataIntoTable = () => {
    // Insert data into the 'vehicles' table
    vehicleData.forEach((data) => {
      const insertQuery = `
      INSERT INTO vehicles (vehiclesType, wheeelsCount, subsubmodel, fromDate, toDate)
      VALUES (
        '${data.vehiclesType}',
        '${data.wheeelsCount}',
        '${data.subsubmodel}',
        STR_TO_DATE('${data.fromDate}', '%Y/%m/%d '), 
        STR_TO_DATE('${data.toDate}', '%Y/%m/%d')
      )
    `;

      DbConnection.query(insertQuery, (err, results) => {
        if (err) {
          console.log(`Error in inserting data: ${err}`);
        } else {
          console.log("Data inserted successfully");
        }
      });
    });

    // Close the database connection after inserting data
    DbConnection.end();
  };
};

// calling the table Created Function that will Validate the Table and Create the tables
module.exports = {
  DbConnection,
  TableCreating,
};
