const express = require('express');
const app = express();
const port = 3003;
const cors = require("cors");
app.use(express.json({ limit: '10mb' }));
app.use(cors());
const mysql = require("mysql");
const md5 = require('js-md5');
const uuid = require('uuid');

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

const doAuth = function(req, res, next) {
  if (0 === req.url.indexOf('/admin')) { // admin
      const sql = `
      SELECT
      name, role
      FROM users
      WHERE session = ?
  `;
      con.query(
          sql, [req.headers['authorization'] || ''],
          (err, results) => {
              if (err) throw err;
              if (!results.length || results[0].role !== 'admin') {
                  res.status(401).send({});
                  req.connection.destroy();
              } else {
                  next();
              }
          }
      );
  } else if (0 === req.url.indexOf('/login-check') || 0 === req.url.indexOf('/login')) {
      next();
  } else { // fron
      const sql = `
      SELECT
      name, role
      FROM users
      WHERE session = ?
  `;
      con.query(
          sql, [req.headers['authorization'] || ''],
          (err, results) => {
              if (err) throw err;
              if (!results.length) {
                  res.status(401).send({});
                  req.connection.destroy();
              } else {
                  next();
              }
          }
      );
  }
}
app.use(doAuth)

// AUTH
app.get("/login-check", (req, res) => {
  let sql;
  let requests;
  if (req.query.role === 'admin') {
      sql = `
      SELECT
      name
      FROM users
      WHERE session = ? AND role = ?
      `;
      requests = [req.headers['authorization'] || '', req.query.role];
  } else {
      sql = `
      SELECT
      name
      FROM users
      WHERE session = ?
      `;
      requests = [req.headers['authorization'] || ''];
  }
  con.query(sql, requests, (err, result) => {
      if (err) throw err;
      if (!result.length) {
          res.send({ msg: 'error' });
      } else {
          res.send({ msg: 'ok' });
      }
  });
});

//LOGIN
app.post("/login", (req, res) => {
  const key = uuid.v4();
  const sql = `
  UPDATE users
  SET session = ?
  WHERE name = ? AND pass = ?
`;
  con.query(sql, [key, req.body.user, md5(req.body.pass)], (err, result) => {
      if (err) throw err;
      if (!result.affectedRows) {
          res.send({ msg: 'error', key: '' });
      } else {
          res.send({ msg: 'ok', key });
      }
  });
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

//BACK DELETE IDEA
app.delete("/ideas/:id", (req, res) => {
  const sql = `
  DELETE FROM ideas
  WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
      if (err) throw err;
      res.send({ result, msg: { text: 'Idėja buvo ištrinta', type: 'danger' } });
  });
});

//BACK EDIT IDEA
app.put("/ideas/:id", (req, res) => {
  const sql = `
  UPDATE ideas
  SET verify = ?
  WHERE id = ?
  `;
  con.query(sql, [req.body.verify, req.params.id], (err, result) => {
      if (err) throw err;
      res.send({ result, msg: { text: 'Savivaldybė redaguota', type: 'success' } });
  });
});












app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })