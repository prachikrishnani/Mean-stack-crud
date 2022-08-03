const express = require("express");
const bodyparser = require("body-parser");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const cors = require('cors')
require("dotenv").config();
dotenv.config({ path: "./config.env" });
const path = require("path");

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyparser.urlencoded({ extended: false }));
app.use(cors())
app.use(bodyparser.json());

let conn = mysql.createConnection({
    connectionLimit: 10,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(
    "/",
    express.static(path.join(__dirname, "./frontend/dist/frontend"))
  );
  }

app.get("/items", (req, res) => {
    conn.query(`select * from groceries`, (err, result) => {
        if (!err) {
            res.send(result);
        } else {
            console.log(err.message);
        }
    });
});

app.get('/items/:id', (req, res) => {
    let id = req.params.id
    conn.query(`select * from groceries where id=${id}`, (err, result) => {
        if (err) console.log(err);
        else res.send(result)
    })
})


app.delete('/items/:id', (req, res) => {
    let id = req.params.id
    conn.query(`delete from groceries where id=${id}`, (err, result) => {
        if (err) console.log(err);
        else{ 
            res.send(result)
            console.log('item deleted')
        }
    })
})


app.post('/items', (req, res) => {
    let item = req.body.item
    conn.query(`insert into groceries (item) values ('${item}') `, (err, result) => {
        if (err) console.log(err);
        else {
            console.log(item);
            res.send(result)
        }
    })
})

app.put('/items/:id', (req, res) => {
    let id = req.params.id
    let item = req.body.item
    conn.query(`update groceries set item='${item}' where id=${id}`, (err, result) => {
        if (err) console.log(err);
        else res.send(result)
    })
})

app.delete('/items', (req, res) => {
    conn.query(`truncate table groceries`, (err, result) => {
        if (err) console.log(err);
        else {
            res.send(result)
            console.log('all items deleted')
        }
    })
})

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
