const express = require('express');
const mysql = require('mysql');
const app = express();
const PORT = 3005;
const bodyParser = require("body-parser");


let cors = require("cors");
const methodoverride = require('method-override')
app.use(methodoverride('_method'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'nayan_dbms',
    database: 'bfs'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected');
});

// API endpoint to fetch data
app.get('/data', (req, res) => {
    const query = 'SELECT * FROM patent';
    db.query(query, (err, result) => {
        if (err) {
            res.status(500).send('Error fetching data');
            return;
        }
        res.json(result);
    });
});
app.post('/userdata', (req, res) => {
    console.log("inside userdata")
    console.log(req.body)
    const username = `%${req.body[0]}%`;
    console.log(username)
    const query = 'SELECT * FROM patent WHERE inventors_name LIKE ?';
    db.query(query,[username], (err, result) => {
        if (err) {
            res.status(500).send('Error fetching data');
            return;
        }
        console.log("results",result)
        res.json(result);
    });
});

app.post('/userdata/patents', (req, res) => {
    console.log("inside userdata patemts")
    console.log(req.body)
    const username = `%${req.body[0]}%`;
    console.log(username)
    const query = 'SELECT * FROM patent WHERE inventors_name LIKE ? and status_patent = "GRANTED"';
    db.query(query,[username], (err, result) => {
        if (err) {
            res.status(500).send('Error fetching data');
            return;
        }
        console.log("results patents",result)
        res.json(result);
    });
});

app.post('/register', (req, res) => {
    console.log("iufhewio");
    console.log(req.body);
    const { firstName, lastName, email, password } = req.body;
    console.log(firstName, lastName, email, password);
    // Insert user data into MySQL database
    const sql = 'INSERT INTO Users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)';
    const values = [firstName, lastName, email, password];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting user data into MySQL:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        console.log('User registered successfully');

        res.status(200).send(values);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
