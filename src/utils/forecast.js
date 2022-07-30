const request = require("request");
const forecast = (latitude, longtitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=c34d2cbbe7b4f35b03063b5cb3cd40f5&query=${latitude},${longtitude}&units=m`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("UNABLE TO CONNECT TO LOCATION SERVICES!", undefined);
    } else if (body.error) {
      callback("Unable to find location, try another search", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is currently: " +
          body.current.temperature +
          " degress out. It feels like " +
          body.current.feelslike +
          " degree out. The humidity is " +
          body.current.humidity +
          "%"
      );
    }
  });
};

module.exports = forecast;
