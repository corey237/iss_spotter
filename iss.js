const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
  if (error) {
    return callback(error, null);
  }
  if (response.statusCode !== 200) {
    const msg = `Status code ${response.statusCode} when fetching IP. Response: ${body}`
    callback(Error(msg), null);
    return;
  }
  const ip = JSON.parse(body)
  callback(ip["ip"]);
  })
}

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
    }
    callback(null, data);
    })
}



module.exports = fetchCoordsByIP, fetchMyIP;


