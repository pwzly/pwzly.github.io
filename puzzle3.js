var rows = 3;
var columns = 3;

var currTile;
var otherTile; //blank tile

var turns = 0;

// var imgOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
var imgOrder = ["5309", "5311", "5316", "5312", "5310", "5313", "5315", "5314","5317"];
var imgOrder1 = ["5309", "5310", "5311", "5312", "5313", "5314", "5315","5316", "5317"];

window.onload = function() {
    for (let r=0; r < rows; r++) {
        for (let c=0; c < columns; c++) {

            //<img id="0-0" src="1.jpg">
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "img/" + imgOrder.shift() + ".jpg";

            //DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart);  //click an image to drag
            tile.addEventListener("dragover", dragOver);    //moving image around while clicked
            tile.addEventListener("dragenter", dragEnter);  //dragging image onto another one
            tile.addEventListener("dragleave", dragLeave);  //dragged image leaving anohter image
            tile.addEventListener("drop", dragDrop);        //drag an image over another image, drop the image
            tile.addEventListener("dragend", dragEnd);      //after drag drop, swap the two tiles

            document.getElementById("board").append(tile);

        }
    }
}

function dragStart() {
    currTile = this; //this refers to the img tile being dragged
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this; //this refers to the img tile being dropped on
}

function dragEnd() {
    //if (!otherTile.src.includes("3.jpg")) {
    //    return;
    //}

    let currCoords = currTile.id.split("-"); //ex) "0-0" -> ["0", "0"]
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = r == r2 && c2 == c-1;
    let moveRight = r == r2 && c2 == c+1;

    let moveUp = c == c2 && r2 == r-1;
    let moveDown = c == c2 && r2 == r+1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;

        turns += 1;
        document.getElementById("turns").innerText = turns;
    }

    let newImgOrder = [];
            document.querySelectorAll('#board img').forEach(img => {
                let idParts = img.id.split('-');
                let row = parseInt(idParts[0]);
                let col = parseInt(idParts[1]);
                newImgOrder.push(img.src.substring(img.src.lastIndexOf('/') + 1, img.src.lastIndexOf('.')));
            });

            let sequencesMatch = true;
            for (let i = 0; i < imgOrder1.length; i++) {
                if (newImgOrder[i] !== imgOrder1[i]) {
                    sequencesMatch = false;
                    break;
                }
            }
            // If sequences match, display the button
            if (sequencesMatch) {
                  document.getElementById("GAMEEND").style.display = "block";
                  document.getElementById("button").style.display = "block";
            }

}