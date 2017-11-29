
//arrow key, manipulate current slide, (up right >> next slide), (down left >> previous slide)

let KEY_RIGHTARROW = 39;
let KEY_LEFTARROW = 37;
let KEY_UPARROW = 38;
let KEY_DOWNARROW = 40;
let KEY_DELETE = 46;

function keyEvent(e) {

    let numOfSlides = getNumOfSlides();
    if (numOfSlides <= 0) {
        console.log("zero slide error");
    }

    e = e || window.event;

    if (e.keyCode === KEY_LEFTARROW || e.keyCode === KEY_DOWNARROW) {
        if (fullscreenIdx === 0) {
            //do nothing
        } else if (fullscreenIdx < 0) {
            console.log("fullscreenIdx error");
        } else {
            //show previous slide
            fullscreenIdx = fullscreenIdx - 1;
            hideAllSlides();
            makeVisible_NthSlide(fullscreenIdx);
            lastClicked_LeftSlide = getNthLeftSlide(fullscreenIdx);
            lastClicked_MiddleSlide = getNthMiddleSlide(fullscreenIdx);
            flag_focusingElem = "slide"
        }
        //showPreviousSlide_fullScreen
    }
    else if (e.keyCode === KEY_RIGHTARROW || e.keyCode === KEY_UPARROW) {

        if (fullscreenIdx >= 0 && fullscreenIdx < numOfSlides - 1) {
            //showNextSlide_fullScreen
            fullscreenIdx = fullscreenIdx + 1;
            hideAllSlides();
            makeVisible_NthSlide(fullscreenIdx);


            lastClicked_LeftSlide = getNthLeftSlide(fullscreenIdx);
            lastClicked_MiddleSlide = getNthMiddleSlide(fullscreenIdx);
            flag_focusingElem = "slide"
        } else {
            console.log("fullscreenIdx error");
        }
    }

    else if (e.keyCode === KEY_DELETE) {
        if (flag_focusingElem === "figure") {
            deleteSquare_html();
            flag_focusingElem = null;
        } else if (flag_focusingElem === "slide") {
            deleteSlide_html();
            flag_focusingElem = null;
        }
    }
    else {
        console.log("unregistered key event");
    }
}
