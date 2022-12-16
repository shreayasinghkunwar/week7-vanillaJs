const express = require('express');
const app = express();
const { connection } = require('./db/config');
const { Board } = require('./model/drawboard');
const port = 5500;
app.use(express.static('public'));
app.use(express.json());



app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})