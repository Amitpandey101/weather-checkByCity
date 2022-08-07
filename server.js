require("dotenv").config();
require("./db/connection");
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const fetch = require("node-fetch");
const requestModal = require("./model/request-model");

app.listen(port, (err) => {
  if (!err) {
    console.log(`server has started at ${port}`);
  } else {
    console.log(err);
  }
});
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("form");
});

app.get("/weather", async (req, res) => {
  const citydata = await requestModal.find();

  const location = citydata.reverse()[0].cityname;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${process.env.API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  res.render("index", { data: data });
});

app.post("/", async (req, res) => {
  const date = new Date();
  let finalDate = date + "";
  finalDate = finalDate.split(" ").splice(1, 3).join(" ");
  const mytime = new Date().toLocaleTimeString();
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${req.body.cityname}&units=metric&appid=${process.env.API_KEY}`;
  const response = await fetch(url);
  const weatherData = await response.json();
  const myCity = req.body.cityname;
  const mycity1 = myCity.charAt(0).toUpperCase() + myCity.slice(1);
  if (weatherData.cod == "404" || myCity === "") {
    res.status(404).render("error404");
  } else {
    requestModal
      .create({
        cityname: mycity1,
        date: finalDate,
        time: mytime,
      })
      .then(() => {
        res.redirect("/weather");
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
});
app.get("/requests", (req, res) => {
  requestModal
    .find()
    .then((data) => {
      res.render("table", { data: data });
    })
    .catch((err) => {
      console.log(err);
    });
});
