const express = require("express");
require('dotenv').config();
const mysql = require("mysql");
const cors = require("cors");
var bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
 const db = mysql.createConnection({
  host: "34.205.83.88",
  database: "Analytics_Prototype",
  user: "analytics_proto",
  password: "analytics_123"
 });

const staticFileMiddleware = express.static('dist');

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

const getProjData = tableName => async (req, res) => {
  const projdata = await query(
    `select field_name from ${tableName} where form_type='prs'`
  );
  console.log(projdata);
  res.json(projdata);
};

const getUserDataCity = tableName => async (req, res) => {
  const userDataCity = await query(
    `select DISTINCT CITY from ${tableName} where TYPE = "Property"`
  );
  console.log(userDataCity);
  res.json(userDataCity);
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
  app.get(`/${tableName}/projdata`, getProjData(`${tableName}`));
  app.get(`/${tableName}/userdatacity`, getUserDataCity(`${tableName}`));
  app.post(`/${tableName}/insert`, insertTableRow(`${tableName}`));
};

createTableBasicAPI("prs");
createTableBasicAPI("Zolo_city");
createTableBasicAPI("proj_type");
const PORT = process.env.PORT || 4200;
app.listen(PORT);


// import pandas as pd
// import sqlalchemy
// engine = sqlalchemy.create_engine("mysql+pymysql://analytics_admin:DpWBOfz871Sa@34.205.83.88/zolo_analytics_metabase")
// df = pd.read_sql_table('Kitchen_menu',engine)
// df