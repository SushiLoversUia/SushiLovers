'use strict';

/*************************************************************/
// currently storing all the slides in each local storage file
// ex) a user has 5 diff slides
// local storage : 
//     presentationInfo(with presentation name & num of slides which will be 5)
//     slides1
//     slides2
//     slides3
//     slides4
//     slides5
/*************************************************************/

//save all info about presentation 
function save() {

    //clean up the previous local storage files
    deleteSlides_localStorage();

    let midColCenter = document.getElementById("midColCenter");
    let slideCnt = 0;
    //storing square figures
    let slides = midColCenter.childNodes;
    for (let i = 0; i < slides.length; i++) {
        if (slides[i].id === "slideMiddle") {
            let curSlide = getSlide(slides[i]);
            localStorage.setItem(`slide${slideCnt}`, JSON.stringify(curSlide));
            slideCnt++;
            // presentationInfo.push(curSlide);

        }
    }

    let presentationInfo = {
        "prName": "",
        "numOfSlides": ""
    };
    presentationInfo.prName = "awesomeSlide"
    presentationInfo.numOfSlides = slideCnt;
    localStorage.setItem('presentationInfo', JSON.stringify(presentationInfo));
}


//input : slide(based on html slide), output : all the slide info of input in json format
function getSlide(curSlide) {
    //currently childNodes are only squares
    let childNodes = curSlide.childNodes;

    let slideInfo = [];
    for (let i = 0; i < childNodes.length; i++) {
        if (childNodes[i].id === "square") {
            let curSquare = getSquares(childNodes[i], curSlide);
            slideInfo.push(curSquare);
        }
    }
    return slideInfo;
}

//input : square(based on html square), output : all the square info of input in json format
function getSquares(square, parentDiv) {
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
            "top": "",
            "zVal": ""
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

    };

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
    let figureZindex = figure.style.zIndex;

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
    figureInfo.position.zVal = figureZindex;

    figureInfo.text.content = figureText_content;
    figureInfo.text.fontSize = figureText_fontSize;
    figureInfo.text.fontcolor = figureText_color;
    figureInfo.text.textAlign = figureText_Align;

    figureInfo.image.src = figureImg_src;

    // slideInfo.push(figureInfo);
    return figureInfo;
}