const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(ip) {
  const parsedIP = JSON.parse(ip).ip;
  return request(`http://ipwho.is/${parsedIP}`);

};

const fetchISSFlyOverTimes = function(coordinates) {
  const latitude = JSON.parse(coordinates).latitude;
  const longitude = JSON.parse(coordinates).longitude;
  return request((`https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`));

};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then((ip) => fetchCoordsByIP(ip))
    .then((coordinatesData) => fetchISSFlyOverTimes(coordinatesData))
    .then((flyoverTimes) => {
      return JSON.parse(flyoverTimes).response;
    })
};


module.exports = { nextISSTimesForMyLocation };


