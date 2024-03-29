const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
var bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));



// parse application/json
app.use(bodyParser.json());
// const db = mysql.createConnection({
//   host: "34.205.83.88",
//   database: "zolo_analytics_metabase",
//   user: "analytics_admin",
//   password: "DpWBOfz871Sa"
// });

const db = mysql.createConnection({
  host: "localhost",
  database: "data1",
  user: "root",
  password: "password"
});

const query = sqlStatement =>
  new Promise((resolve, reject) => {
    db.query(sqlStatement, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });

app.use(
  cors({
    origin: "http://localhost:8080"
  })
);
// app.use(express.json());
// app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.send("Hello World");
});

let meow = "";
let meoww ='';
let meow2 = '';

/**
 * this mehtod returns all the records of a given table
 * @param {string} tableName
 */

const getAllTableData = tableName => async (req, res) => {
  const tableData = await query(`select * from ${tableName}`);
  res.json(tableData);
};


const getDate = () => async (req, res) => {
  meow = req.body.todo;
  meoww = req.body.todo1;
  meow2 = req.body.todo2;
  console.log("fetchDate", meow);
  console.log("fetchcity", meoww);
  console.log("meal-type", meow2);
  // const insertedTableRow2 = await query(
  //   `insert into Kitchen_menu values (NULL,NULL,NULL,NULL,NULL,NULL,NULL)`
  // );
  // res.json(insertedTableRow2);
  // console.log('MNeow', meow);
  // return meow
  res.json('Okayyyz');
};  


const getSomeTableDataBreakfast = tableName => async (req, res) => {
  // console.log('Shivam');
  // var sohail = getDate().meow;
  // // if(sohail)
  // console.log("Breakfast", sohail);
  console.log('Breakfast-Date', meow);
  const tableData1 = await query(
    `select * from ${tableName} where meal_type = "breakfast" and daily_date='${meow}' and userhotel='${meoww}'`
  );
  res.json(tableData1);
};

const getSomeTableDataLunch = tableName => async (req, res) => {
  console.log("Lunch-Date", meow);
  const tableData8 = await query(
    `select * from ${tableName} where meal_type = "lunch" and daily_date='${meow}'and userhotel='${meoww}'`
  );
  console.log(tableData8);
  res.json(tableData8);
};

const getSomeTableDataDinner = tableName => async (req, res) => {
  console.log("Dinner-Date", meow);
  const tableData9 = await query(
    `select * from ${tableName} where meal_type = "dinner" and daily_date='${meow}'and userhotel='${meoww}'`
  );
  res.json(tableData9);
};

const getUserData = tableName => async (req, res) => {
  const userData = await query(
    `select DISTINCT CITY, LOCALNAME from ${tableName} where TYPE = "Kitchen"`
  );
  console.log(userData);
  res.json(userData);
};

const getUserData1 = tableName => async (req, res) => {
  const userData1 = await query(
    `select vessel_id from ${tableName} where vessel_status = "Active"`
  );
  console.log(userData1);
  res.json(userData1);
};

const getUserDataCity = tableName => async (req, res) => {
  console.log("helloeoeoeooe");
  const userDataCity = await query(
    `select item_name from ${tableName} where daily_date='${meow}'and userhotel='${meoww}' and meal_type='${meow2}'`
  );
  console.log(userDataCity);
  res.json(userDataCity);
};


// console.log('Try',meow);

const getDistinctDates = tableName => async (req, res) => {
  const tableData3 = await query(`select DISTINCT daily_date from ${tableName}`);
  // tableData1.forEach(element => {
  //   console.log(element);
  //   const tableData2 =  query(`select * from ${tableName} WHERE daily_date = ${element}`);
  // });
  // console.log(tableData3);
  res.json(tableData3);
};

// const getDate = () => async(req,res) => {
//   console.log(req.body.id2);
// }

/**
 * this mehtod uses the ID from the body of the request object to delete the record in the table
 * @param {string} tableName
 */
const deleteTableRow = tableName => async (req, res) => {
  console.log(req.body.id);
  const deletedRow = await query(
    `delete from ${tableName} where daily_date='${req.body.id}'`
  );
  res.json(deletedRow);
};
// let data1=json(tableData1);
// // let tableData2 = [];
//   const getSomeMealData = (tableName) =>
//   async (req, res) => {
//     const index=0;
//     for(index;index<data1.data.length;index++){
//     const tableData2 = await query(`select * from ${tableName} WHERE date= ${tableData1.data[index]}`);
//     res.json(tableData2);}

//   }

/**
 * this mehtod returns the tables schema
 * @param {string} tableName
 */
const getTableSchema = tableName => async (req, res) => {
  const tableSchema = await query(`describe ${tableName}`);
  res.json(tableSchema);
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
 * this mehtod uses the ID from the body of the request object to update the record
 * @param {string} tableName
 */
const updateTableRow = tableName => async (req, res) => {
  let sqlSetStatment = "set ";
  for (let column in req.body) {
    if (column === "id") continue;
    sqlSetStatment += `${column} = '${req.body[column]}',`;
  }
  sqlSetStatment = sqlSetStatment.slice(0, -1);

  const updatedRow = await query(
    `update ${tableName} ${sqlSetStatment} where id=${req.body.id}`
  );
  res.json(updatedRow);
};

/**
 * this method creates the basic API template for a given table name using the name as route of the api
 * @param {string} tableName
 */


const createTableBasicAPI = tableName => {
  app.post(`/date`, getDate());  
  app.get(`/${tableName}`, getAllTableData(`${tableName}`));
  app.get(`/${tableName}/userdata`, getUserData(`${tableName}`));
  app.get(`/${tableName}/userdata1`, getUserData1(`${tableName}`));
  app.get(`/${tableName}/userdatacity`, getUserDataCity(`${tableName}`));
  app.get(`/${tableName}/getdistinct`, getDistinctDates(`${tableName}`));
  app.post(`/${tableName}/insert`, insertTableRow(`${tableName}`));
  app.delete(`/${tableName}/delete`, deleteTableRow(`${tableName}`));
  app.patch(`/${tableName}/update`, updateTableRow(`${tableName}`));
};

createTableBasicAPI("Kitchen_menu");
createTableBasicAPI("meal_analysis");
createTableBasicAPI("Zolo_city");
createTableBasicAPI("vessel_data");

app.listen(3000, () => console.log("Listening at http://localhost:3000/"));


// import pandas as pd
// import sqlalchemy
// engine = sqlalchemy.create_engine("mysql+pymysql://analytics_admin:DpWBOfz871Sa@34.205.83.88/zolo_analytics_metabase")
// df = pd.read_sql_table('Kitchen_menu',engine)
// df
