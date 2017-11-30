'use strict';

//called when an event goes full screen and vice-versa.
document.addEventListener("fullscreenchange", screen_change);
document.addEventListener("webkitfullscreenchange", screen_change);
document.addEventListener("mozfullscreenchange", screen_change);
document.addEventListener("MSFullscreenChange", screen_change);

//called when requestFullscreen(); fails. it may fail if iframe don't have allowfullscreen attribute enabled or for something else.
document.addEventListener("fullscreenerror", function () { console.log("Full screen failed"); });
document.addEventListener("webkitfullscreenerror", function () { console.log("Full screen failed"); });
document.addEventListener("mozfullscreenerror", function () { console.log("Full screen failed"); });
document.addEventListener("MSFullscreenError", function () { console.log("Full screen failed"); });


//keep the original size information (editable mode)
let slideMiddle = null;
let slideMiddleWidth_ori = null;
let slideMiddleHeight_ori = null;
let slideMiddleLeft_ori = null;
let slideMiddleTop_ori = null;

let fullscreenIdx = 0;

let slidesSqsInfo = [];


function presentationMode() {
    let slide = getNthMiddleSlide(0);

    //need to fill this info to use it for zoom out function
    let slideMiddle = document.getElementById("slideMiddle");
    slideMiddleWidth_ori = slideMiddle.offsetWidth;
    slideMiddleHeight_ori = slideMiddle.offsetHeight;
    slideMiddleLeft_ori = slideMiddle.offsetLeft;
    slideMiddleTop_ori = slideMiddle.offsetTop;

    // check if user allows full screen of elements. This can be enabled or disabled in browser config. By default its enabled.

    //its also used to check if browser supports full screen api.
    if ("fullscreenEnabled" in document || "webkitFullscreenEnabled" in document ||
        "mozFullScreenEnabled" in document || "msFullscreenEnabled" in document) {


        if (document.fullscreenEnabled || document.webkitFullscreenEnabled ||
            document.mozFullScreenEnabled || document.msFullscreenEnabled) {

            //make all slides fit into bigger size(presentation size)

            if ("requestFullscreen" in slide) {
                saveSquaresRelativePos();
                hideAllSlides();
                makeVisible_NthSlide(0);
                slide.requestFullscreen();
                allSlide_zoomIn();
            }
            else if ("webkitRequestFullscreen" in slide) {
                saveSquaresRelativePos();
                hideAllSlides();
                makeVisible_NthSlide(0);
                midColCenter.webkitRequestFullscreen();
                allSlide_zoomIn();
            }
            else if ("mozRequestFullScreen" in slide) {
                saveSquaresRelativePos();
                hideAllSlides();
                makeVisible_NthSlide(0);
                slide.mozRequestFullScreen();
                allSlide_zoomIn();
                
            }
            else if ("msRequestFullscreen" in slide) {
                saveSquaresRelativePos();
                hideAllSlides();
                makeVisible_NthSlide(0);
                slide.msRequestFullscreen();
                allSlide_zoomIn();
                
            }
        }
    }
    else {
        console.log("User doesn't allow full screen");
    }

}

////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////



//should reposition all the squares inside of slides
function saveSquaresRelativePos() {

    //clean up info before saving
    slidesSqsInfo = [];

    let colMiddle = document.getElementById("midColCenter");
    let childNodes = colMiddle.childNodes;

    for (let i = 0; i < childNodes.length; i++) {
        let curSlide = childNodes[i];
        if (curSlide.id === "slideMiddle") {
            let slideSqsInfo = getSlideSquaresInfo(curSlide);
            slidesSqsInfo.push(slideSqsInfo);
        }
    }

}

//user enter presentation mode >> make all zoomIn
function allSlide_zoomIn() {

    let midSlides = getAllMiddleSlide();

    for (let i = 0; i < midSlides.length; i++) {
        if (midSlides[i].id === "slideMiddle") {
            slide_zoomIn(midSlides[i]);
            slideSquares_zoomIn(midSlides[i], slidesSqsInfo[i]);

        }
    }
}
function slideSquares_zoomIn(inputSlide, inputSlideInfo) {

    let curSlide = inputSlide;
    let curSlideIdx = getCurSlideIdx(curSlide);

    let curSlideInfo = inputSlideInfo;
    let curSquares = getSlideSquares(curSlide);

    for (let i = 0; i < curSquares.length; i++) {
        let curSquare = curSquares[i];
        // console.log(curSlideInfo[i]);
        curSquare.style.left = curSlideInfo[i].left;
        curSquare.style.top = curSlideInfo[i].top;
        curSquare.style.zIndex = curSlideInfo[i].zIndex;
    }
}
function getSlideSquaresInfo(inputSlide) {
    let curSquares = getSlideSquares(inputSlide);

    let curSlideSquaresPosInfo = [];
    for (let i = 0; i < curSquares.length; i++) {
        let curSquare = curSquares[i];

        let squareOriPos = {
            "left": "",
            "top": "",
            "zIndex": ""
        }

        // let slideMiddleWidth_ori = null;
        // let slideMiddleHeight_ori = null;
        let squareLeft = (curSquare.offsetLeft / slideMiddleWidth_ori) * 100 + "%";
        let squareTop = (curSquare.offsetTop / slideMiddleHeight_ori) * 100 + "%";
        let squareZidx = curSquare.style.zIndex;

        squareOriPos.left = squareLeft;
        squareOriPos.top = squareTop;
        squareOriPos.zIndex = squareZidx;

        curSlideSquaresPosInfo.push(squareOriPos);
    }
    return curSlideSquaresPosInfo;
}


function repositionSquares_zoomOut() {

}
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////







//user exit presentation mode >> makeall zoomOut(make it back to original size)
function allSlide_zoomOut() {
    fullscreenIdx = 0;

    let colMiddle = document.getElementById("midColCenter");
    let childNodes = colMiddle.childNodes;

    for (let i = 0; i < childNodes.length; i++) {
        if (childNodes[i].id === "slideMiddle") {
            slide_zoomOut(childNodes[i]);
        }
    }
}
function slide_zoomIn(input) {
<<<<<<< HEAD:public/client/js/full-screen.js
    input.style.width = "100%";
    input.style.height = "100%";
=======

    input.style.width = "100vw";
    input.style.height = "100vh";
>>>>>>> cb42be409d4fd3399cc8cbeef138702c9693489f:developer_henning/Joined code/js/full-screen.js
    input.style.top = "0%";
    input.style.left = "0%";
}

function slide_zoomOut(inputSlide) {
    inputSlide.style.width = slideMiddleWidth_ori + "px";
    inputSlide.style.height = slideMiddleHeight_ori + "px";
    inputSlide.style.left = slideMiddleLeft_ori + "px";
    inputSlide.style.top = slideMiddleTop_ori + "px";



}

function screen_change() {
    let midColCenter = document.getElementById("midColCenter");
    //fullscreenElement is assigned to html element if any element is in full screen mode.
    if (document.fullscreenElement || document.webkitFullscreenElement ||
        document.mozFullScreenElement || document.msFullscreenElement) {
    }
    else {
        // exitFullscreen us used to exit full screen manually
        if ("exitFullscreen" in document) {
            allSlide_zoomOut();
            document.exitFullscreen();
        }
        else if ("webkitExitFullscreen" in document) {
            allSlide_zoomOut();
            document.webkitExitFullscreen();
        }
        else if ("mozCancelFullScreen" in document) {
            allSlide_zoomOut();
            document.mozCancelFullScreen();
        }
        else if ("msExitFullscreen" in document) {
            allSlide_zoomOut();
            document.msExitFullscreen();
        }
    }

}
