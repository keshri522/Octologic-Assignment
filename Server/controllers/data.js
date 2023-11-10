// // this is controllers function which is  responsible FOR sending the res based on the request
// // creating some routes based on the details coming from the frotend
// // these function return promise need to handle,, these are async function

const { DbConnection } = require("../DatabaseConnection/seedingScript");

const WheelsFunction = async (req, res) => {
  try {
    // Destructure the data coming from the frontend
    const { vehiclewheels } = req.query;

    // Check if the vehiclewheels parameter is provided
    if (!vehiclewheels) {
      return res.status(400).json({ error: "Missing vehiclewheels parameter" });
    }

    // Construct the SQL query to fetch data based on wheeelsCount
    const dataQuery = `SELECT * FROM vehicles WHERE wheeelsCount = ${vehiclewheels}`;

    // Use a promise-based approach to execute the query
    const results = await DbConnection.query(dataQuery, (err, success) => {
      if (err) {
        res.status(500).json({ error: "error in fetching the results" });
      } else {
        res.status(200).json(success);
        // console.log(success); // just for debugging
      }
    });
  } catch (error) {
    console.log(error.message); // For debugging purposes
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// this controllers function will return the  subsubmodel or type of model vehicle based on the wheeltype which is coming from the frontend
const getModels = async (req, res) => {
  const { vehicletypes } = req.query;
  try {
    if (vehicletypes) {
      const dataQuery = `SELECT * FROM vehicles WHERE vehiclesType = '${vehicletypes}'`;
      const results = await DbConnection.query(dataQuery, (err, success) => {
        if (err) {
          res.status(500).json({ error: "error in fetching the results" });
        } else {
          res.status(200).json(success);
          // if we want we can direct send the model istead of whole informaton like
          // const model = success.map((ele) => {
          //   return {
          //     sunmodel: ele.subsubmodel,
          //   };
          // });
          // // console.log(success); // just for debugging
          // console.log(model);
          // res.status(200).json(model);
        }
      });
    }
  } catch (error) {
    console.log(error); // just for debugging
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { WheelsFunction, getModels };
