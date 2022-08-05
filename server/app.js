const express = require('express');
const app = express();
const port = 3003;
const cors = require("cors");
app.use(express.json({ limit: '10mb' }));
app.use(cors());
const mysql = require("mysql");
// const md5 = require('js-md5');
// const uuid = require('uuid');

app.use(
  express.urlencoded({
      extended: true,
  })
);
app.use(express.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "lesu_rinkimas",
});

// FRONT READ IDEAS
app.get("/ideas", (req, res) => {
  const sql = `
SELECT *
FROM ideas
`;
  con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
  });
});

// FRONT READ DONATORS
app.get("/donators", (req, res) => {
  const sql = `
SELECT *
FROM donators
`;
  con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
  });
});

//FRONT CREATE IDEA
app.post("/ideas", (req, res) => {
  const sql = `
  INSERT INTO ideas
  (idea, photo, sum)
  VALUES (?, ?, ?)
  `;
  con.query(sql, [req.body.idea, req.body.photo, req.body.sum], (err, result) => {
      if (err) throw err;
      res.send({ result, msg: { text: "Sukurta nauja idėja!", type: "success" } });
  });
});

//FRONT CREATE DONATION
app.post("/donators", (req, res) => {
  const sql = `
  INSERT INTO donators
  (name, donation, idea_id)
  VALUES (?, ?, ?)
  `;
  con.query(sql, [req.body.name, req.body.donation, req.body.idea_id], (err, result) => {
      if (err) throw err;
      res.send({ result, msg: { text: "Sukurta nauja idėja!", type: "success" } });
  });
});













app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })