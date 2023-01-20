const fetchCoordsByIP = require('./iss.js');

fetchCoordsByIP("99.229.161.197", (error, body) => {
  console.log(body);
})