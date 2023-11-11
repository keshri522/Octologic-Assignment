// // this is controllers function which is  responsible FOR sending the res based on the request
// // creating some routes based on the details coming from the frotend
// // these function return promise need to handle,, these are async function

const { DbConnection } = require("../DatabaseConnection/seedingScript");
// this api will return the vehiclestype based on the wheeels number
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
        const Vehiclestypes = success.map((ele) => {
          return {
            vehiclesType: ele.vehiclesType,
            wheeelsCount: ele.wheeelsCount,
          };
        });
        res.status(200).json(Vehiclestypes);
        // res.status(200).json(success);
        // instead of returning the success i can simply return the only vechiletypes
        // console.log(success); // just for debugging
      }
    });
  } catch (error) {
    // console.log(error.message); // For debugging purposes
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
          // res.status(200).json(success);
          // if we want we can direct send the model istead of whole informaton like
          const model = success.map((ele) => {
            return {
              sunmodel: ele.subsubmodel,
            };
          });
          // console.log(success); // just for debugging

          res.status(200).json(model);
        }
      });
    }
  } catch (error) {
    // console.log(error); // just for debugging
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// this controllers method will submit the data coming from the frontend like fromdate,todate ,vehicletype,wheels
const bookvehicle = async (req, res) => {
  // using object destructuring
  const { vehiclesType, wheeelsCount, subsubmodel, fromDate, toDate } =
    req.body;
  // console.log(vehiclesType, wheeelsCount, subsubmodel, fromDate, toDate);
  try {
    // frist need to validate.. if any of is midding in the body  then res the no found
    if (
      !vehiclesType ||
      !wheeelsCount ||
      !subsubmodel ||
      !fromDate ||
      !toDate
    ) {
      return res.status(400).json({ error: "Missing Parameters" });
    } else {
      // i need ot first find the subsubmodel if the subsubmodel is already booked for the that days i need to check this
      const checkSubsubmodel = `SELECT * FROM vehicles WHERE subsubmodel = '${subsubmodel}'`;
      const results = await DbConnection.query(
        checkSubsubmodel,
        (err, vehicledetails) => {
          if (err) {
            res.status(500).json({ error: "error in fetching the results" });
            // console.log(err);
          } else {
            // Now here i nedd to verfiy that if the model is already booked with same date then nedd to return booking is alredy done
            const modelfromDate = new Date(vehicledetails[0].fromDate); // find the from date with this submodel
            const modeltoDate = new Date(vehicledetails[0].toDate); // find the to date with this submodel
            const formatAsYYYYMMDD = (date) => {
              const year = date.getFullYear();
              const month = (date.getMonth() + 1).toString().padStart(2, "0");
              const day = date.getDate().toString().padStart(2, "0");
              return `${year}-${month}-${day}`;
            }; // this will convert the date into YYYY-MM-DD fromate to access the data in mysql db

            const formattedFromDate = formatAsYYYYMMDD(modelfromDate);
            const formattedToDate = formatAsYYYYMMDD(modeltoDate);

            // console.log(formattedFromDate); // just for debugging
            // console.log(formattedToDate);

            // again check if date coming in the body like from and to date if it matches the current model date then return booking already done with that date
            if (
              (formattedFromDate <= toDate && formattedToDate >= fromDate) ||
              (formattedFromDate >= fromDate && formattedToDate <= toDate)
            ) {
              res.status(400).json({
                error: `${subsubmodel} is already booked between ${fromDate} and ${toDate}`,
              });
            } else {
              res.status(200).json({ success: "Successfully Booked" });
            }
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { WheelsFunction, getModels, bookvehicle };
