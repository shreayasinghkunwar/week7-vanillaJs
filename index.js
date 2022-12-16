const express = require('express');
const app = express();
const { connection } = require('./db/config');
const { Board } = require('./model/drawboard');
const port = 5500;
app.use(express.static('public'));
app.use(express.json());

connection.once("open", function () {
    console.log("MongoDB database connection established successfully");
});

async function emptyTable() {
    const del = await connection.dropCollection("Board")
    console.log('del', del)
}

app.post('/api', async (req, res) => {
    try {
        emptyTable();
        const data = req.body;
        const insertData = await Board.create(data);
        res.json({
            status: 'recieved',
            datas: insertData
        });
    } catch (e) {
        res.send(e);
    }
})


app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})