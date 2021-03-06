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
    let slides = getAllMiddleSlide();
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
        "numOfSlides": "",
        "idp": ""
    };
    presentationInfo.prName = document.getElementById("presName").value;
    presentationInfo.numOfSlides = slideCnt;
    presentationInfo.idp = JSON.parse(localStorage.getItem('presentationInfo')).idp;
    localStorage.setItem('presentationInfo', JSON.stringify(presentationInfo));
    savePresDb();
}

//input : slide(based on html slide), output : all the slide info of input in json format
function getSlide(curSlide) {
    //currently childNodes are only squares
    let childNodes = curSlide.childNodes;

    let slideInfo = {
        "slideTheme": "",
        "slideFigureInfo": ""
    };
    slideInfo.slideTheme = curSlide.style.backgroundImage;

    let slideFigureInfo_temp = [];
    for (let i = 0; i < childNodes.length; i++) {
        if (childNodes[i].id === "square") {

            let curSquare = getSquares(childNodes[i], curSlide);

            slideFigureInfo_temp.push(curSquare);
        }
    }
    // console.log(slideFigureInfo_temp);
    slideInfo.slideFigureInfo = JSON.stringify(slideFigureInfo_temp);
    console.log(slideInfo);

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
            "src": "",
            "backgroundColor": ""
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
    let figureImg_backgroundColor = figure.style.backgroundColor;
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
    figureInfo.image.backgroundColor = figureImg_backgroundColor;

    // slideInfo.push(figureInfo);
    return figureInfo;
}

//savePresDb : function to save the presentation in the database
function savePresDb() {
    var token = JSON.parse(localStorage.getItem('logindata')).token;
    var url = "https://app-presentation-sushi-lovers.herokuapp.com/api/presentations/?token=" + token;
    var upload = JSON.stringify({
        idp: JSON.parse(localStorage.getItem('presentationInfo')).idp,
        namepres: JSON.parse(localStorage.getItem('presentationInfo')).prName,
        nbSlides: JSON.parse(localStorage.getItem('presentationInfo')).numOfSlides
    });

    var cfg = {
        method: "PUT",
        body: upload
    };

    superfetch(url, "json", succSavePres, errorSavePres, cfg);
}
//Success saving presentation into database
function succSavePres(data) {
    console.log(data);
    delSlidesDb();
}
//Error saving presentation into database
function errorSavePres(err) {
    console.log(err);
}
//delSlidesDb : function to delete all the slides in the database
function delSlidesDb() {
    var token = JSON.parse(localStorage.getItem('logindata')).token;
    var idp = JSON.parse(localStorage.getItem('presentationInfo')).idp;
    var url = "https://app-presentation-sushi-lovers.herokuapp.com/api/slides/?token=" + token + "&idp=" + idp;
    var cfg = { method: "DELETE" };

    superfetch(url, "json", succDelSlides, errorDelSlides, cfg);
}
//Success deleting slides
function succDelSlides(data) {
    console.log(data);
    var i = 0;
    for (i = 0; i < JSON.parse(localStorage.getItem('presentationInfo')).numOfSlides; i++)
        saveSlidesDb(i);
}
//Error deleting slides
function errorDelSlides(err) {
    console.log(err);
}
//saveSlidesDb : function to save all slides in the database
function saveSlidesDb(num) {
    var token = JSON.parse(localStorage.getItem('logindata')).token;
    var url = "https://app-presentation-sushi-lovers.herokuapp.com/api/slides/?token=" + token;
    var upload = JSON.stringify({
        content: localStorage.getItem('slide' + num),
        idp: JSON.parse(localStorage.getItem('presentationInfo')).idp
    });

    var cfg = {
        method: "POST",
        body: upload
    };

    superfetch(url, "json", succSaveSlides, errorSaveSlides, cfg);
}
//Success saving slides into database
function succSaveSlides(data) {
    console.log(data);
}
//Error saving slides into database
function errorSaveSlides(err) {
    console.log(err);
}
