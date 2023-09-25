const express = require("express");
const app = express();
const port = 3002;
const bodyParser = require("body-parser");
const fs = require("fs");
const { isUtf8 } = require("buffer");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post(`/`, (req, res) => {
  let response = [
    {
      name: req.body.name,
      address: req.body.address,
    },
  ];
  let data = fs.writeFileSync("./data.json", JSON.stringify(response));
  res.send({ data: response, error: null, status: 200 });
});

app.get(`/`, (req, res) => {
  try {
    let data = fs.readFileSync("data.json", "utf-8");
    return res.send({ data: JSON.parse(data), error: null, status: 200 });
  } catch (e) {
    console.log(`Error in Get Data ${e.message}`);
  }
});

app.put(`/`, (req, res) => {
  let data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
  let flag = 0;
  let response = {
    name: req.body.name,
    address: req.body.address,
  };
  for (value of data) {
    if (value.name == req.body.name) {
      res.send("data already Exists");
      flag = 1;
    }
  }
  if (!flag) {
    data.push(response);
    data = JSON.stringify(data);
    fs.writeFileSync("data.json", data, (err) => {
      if (err) {
        res.send({ data: null, error: err, status: 404 });
      }
    });
    return res.send({ data: JSON.parse(data), error: null, status: 200 });
  }
});
app.listen(port, () => {
  console.log(`We are listening On Port http://localhost:${port}`);
});
