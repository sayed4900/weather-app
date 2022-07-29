const request = require("request");
const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYWQ0NDciLCJhIjoiY2w1dzljbTJxMDJ3NzNvb2E2ZzBia3lwdCJ9.oSW68_9Su2vM7RBt8Trvxw&limit=1`;

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("UNABLE TO CONNECT TO LOCATION SERVICES!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location, try another search", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longtitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
