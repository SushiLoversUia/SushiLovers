'use strict';



let lastClickedElem = null;
let squareCnt = 0;

//make it clear what slide you are working on
let lastSlide = null;
let slideCnt = 1;

//store current(maybe all the slides, work on it later) slide.
let slideInfo = [];

function tempFunc(){
    let tempSlide = document.getElementById("slideMiddle");
    tempSlide.style.visibility = "hidden";
}

function tempFunc2(){
    let tempSlide = document.getElementById("slideMiddle");
    tempSlide.style.visibility = "visible";
}
function makeNewSlide() {

    let parentDiv = document.getElementById("midColLeft");
    let slide = document.createElement("div");
    slide.setAttribute("id", "leftSlide");
    slideCnt++;
    slide.innerHTML = `${slideCnt}`;
    slide.onclick = showOnMiddle;

    parentDiv.appendChild(slide);

}
//make slides clickable and ..



function showOnMiddle() {
    console.log("here is showOnMiddle function working");
    // make invisible all the slides
    // make visible only one slide, user clicked last time

}


//to put image data inside of figure(currently only square)
function previewFiles() {
    let files = document.querySelector('input[type=file]').files;

    function readAndPreview(file) {
        // Make sure `file.name` matches our extensions criteria
        if (/\.(jpe?g|png|gif)$/i.test(file.name)) {

            let reader = new FileReader();
            reader.addEventListener("load", function () {
                let image = new Image();
                image.title = file.name;
                image.src = this.result;

                //put the image user just clicked inside of last clicked squares
                lastClickedElem.style.backgroundImage = `url(${image.src})`;
            }, false);
            reader.readAsDataURL(file);
        }
    }
    //don't need it now, case of user clicked several images
    if (files) {
        [].forEach.call(files, readAndPreview);
    }
}

//making new squares, it's just temporary information to test other functions, info that we are putting inside is not important
function newSquare() {
    let parentDiv = document.getElementById('slideMiddle');

    let square = document.createElement("div");
    square.setAttribute("id", `square`);
    square.style.width = "30%";
    square.style.height = "50%";
    square.style.left = "10%";
    square.style.top = "10%";
    square.style.fontSize = "30px";
    square.style.color = "rgb(255, 0, 0)";
    square.style.textAlign = "center";
    // square.style.backgroundImage = "url('image/tree.jpg')";
    let resizeHandle_square = document.createElement("div")
    resizeHandle_square.setAttribute("id", "handleResize");
    square.appendChild(resizeHandle_square);

    let textP = document.createElement("p");
    textP.setAttribute("id", "text");
    textP.contentEditable = "true";
    textP.innerHTML = `squareCnt:${squareCnt}!`;
    squareCnt++;
    square.appendChild(textP);

    parentDiv.appendChild(square);
    dragElement(square, parentDiv);
}
//save all info about 
function save() {
    console.log("you just clicked save button!");

    let parentDiv = document.getElementById('slideMiddle');
    let childNodes = parentDiv.childNodes;
    //storing square figures
    for (let i = 0; i < childNodes.length; i++) {
        if (childNodes[i].id === "square") {
            saveSquares(childNodes[i], parentDiv);
        }
    }
    console.log(slideInfo);
    localStorage.setItem('storage_figures', JSON.stringify(slideInfo));
}

//save function helper, only for saving squares since different figures would have different features
function saveSquares(square, parentDiv) {
    let parentDivHeight = parentDiv.offsetHeight;
    let parentDivWidth = parentDiv.offsetWidth;

    //square figure information
    //currently store binary data of image in this obj.
    let figureInfo = {
        "type": "",
        "size": {
            "width": "",
            "height": ""
        },
        "position": {
            "left": "",
            "top": ""
        },
        "text": {
            "content": "",
            "fontSize": "",
            "fontcolor": "",
            "textAlign": ""
        },
        "image": {
            "src": ""
        }

    }

    let figure = square;


    /*********************************************************** */
    /* get information to put them in infoStructure ************ */
    /*********************************************************** */
    //figure size info
    let figureHeight = figure.offsetHeight / parentDivHeight * 100 + "%";
    let figureWidth = figure.offsetWidth / parentDivWidth * 100 + "%";

    //figure position info
    let figureLeft = figure.offsetLeft / parentDivWidth * 100 + "%";
    let figureTop = figure.offsetTop / parentDivHeight * 100 + "%";

    //figure text info
    let figureText = figure.querySelector("#text");
    let figureText_content = figureText.innerHTML;

    //figure text css
    let figureText_fontSize = figure.style.fontSize;
    let figureText_color = figure.style.color;
    let figureText_Align = figure.style.textAlign;

    //figure backgroud image
    let figureImg_src = figure.style.backgroundImage;


    
    /*********************************************************** */
    /**** put info just got above in the structure ************ */
    /*********************************************************** */
    figureInfo.type = "square";
    figureInfo.size.height = figureHeight;
    figureInfo.size.width = figureWidth;

    figureInfo.position.top = figureTop;
    figureInfo.position.left = figureLeft;

    figureInfo.text.content = figureText_content;
    figureInfo.text.fontSize = figureText_fontSize;
    figureInfo.text.fontcolor = figureText_color;
    figureInfo.text.textAlign = figureText_Align;

    figureInfo.image.src = figureImg_src;


    //put all the info in slideInfo.
    slideInfo.push(figureInfo);
}

