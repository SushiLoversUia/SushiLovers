'use strict';

function makeNewSquare() {
    let parentDiv = getVisibleSlide();
    let square = document.createElement("div");
    square.id = 'square';
    square.style.backgroundColor = "transparent";
    square.style.zIndex = flag_zIndex;
    flag_zIndex++;

    square.style.width = "30%";
    square.style.height = "30%";

    square.style.left = "35%";
    square.style.top = "35%";

    square.style.left = `${generateRanNum()}%`;
    square.style.top = `${generateRanNum()}%`;

    let resizeHandle_square = document.createElement("div")
    resizeHandle_square.setAttribute("id", "handleResize");
    square.appendChild(resizeHandle_square);

    let textP = document.createElement("p");
    textP.setAttribute("id", "text");
    square.appendChild(textP);

    parentDiv.appendChild(square);
    dragElement(square, parentDiv);

    return square;
}

function newTextbox() {

    let parentDiv = getVisibleSlide();
    let square = document.createElement("div");
    square.id = 'square';
    square.style.backgroundColor = "transparent";
    square.style.zIndex = flag_zIndex;
    flag_zIndex++;

    square.style.width = "30%";
    square.style.height = "30%";

    square.style.left = "35%";
    square.style.top = "35%";

    square.style.left = `${generateRanNum()}%`;
    square.style.top = `${generateRanNum()}%`;

    let resizeHandle_square = document.createElement("div")
    resizeHandle_square.setAttribute("id", "handleResize");
    square.appendChild(resizeHandle_square);

    let textP = document.createElement("p");
    textP.setAttribute("id", "text");
    textP.style.width = "100%";
    textP.style.height = "100%";
    textP.contentEditable = "true";
    textP.innerHTML = 'Click to edit';
    square.appendChild(textP);

    parentDiv.appendChild(square);
    dragElement(square, parentDiv);

    return square;
}

function headerSquare() {
    let parentDiv = getVisibleSlide();


    let square = document.createElement("div");
    square.id = 'square';
    square.style.backgroundColor = "transparent";
    square.style.zIndex = flag_zIndex;
    flag_zIndex++;

    square.style.width = "86%";
    square.style.height = "20%";

    square.style.left = "7%";
    square.style.top = "6%";
    square.style.fontSize = "3em";
    
    square.style.textAlign = "center";

    let resizeHandle_square = document.createElement("div")
    resizeHandle_square.setAttribute("id", "handleResize");
    square.appendChild(resizeHandle_square);

    let textP = document.createElement("p");
    textP.setAttribute("id", "text");
    textP.style.width = "100%";
    textP.style.height = "100%";
    textP.contentEditable = "true";
    textP.innerHTML = 'Heading';
    square.appendChild(textP);

    parentDiv.appendChild(square);
    dragElement(square, parentDiv);

    // return square;
}

function subHeaderSquare(){

    let parentDiv = getVisibleSlide();

    let square = document.createElement("div");
    square.id = 'square';
    square.style.backgroundColor = "transparent";
    square.style.zIndex = flag_zIndex;
    flag_zIndex++;

    square.style.width = "86%";
    square.style.height = "60%";

    square.style.left = "7%";
    square.style.top = "33%";

    square.style.textAlign = "center";
    square.style.fontSize = "2em";
    let resizeHandle_square = document.createElement("div")
    resizeHandle_square.setAttribute("id", "handleResize");
    square.appendChild(resizeHandle_square);

    let textP = document.createElement("p");
    textP.setAttribute("id", "text");
    textP.style.width = "100%";
    textP.style.height = "100%";
    textP.contentEditable = "true";
    textP.innerHTML = 'Enter text';
    square.appendChild(textP);

    parentDiv.appendChild(square);
    dragElement(square, parentDiv);

}
function slideDefault() {


    headerSquare();
    subHeaderSquare();

    return 0;
}

