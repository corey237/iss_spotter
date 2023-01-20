const {fetchCoordsByIP ,fetchISSFlyOverTimes, nextISSTimesForMyLocation, fetchMyIP, printPastTimes } = require('./iss.js');



nextISSTimesForMyLocation((body) => {
  printPastTimes(body);
})

