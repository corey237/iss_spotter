const request = require('request');

const fetchMyIP = function(callback) {;
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body);
    callback(ip["ip"]);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    const parsedBody = JSON.parse(body);
    if (!parsedBody.success) {
      const msg = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(Error(msg), null);
      return;
    }
    const latitude = JSON.parse(body).latitude;
    const longitude = JSON.parse(body).longitude;

    const data = {
      latitude,
      longitude
    };
    callback(null, data);
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching fly over times. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const flyOverTimes = JSON.parse(body).response;
    callback(null, flyOverTimes);
    
  });
};

const printPastTimes = function (times) {
  for (const time of times) {
    const convertedDate = new Date(time.risetime).toString();
    console.log(`Next pass at ${convertedDate} for ${time.duration} seconds!`);
  }
}

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((body) => {
    const ip = body;
    fetchCoordsByIP(ip, (error, body) => {
      const coordinates = body;
      fetchISSFlyOverTimes(coordinates, (error, body) => {
        const flyOverTimes = body;
        callback(flyOverTimes);
      })
    })
  })
}

module.exports = { fetchCoordsByIP, nextISSTimesForMyLocation, fetchISSFlyOverTimes, fetchMyIP, printPastTimes};