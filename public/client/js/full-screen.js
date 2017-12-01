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


let midColCenter = null;

//keep the original size information (editable mode)
let slideMiddle = null;
let slideMiddleWidth_ori = null;
let slideMiddleHeight_ori = null;
let slideMiddleLeft_ori = null;
let slideMiddleTop_ori = null;

let slidesSqsInfo = [];

let fullscreenIdx = null;

//presentation mode button, full-screen.js
let btnPresentation = document.getElementById('btnPresentation');
btnPresentation.addEventListener('click', presentationMode);


document.addEventListener('DOMContentLoaded', function () {
    let bodyWidth = document.body.offsetWidth;
    let bodyHeight = document.body.offsetHeight;

    slideMiddle = document.getElementById("slideMiddle");
    slideMiddleWidth_ori = "70%";
    slideMiddleHeight_ori = "70%";
    slideMiddleLeft_ori = (slideMiddle.offsetLeft / bodyWidth) * 100 + "%";
    slideMiddleTop_ori = (slideMiddle.offsetTop / bodyHeight) * 100 + "%";
}, false);

function presentationMode() {
    let slide = getNthMiddleSlide(0);
    midColCenter = document.getElementById("midColCenter");

    // check if user allows full screen of elements. This can be enabled or disabled in browser config. By default its enabled.

    //its also used to check if browser supports full screen api.
    if ("fullscreenEnabled" in document || "webkitFullscreenEnabled" in document ||
        "mozFullScreenEnabled" in document || "msFullscreenEnabled" in document) {


        if (document.fullscreenEnabled || document.webkitFullscreenEnabled ||
            document.mozFullScreenEnabled || document.msFullscreenEnabled) {

            //make all slides fit into bigger size(presentation size)
            if ("requestFullscreen" in slide) {
                allSquares_zoomIn();
                allSlide_zoomIn();
                hideAllSlides();
                makeVisible_NthSlide(0);
                slide.requestFullscreen();
            }
            else if ("webkitRequestFullscreen" in slide) {
                allSquares_zoomIn();
                allSlide_zoomIn();
                hideAllSlides();
                makeVisible_NthSlide(0);
                midColCenter.webkitRequestFullscreen();

            }
            else if ("mozRequestFullScreen" in slide) {
                allSquares_zoomIn();
                allSlide_zoomIn();
                hideAllSlides();
                makeVisible_NthSlide(0);
                slide.mozRequestFullScreen();
            }
            else if ("msRequestFullscreen" in slide) {
                allSquares_zoomIn();
                allSlide_zoomIn();
                hideAllSlides();
                makeVisible_NthSlide(0);
                slide.msRequestFullscreen();

            }
        }
    }
    else {
        console.log("User doesn't allow full screen");
    }

}



//user enter presentation mode >> make all zoomIn
function allSlide_zoomIn() {

    let midSlides = getAllMiddleSlide();

    for (let i = 0; i < midSlides.length; i++) {
        if (midSlides[i].id === "slideMiddle") {
            slide_zoomIn(midSlides[i]);

        }
    }
}

function allSquares_zoomIn() {

    let midSlides = getAllMiddleSlide();
    for (let i = 0; i < midSlides.length; i++) {
        if (midSlides[i].id === "slideMiddle") {
            //just replace value to percentage and do nothing else.
            slideSquares_posValReplace(midSlides[i]);
        }
    }
}

function slideSquares_posValReplace(inputSlide) {

    let curSlide = inputSlide;
    let curSlideIdx = getCurSlideIdx(curSlide);

    let curSquares = getSlideSquares(curSlide);

    for (let i = 0; i < curSquares.length; i++) {
        let curSquare = curSquares[i];

        let slideMiddleOffsetWidth = slideMiddle.offsetWidth;
        let slideMiddleOffsetHeight = slideMiddle.offsetHeight;

        let squareLeft = (curSquare.offsetLeft / slideMiddleOffsetWidth) * 100 + "%";
        let squareTop = (curSquare.offsetTop / slideMiddleOffsetHeight) * 100 + "%";
        let squareWidth = (curSquare.offsetWidth / slideMiddleOffsetWidth) * 100 + "%";
        let squareHeight = (curSquare.offsetHeight / slideMiddleOffsetHeight) * 100 + "%";

        let squareZidx = curSquare.style.zIndex;

        curSquare.style.left = squareLeft;
        curSquare.style.top = squareTop;
        curSquare.style.width = squareWidth;
        curSquare.style.height = squareHeight;

        curSquare.style.zIndex = squareZidx;
    }
}



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
    input.style.width = "100%";
    input.style.height = "100%";
    input.style.top = "0%";
    input.style.left = "0%";
}

function slide_zoomOut(inputSlide) {
    inputSlide.style.width = slideMiddleWidth_ori;
    inputSlide.style.height = slideMiddleHeight_ori;
    inputSlide.style.left = slideMiddleLeft_ori;
    inputSlide.style.top = slideMiddleTop_ori;
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
