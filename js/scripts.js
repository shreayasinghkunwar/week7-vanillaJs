

const colorSelector = document.querySelectorAll(".colorpicker");
const board = document.querySelector(".drawboard");
const cancle = document.querySelector(".canclebtn");
const keys = document.querySelector(".color_key");
const stroke = document.querySelector(".strokebtn");
const cancelStroke = document.querySelector(".cancelStroke");
const save = document.querySelector(".savebtn");
let array_of_square = [];
let k = 1;
let draw = false
let color = "black";
let strokeBrush = false;
let square_index = [];
let data = [];
let flag = false;
//creating 2d array using 1d array
for (let i = 1; i <= 150; i++) {
    for (let j = 1; j <= 150; j++) {
        square_index[i] = [];
    }
}

function ConvertDataToObject() {
    data = [];
    for (let i = 1; i <= 150; i++) {
        for (let j = 1; j <= 150; j++) {
            if (square_index[i][j] !== undefined) {
                if (!data.length) {
                    let obj = {
                        row: i,
                        column: j,
                        backgroundcolor: square_index[i][j]

                    }
                    data.push(obj);
                }
                else {
                    for (let k = 0; k < data.length; k++) {
                        if (data[k]['row'] === i && data[k]['column'] === j) {
                            data[k]['backgroundcolor'] = square_index[i][j];
                            flag = false;
                        }
                        else {
                            flag = true;
                        }
                    }
                    if (flag) {
                        let obj = {
                            row: i,
                            column: j,
                            backgroundcolor: square_index[i][j]

                        }
                        data.push(obj);
                    }
                }
            }
        }
    }


}

async function insertIntoDb() {
    console.log(data);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'

        },
        body: JSON.stringify(data)
    }
    await fetch('/api', options)
}


save.addEventListener('click', () => {

    let uniqueSquares = _.uniq(array_of_square);
    console.log(uniqueSquares);
    let sortedArray = _.sortBy(uniqueSquares);
    console.log('sort', sortedArray);
    sortedArray.forEach(id => {
        console.log(id);
        //row of square
        if (id <= 150) {
            let row = 1;
            //column number of square
            let column = id;
            console.log('col', row, column);
            square_index[row][column] = document.getElementById(id).style.backgroundColor;
        }
        else {
            let row = Math.floor(id / 150) + 1;
            //column number of square
            let column = Math.abs(id - ((row - 1) * 150));
            console.log('col', row, column);
            square_index[row][column] = document.getElementById(id).style.backgroundColor;

        }

    });
    ConvertDataToObject();
    insertIntoDb();
    //console.log(square_index);


});


colorSelector.forEach(td => {
    td.addEventListener("click", () => {
        const selectedColor = td.style.backgroundColor;
        color = selectedColor;

    });
});

cancle.addEventListener('click', () => {
    strokeBrush = false;
    const td = document.querySelectorAll("td")
    td.forEach(cell => {
        cell.style.backgroundColor = "white"
    })
    array_of_square = [];
    for (let i = 1; i <= 150; i++) {
        for (let j = 1; j <= 150; j++) {
            square_index[i] = [];
        }
    }
    data = [];
    console.log(array_of_square);
    console.log(data);
})

stroke.addEventListener('click', () => {
    strokeBrush = true;

})

cancelStroke.addEventListener('click', () => {
    strokeBrush = false;
})



window.addEventListener('keydown', (e) => {

    let key = e.key;
    switch (key) {
        case "1":
            color = "red";
            break;
        case "2":
            color = "black";
            break;
        case "3":
            color = "blueviolet";
            break;
        case "4":
            color = "yellow";
            break;
        case "5":
            color = "green";
            break;
        default:
            alert(" Invalid Key!!");

    }
})

function createBoard() {

    for (let i = 1; i <= 150; i++) {
        let row = document.createElement('tr');



        for (let j = 1; j <= 150; j++) {

            let square = document.createElement('td');
            square.style.width = '2px !important'
            square.style.height = '2px !important'
            square.className = "pixel";
            square.id = `${k++}`
            console.log('id', square.id)
            row.appendChild(square);
            board.appendChild(row);
        }
    }

}


board.addEventListener('mousedown', (e) => {
    draw = true;
    e.target.style.backgroundColor = color
    array_of_square.push(e.target.id);
    console.log(array_of_square);

    // console.log(draw)
});
/*
board.addEventListener('click', (e) => {

    if (strokeBrush && draw) {

        e.target.style.backgroundColor = color;
        e.target.nextElementSibling.style.backgroundColor = color;
        e.target.previousElementSibling.style.backgroundColor = color;
        let x = e.target.id;

        let y1 = parseInt(x) + 150;
        let y2 = parseInt(x) - 150

        if (y1) {
            try {
                document.getElementById(y1).style.backgroundColor = color;
                document.getElementById(y1 + 1).style.backgroundColor = color;
                document.getElementById(y1 - 1).style.backgroundColor = color;
                array_of_square.push(y1, y1 + 1, y1 - 1);
                console.log(array_of_square);
            } catch (e) {
                console.log('Cell not available')
            }

        }
        if (y2) {
            try {
                document.getElementById(y2).style.backgroundColor = color;
                document.getElementById(y2 + 1).style.backgroundColor = color;
                document.getElementById(y2 - 1).style.backgroundColor = color;
                array_of_square.push(y2 + 1, y2, y2 - 1);
                console.log(array_of_square);
            } catch (e) {
                console.log('Cell not available')
            }

        }
    }

})*/
board.addEventListener('mouseup', () => {
    draw = false;


})
board.addEventListener('mouseover', (e) => {
    // console.log(draw)
    //   console.log(colr);

    if (draw) {
        if (strokeBrush) {
            e.target.style.backgroundColor = color;
            e.target.nextElementSibling.style.backgroundColor = color;
            e.target.previousElementSibling.style.backgroundColor = color;
            array_of_square.push(e.target.id, e.target.nextElementSibling.id, e.target.previousElementSibling.id);
            let x = e.target.id;
            let y1 = parseInt(x) + 150;
            let y2 = parseInt(x) - 150

            try {
                document.getElementById(y1).style.backgroundColor = color;
                document.getElementById(y1 + 1).style.backgroundColor = color;
                document.getElementById(y1 - 1).style.backgroundColor = color;
                array_of_square.push(y1, y1 + 1, y1 - 1);
                document.getElementById(y2).style.backgroundColor = color;
                document.getElementById(y2 + 1).style.backgroundColor = color;
                document.getElementById(y2 - 1).style.backgroundColor = color;
                array_of_square.push(y2 + 1, y2, y2 - 1);
                console.log(array_of_square);
            } catch (e) {
                console.log('Cell not available')
            }


        }

        else {
            e.target.style.backgroundColor = color;
            array_of_square.push(e.target.id)
            console.log(array_of_square);



        }

    }

    // console.log(e.target);

});
// draw(e);







createBoard();


