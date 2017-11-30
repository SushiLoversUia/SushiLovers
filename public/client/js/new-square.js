'use strict';

//making new squares, it's just temporary information to test other functions, info that we are putting inside is not important
function makeNewSquare() {
    let parentDiv = lastClicked_MiddleSlide;

    let square = document.createElement("div");
    square.setAttribute("id", `square`);
    square.style.width = "20%";
    square.style.height = "30%";

    // square.style.left = "10%";
    // square.style.top = "10%";
    square.style.left = `${generateRanNum()}%`;
    square.style.top = `${generateRanNum()}%`;

    square.style.fontSize = "30px";
    square.style.color = "rgb(255, 0, 0)";
    square.style.textAlign = "center";
    square.style.zIndex = flag_zIndex;
    flag_zIndex++;
    // square.style.backgroundImage = "url('image/tree.jpg')";
    let resizeHandle_square = document.createElement("div")
    resizeHandle_square.setAttribute("id", "handleResize");
    square.appendChild(resizeHandle_square);

    let textP = document.createElement("p");
    textP.setAttribute("id", "text");
    textP.contentEditable = "true";
    // textP.innerHTML = `debug cnt :${squareCnt}`;
    squareCnt++;
    square.appendChild(textP);

    parentDiv.appendChild(square);
    dragElement(square, parentDiv);

    return square;
}


//making new squares, it's just temporary information to test other functions, info that we are putting inside is not important
function newTextbox() {
    let parentDiv = lastClicked_MiddleSlide;

    let square = document.createElement("div");
    square.setAttribute("id", `square`);
    square.style.width = "20%";
    square.style.height = "30%";


    // square.style.left = "10%";
    // square.style.top = "10%";
    square.style.left = `${generateRanNum()}%`;
    square.style.top = `${generateRanNum()}%`;


    square.style.fontSize = "30px";
    square.style.color = "rgb(0, 0, 0)";
    square.style.textAlign = "center";

    square.style.backgroundColor = "transparent";
    // square.style.backgroundImage = "url('image/tree.jpg')";
    let resizeHandle_square = document.createElement("div")
    resizeHandle_square.setAttribute("id", "handleResize");
    square.appendChild(resizeHandle_square);

    let textP = document.createElement("p");
    textP.setAttribute("id", "text");
    textP.contentEditable = "true";
    textP.innerHTML = `click to edit`;
    squareCnt++;
    square.appendChild(textP);

    parentDiv.appendChild(square);
    dragElement(square, parentDiv);
}

