# Octologic-Assignment

🚗 Vehicle API Documentation
1. WheelsFunction API
Description
Retrieve vehicle types based on the number of wheels specified.

 # TechStack
 - Node.js
 - SQL
 - MySQl Db
 - EXPRESS
 - DOTENV
 - NODEMON


 # Note Server is On the LocalHost So Make sure to configure your MYSQL with LocalMachine or Any Host
 
 # Endpoint
http
Copy code
- GET /wheelsFunction
- Query Parameters
  vehiclewheels (required): Number of wheels for filtering vehicle types.
Example
http
Copy code
- GET /wheelsFunction?vehiclewheels=4
Response
json
Copy code

  {
    "vehiclesType": "Sedan",
    "wheeelsCount": 4
  },
  {
    "vehiclesType": "SUV",
    "wheeelsCount": 4
  }



2. getModels API
Description
 - Fetch submodels or types of vehicles based on the specified vehicle type.

Endpoint
http
Copy code
 - GET /getModels
- Query Parameters
- vehicletypes (required): Type of vehicle for filtering submodels.
Example
http
- Copy code
GET /getModels?vehicletypes=SUV
Response
json
Copy code

  {
    "submodel": "Compact SUV"
  },
  {
    "submodel": "Mid-size SUV"
  }



3. bookvehicle API
Description
- Submit booking data for a vehicle and check for availability.

- Endpoint
http
Copy code
- POST /bookvehicle
Request Body
json
Copy code
{
  "vehiclesType": "SUV",
  "wheeelsCount": 4,
  "subsubmodel": "Compact SUV",
  "fromDate": "2023-11-01",
  "toDate": "2023-11-10"
}
Response
- Note here Proper validation of date like if vehicles is Already Booked on particular date then return a res with that Already booked.
json
Copy code
{
  "success": "Successfully Booked"
}
Error Response
json
Copy code
{
  "error": "Compact SUV is already booked between 2023-11-05 and 2023-11-15"

}
- 📝 Notes
- Ensure all required parameters are included in the request.
- Dates should be in the format 'YYYY-MM-DD'.
- Handle errors gracefully and provide descriptive error messages.
- Feel free to customize this template further based on your project's branding or additional details you want to highlight.

