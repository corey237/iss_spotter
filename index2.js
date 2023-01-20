const { nextISSTimesForMyLocation } = require("./iss_promised");

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })

  const printPassTimes = function (times) {
  for (const time of times) {
    const convertedDate = new Date(time.risetime).toString();
    console.log(`Next pass at ${convertedDate} for ${time.duration} seconds!`);
  }
}

// nextISSTimesForMyLocation()

module.exports = { nextISSTimesForMyLocation };