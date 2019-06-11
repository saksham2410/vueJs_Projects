const express = require("express");
require('dotenv').config();
const mysql = require("mysql");
const cors = require("cors");
var bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
const db = mysql.createConnection({
  host: "localhost",
  database: "data1",
  user: "root",
  password: "password"
});

// const db = mysql.createConnection({
//   host     : 3.218.108.144,
//   user     : project_admin,
//   password : Zolo@123,
//   database : test1
// });

const staticFileMiddleware = express.static('dist');

// 1st call for unredirected requests 
app.use(staticFileMiddleware);

const query = sqlStatement =>
  new Promise((resolve, reject) => {
    db.query(sqlStatement, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });

app.use(
  cors({
    origin: process.env.CORS_URL
  })
);
// app.use(express.json());
// app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.send("Hello World");
});

const getUserData = tableName => async (req, res) => {
  const userData = await query(
    `select DISTINCT CITY, LOCALNAME from ${tableName} where TYPE = "Property"`
  );
  console.log(userData);
  res.json(userData);
};

/**
 * this mehtod insertes a new table record filling the ID automatically meaning no need to send the ID with the request
 * @param {string} tableName
 */
const insertTableRow = tableName => async (req, res) => {
  //first value is always the ID which is auto generated by MySQL
  let sqlValuesStatment = "(NULL";
  for (let column in req.body) {
    sqlValuesStatment += `, '${req.body[column]}'`;
  }
  sqlValuesStatment += ")";
  // console.log(sqlValuesStatment);
  const insertedTableRow = await query(
    `insert into ${tableName} values ${sqlValuesStatment}`
  );
  res.json(insertedTableRow);
};

/**
 * this method creates the basic API template for a given table name using the name as route of the api
 * @param {string} tableName
 */


const createTableBasicAPI = tableName => {
  app.get(`/${tableName}/userdata`, getUserData(`${tableName}`));
  app.post(`/${tableName}/insert`, insertTableRow(`${tableName}`));
};

createTableBasicAPI("legalbase");
createTableBasicAPI("headerdata");
const PORT = process.env.PORT || 3000;
app.listen(PORT);

