/* Global Variables */

// This apiKey variable stores the api key i got from the open weather api site after registering with my account
// I had to alter the unit (to metric) as this is the unit primarily being utilized in Egypt
const apiKey = "e3ee629454c4c7c52da743477fa2ee63&units=metric";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

// Here we are supposed to take the zipcode from the user when they type it on the webpage
const get = async () => {
  // Initializing variable 'zipQuery' which stores the id of zip in the html and get it's value
  let zipQuery = document.querySelector("#zip").value;
  // This request variable uses fetch to get the data from the the weather api through the url i got fom the open weather map site
  const req = await fetch(
    // Here is the zip code url i got from the open weather map site
    // I substituted the original zip code and api key values with the 'apiKey' variable i created above and the zip variable i created to get the element with the id 'zip'
    // I also removed the country from the url as it is not required
    `https://api.openweathermap.org/data/2.5/weather?zip=${zipQuery}&appid=${apiKey}`,
  );
  try {
    // This response variable takes the req variable which carries the api data as JSON and turns it to object javascript to be able to deal with it using javascript language
    const res = await req.json();
    // Return the response
    return res;
  } catch (error) {
    // If there is an error then display 'error encountered' in the console
    console.log("error encountered !");
  }
};
// Intializing a variable to store the id of the button
const buttonClick = document.getElementById("generate");
// Creating an event listener for the button to generate a function as soon as user clicks on it
buttonClick.addEventListener("click", () => {
  let zipQuery = document.querySelector("#zip").value;
  // Initializing variable 'feelingQuery' which stores the id of feelings in the html and gets it's value
  let feelingQuery = document.querySelector("#feelings").value;
  // If both feelings and zip code are empty then diplay an alert telling user to fill both of them up
  if (!feelingQuery && !zipQuery) {
    alert("you need to fill both zip code and the feelings");
    // If zip code is empty then alert theuser to fill it up
  } else if (!zipQuery) {
    alert("you need to fill the zip input");
    // If feelings is empty then alert the user to fill it up
  } else if (!feelingQuery) {
    alert("you need to verify your feelings");
    // If both are filled then get the date from the post route
  } else {
    // using the chaining method i've learned in the previous lessons
    get().then((objectValue) => {
      post("/url", {
        // Value of temp is the 'temp' in the object
        temp: objectValue.main.temp,
        // Value of feelings is the variable 'feelingQuery' which carries value of element
        feelings: feelingQuery,
        // Value of date is the variable newDate initialized above
        date: newDate,
      });
      // Calling the changeView to dipslay the dat aoutput on screen as soon as user clicks the generate button
      changeView();
    });
  }
});

// url and data are default parameters, hence why they're empty. this prevents the system from crashing due to undefined parameters
const post = async (path = "", values = {}) => {
  const req = await fetch(path, {
    // Clarifying that the method to be used is post
    method: "POST",
    credentials: "same-origin",
    headers: {
      "content-type": "application/json",
    },
    // Convert data to JSON to send it back to the server
    body: JSON.stringify(values),
  });
  try {
    // return the request
    return req;
  } catch (error) {
    // Display error if any encountered
    console.log("error encountered !");
  }
};
// This asynchronous function prints put the values of the temp, date and feelings to the screen
const changeView = async () => {
  // Fetching the data from the get route within the server
  const res = await fetch("/get");
  try {
    // Convert json data into javascript object
    const recievedData = await res.json();
    // Implementing the math.round to eliminate any decimals and adding a "cel" at the end to clarify that it is in celsius
    document.getElementById("temp").innerHTML =
      Math.round(recievedData.temp) + " cel";
    document.getElementById("content").innerHTML = recievedData.content;
    document.getElementById("date").innerHTML = recievedData.date;
    // Print the project data in the console
    console.log(recievedData);
  } catch (error) {
    console.log("error encountered !");
  }
};
