// this is controllers function which is  responsible FOR sending the res based on the request
// creating some routes based on the details coming from the frotend
// these function return promise need to handle,, these are async function
const Connection = require("../DatabaseConnection/seedingScript");
const WheelsFunction = async (req, res) => {
  // this is the data coming from frotned  using destructuring
  const { vehiclewheels } = req.params;
  console.log(vehiclewheels); // just for debugging
  try {
    // i nedd to return the vehicletpyes based on the vehichlewhells coming in the params this is get request
    if (vehiclewheels) {
      const dataQuerry =
        "SELECT * FROM  vehicles WHERE  wheeelsCount= ${vehiclewheels}";
      const result = Connection.query(dataQuerry);
      res.status(200).json(result);
      console.log(result); // just for debugging
    } else {
      // Handle the case where vehiclewheels parameter is not provided
      res.status(400).json({ error: "Missing vehiclewheels parameter" });
    }
  } catch (error) {
    console.log(error); // just for debugging
    res.status(500).json({ error: "Interal Server Error" });
  }
};
module.exports = WheelsFunction;
