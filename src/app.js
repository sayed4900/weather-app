const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
// console.log(__dirname);

const app = express();

//Define Paths for Express config
const publicDirectorPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const parialPath = path.join(__dirname, "../templates/partials");

//Setup handlerbars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(parialPath);
// Setup static directory to server
app.use(express.static(publicDirectorPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Sayed Abdo",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About App",
    name: "Sayed Abdo",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "Need help ? ",
    title: "Help ME",
    name: "Sayed Abdoo",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please write your address!",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

// app.get("/weather", (req, res) => {
//   if (!req.query.address) {
//     return res.send({
//       error: "Please write your address!",
//     });
//   }

//   res.send({
//     forecast: "WQREW",
//     location: "AFgASG",
//     address: req.query.address,
//   });
// });

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 help",
    name: "SAyed abdo",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "sayed abdo",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});

/*
app.get("", (req, res) => {
  res.send("<h1>Hello Express!<h1>");
});
app.get("/help", (req, res) => {
  res.send([
    {
      name: "sayed",
    },
    {
      name: "Abdo",
    },
  ]);
});
app.get("/about", (req, res) => {
  res.send("<h2>About Page<h2>");
});
*/
