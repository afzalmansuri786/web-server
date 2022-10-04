const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { geoCode } = require("./utils/geoCode");
const { forecast } = require("./utils/forecast");


const app = express();
const port = process.env.PORT || 3000;
// console.log(__dirname);
// console.log(path.join(__dirname,'../public'));


//Define paths for express config
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views locations
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);
//Setup static directory to serve
app.use(express.static(publicDirectory));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather app!",
    name: "Melissa",
  });
});

//
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must have to provide an address",
    });
  }
  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        // return res.render('404', {errMessage: error})
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecastData: forecastData,
          searched_location: req.query.address,
          location,
        });
      });
    }
  );

  //   res.send("<h1>Weather is all good!</h1>");
  //   res.send(
  //     {
  //        Forecast:  'good',
  //        location: 'philadelphia',
  //        address: req.query.address
  //     }
  // )
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide search pattern",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Aniza",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "Here some helpfull text",
    name: "Ganiza",
  });
});
app.get("/", (req, res) => {
  res.send("Hello express!");
});

app.get("/help/*", (req, res) => {
  // res.send('Help article not found')
  res.render("404", {
    errMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  // res.send('My 404 page');
  res.render("404", {
    errMessage: "404 Error",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
