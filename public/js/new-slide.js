'use strict';



function makeNewSlide() {

    //making left slide, and put it in the leftSlide(parentDiv)
    let parentDiv_midColLeft = document.getElementById("midColLeft");
    let leftSlide = document.createElement("li");
    leftSlide.setAttribute("id", "leftSlide");

    let previousSlideNum = getNumOfSlides();
    let newSlideNum = previousSlideNum + 1;
    leftSlide.innerHTML = `${newSlideNum}`;
    parentDiv_midColLeft.appendChild(leftSlide);
    leftSlide.onclick = showOnMiddle;

    //should hide all the slides before making new slides

    //making center(middle) slide, and put it in the center slide(parentDiv)
    let parentDiv_midColCenter = document.getElementById("midColCenter");
    let middleSlide = document.createElement("div");
    middleSlide.setAttribute("id", "slideMiddle");

    if (currentTheme != null) {
        middleSlide.style.backgroundImage = `url(${currentTheme})`;
    }

    parentDiv_midColCenter.appendChild(middleSlide);
    // console.log(middleSlide);

    lastClicked_LeftSlide = leftSlide;
    lastClicked_MiddleSlide = middleSlide;
    flag_focusingElem = "slide";

    hideAllSlides();
    makeVisible_NthSlide(newSlideNum - 1); //should put idx number

    //below is working on totally different condition, put inside of this function just because they have to share elements (left slide, middle slide connection)
    //should hide all the other slides first,
    function showOnMiddle() {

        //always have to keep the last clicekd slide >> show it to user.
        lastClicked_LeftSlide = leftSlide;
        lastClicked_MiddleSlide = middleSlide;
        flag_focusingElem = "slide";

        // make invisible all the slides
        hideAllSlides();
        middleSlide.style.visibility = "visible";

    }

}

function defaultNewSlide() {
    makeNewSlide();
    slideDefault();
}
