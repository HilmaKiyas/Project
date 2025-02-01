const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Hilma22#',
    database: 'sales_test'
});

app.use(cors());
app.use(bodyParser.json());

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ' + err.stack);
        return;
    }
    console.log('Connected to the database as ID ' + connection.threadId);
});

app.get('/saleschart', (req, res) => {
    connection.query('SELECT * FROM sales', (error, results) => {
        if (error) {
            console.error('Error fetching users from the database: ' + error.stack);
            return res.status(500).json({ error: 'Failed to fetch users' });
        }
        res.json(results);
    });
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