//open resotred data, currently using localStorage 
function open() {
    let parentDiv = document.getElementById('slideMiddle');
    let figures_string = localStorage.getItem("storage_figures");
    let figures_json = JSON.parse(figures_string);

    console.log(figures_json);

    //loop through all the data we just got
    for (let i = 0; i < figures_json.length; i++) {

        //case of square information >> call the recallSquares for opening speicifically squares
        if (figures_json[i].type == "square") {
            recallSquares(figures_json[i], parentDiv);
        }

        //other figures, should add later
        else {
        }
    }
}

//open function helper, same reason with saveSquares, to retrive squares we need specific function for open squares.
function recallSquares(squareInfo, parentDiv) {

    //making new div >> it will be square figure at the end
    let square = document.createElement("div");
    square.setAttribute("id", `square`);

    /*********************************************************** */
    /**** put the square information we just retrived ************ */
    /*********************************************************** */

    //size info
    square.style.width = squareInfo.size.width;
    square.style.height = squareInfo.size.height;
    
    //position info
    square.style.left = squareInfo.position.left;
    square.style.top = squareInfo.position.top;

    //text css
    square.style.fontSize = squareInfo.text.fontSize;
    square.style.color = squareInfo.text.fontcolor;
    square.style.textAlign = squareInfo.text.textAlign;

    //square background
    square.style.backgroundImage = squareInfo.image.src;

    //making handle for resizing and put it inside of square div we are making now
    let resizeHandle_square = document.createElement("div")
    resizeHandle_square.setAttribute("id", "handleResize");
    square.appendChild(resizeHandle_square);

    //making text element <p> and put it inside of div
    let textP = document.createElement("p");
    textP.setAttribute("id", "text");
    textP.contentEditable = "true";
    //put the original text info     
    textP.innerHTML = squareInfo.text.content;
    square.appendChild(textP);
    
    //put the square we have made so far inside of parentDiv(id : slideMiddle)
    parentDiv.appendChild(square);

    //add functionality(dragable, resizable) to the square we just made
    dragElement(square, parentDiv);

}


//handle all the event, drag, resize .. 
function dragElement(elmnt, parentDiv) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    let parentDivLeft = parseInt(parentDiv.offsetLeft);
    let parentDivTop = parseInt(parentDiv.offsetTop);

    let parentDivWidth = parseInt(parentDiv.offsetWidth);
    let parentDivHeight = parseInt(parentDiv.offsetHeight);

    let handle = document.getElementById('handleResize');
    let handleResizeWidth = handle.clientWidth;
    let handleResizeHeight = handle.clientHeight;

    elmnt.onmousedown = mouseDown;

    //decision to drag or resize or rotate or write something
    function mouseDown(e) {

        lastClickedElem = elmnt;

        let eleLeft = parseInt(elmnt.offsetLeft);
        let eleTop = parseInt(elmnt.offsetTop);
        let elemLeft_screen = eleLeft + parentDivLeft;//element top posY from  whole screen
        let elemTop_screen = eleTop + parentDivTop;//element top posY from whole screen

        e = e || window.event;
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;

        let cursurPosX_inElem = Math.abs(e.clientX - elemLeft_screen); //relative posX in element
        let cursurPosY_inElem = Math.abs(e.clientY - elemTop_screen); //relative posY in element

        //left top, right top, bottom left, bottom right range
        if (
            (cursurPosX_inElem > elmnt.offsetWidth - handleResizeWidth && cursurPosX_inElem < elmnt.offsetWidth) &&
            (cursurPosY_inElem > elmnt.offsetHeight - handleResizeHeight && cursurPosY_inElem < elmnt.offsetHeight)
        ) {
            document.onmouseup = closeElementDrag_resize;
            document.onmousemove = elementDrag_resize;
        } else {
            document.onmouseup = closeElementDrag_move;
            document.onmousemove = elementDrag_move;
        }
    }

    function elementDrag_resize(e) {
        e = e || window.event;
        // calculate the new cursor position:
        //pos1, pos2 are new cursor position diff
        pos1 = e.clientX - pos3;
        pos2 = e.clientY - pos4;

        //have to make pos3,pos4 as startup pos
        pos3 = e.clientX;
        pos4 = e.clientY;

        elmnt.style.width = (elmnt.offsetWidth + pos1) + 'px';
        elmnt.style.height = (elmnt.offsetHeight + pos2) + 'px';
    }

    function closeElementDrag_resize(e) {
        // window.removeEventListener('mousemove', startResizing, false);
        // window.removeEventListener('mouseup', stopResizing, false);
        document.onmousemove = null;
        document.onmouseup = null;
    }

    function elementDrag_move(e) {
        e = e || window.event;
        // calculate the new cursor position:
        //pos1, pos2 are new cursor position diff
        pos1 = e.clientX - pos3;
        pos2 = e.clientY - pos4;

        //have to make pos3,pos4 as startup pos
        pos3 = e.clientX;
        pos4 = e.clientY;

        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop + pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft + pos1) + "px";
    }

    function closeElementDrag_move() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
