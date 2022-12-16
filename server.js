// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Requiring the bodyparser
const bodyParser = require("body-parser");
// Requiring cors
const cors = require("cors");
// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Middleware*/
// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));
// Setup Server
// Setup my port
const port = 5502;
// Setup hostname url
const hostname = "128.0.0.1";
// Requiring Os (operating system package that displays name of user os)
const os = require("os");
// initializing hostOS variable to store the local host operating system name for the end user (in my case it's mbp [macbookpro])
const hostOS = os.hostname;
// Get all data from the project data object
// Route for accessing my url (with localhost and port)
app.get("/get", (request, response) => {
  // Send the weather data within the project data object
  response.send(projectData);
});
// Route to Posting the info in project data
app.post("/url", (request, response) => {
  // Extracting only the temperature, date and feelings from the body of the project data object
  // Storing the value of temp within the 'temp' inside the project data object
  projectData.temp = request.body.temp;
  // Storing the value of date within the 'date' inside the project data object
  projectData.date = request.body.date;
  // Storing the value of feelings within the 'content' inside the project data object
  projectData.content = request.body.feelings;
  // display data in the terminal
  console.log(projectData);
});
// Function to test my server
const testing = () => {
  // Printing the port number in my terminal
  console.log(`the server is running on port ${port}`),
    // Printing the hostname i created also in my terminal
    console.log(`the hostname is ${hostname}`),
    // Printing the host os in my terminal
    console.log(`the hostOS name is ${hostOS}`);
};
// callback function to test my server
app.listen(port, testing);
