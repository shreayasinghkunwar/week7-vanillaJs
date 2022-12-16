const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let board = new Schema({
    row: {
        type: Number
    },
    column: {
        type: Number
    },
    backgroundcolor: {
        type: String
    }
}, { collection: "Board" }
);

const Board = mongoose.model('Board', board);
module.exports = { Board };