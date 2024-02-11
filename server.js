const express = require('express');
const mysql = require('mysql');
const app = express();
const PORT = 3005;
let cors = require("cors");
app.use(cors());
// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
