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

    squareCnt++;

    parentDiv.appendChild(square);
    dragElement(square, parentDiv);

    return square;
}

function newTextbox() {

    let square = makeNewSquare()

    let textP = document.createElement("p");
    textP.setAttribute("id", "text");
    textP.style.width = "100%";
    textP.style.height = "100%";
    textP.contentEditable = "true";
    textP.innerHTML = 'Click to edit';

    square.appendChild(textP);

    return square;
}

function slideDefault() {

    let header = makeNewSquare()

    header.style.width = "86%";
    header.style.height = "20%";

    header.style.left = "7%";;
    header.style.top = "6%";;
    header.style.textAlign = "center";

    let textP = document.createElement("p");
    textP.setAttribute("id", "text");
    textP.style.width = "100%";
    textP.style.height = "100%";
    textP.contentEditable = "true";
    textP.innerHTML = 'Heading';

    header.appendChild(textP);

    let body = makeNewSquare()

    body.style.width = "86%";
    body.style.height = "55%";

    body.style.left = "7%";
    body.style.top = "30%";
    body.style.textAlign = "center";

    let textP2 = document.createElement("p");
    textP2.setAttribute("id", "text");
    textP2.style.width = "100%";
    textP2.style.height = "100%";
    textP2.contentEditable = "true";
    textP2.innerHTML = 'Enter text';

    body.appendChild(textP2);

    return 0;
}

