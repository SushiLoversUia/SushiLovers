//delete all left, middle slides 
function deletePresentation_html() {
    let midColCenter = document.getElementById("midColCenter");
    let midColLeft = document.getElementById("midColLeft");

    let leftSlides = midColLeft.childNodes;
    let middleSlides = midColCenter.childNodes;

    for (let i = leftSlides.length - 1; i >= 0; i--) {
        let leftSlide = leftSlides[i];
        if (leftSlide.id === 'leftSlide') {
            midColLeft.removeChild(leftSlide);
        }
    }

    for (let i = middleSlides.length - 1; i >= 0; i--) {
        let middleSlide = middleSlides[i];
        if (middleSlide.id === 'slideMiddle') {
            midColCenter.removeChild(middleSlide);
        }
    }
    

    //clean up all the flags
    resetFlags();
}

//clean up the local storage slides info, currently used before saving new Pr
function deleteSlides_localStorage() {
    let slideCnt = 0;
    while (localStorage[`slide${slideCnt}`]) {
        localStorage.removeItem(`slide${slideCnt}`);
        slideCnt++;
    }
    return true;

}


//delete lastClickedElem
function deleteSquare_html() {
    let deleElem = lastClickedElem;
    if (deleElem.parentNode) {
        deleElem.parentNode.removeChild(deleElem);
    }
}

function deleteSlide_html() {

    let deleMiddleSlide = getVisibleSlide();

    let deleMiddleSlide_idx = getCurSlideIdx(deleMiddleSlide)

    let deleLeftSlide = getNthLeftSlide(deleMiddleSlide_idx);

    if (deleLeftSlide.parentNode && deleMiddleSlide.parentNode) {
        deleLeftSlide.parentNode.removeChild(deleLeftSlide);
        deleMiddleSlide.parentNode.removeChild(deleMiddleSlide);
    }

    //should show previous slide(if there is)
    let numOfSlides = getNumOfSlides();

    //case1 : deleted slide was first slide
    if (numOfSlides > 0) {
        hideAllSlides();
        if (deleMiddleSlide_idx === 0) {
            //show next slide of deleted slide
            makeVisible_NthSlide(0);
        } else if (deleMiddleSlide_idx > 0) {
            //if the deleted slide's idx was higher than 0 (1,2,...) than there must be next index cuz currently numOfSlides is also higher than 0
            makeVisible_NthSlide(deleMiddleSlide_idx - 1);
        }
    }

    resetLeftSlideNumbers();

}

function resetLeftSlideNumbers() {
    let numOfSlides = getNumOfSlides();
    let leftSlides = getAllLeftSlide();

    for (let i = 0; i < numOfSlides; i++) {
        let leftSlideNum = i + 1;
        leftSlides[i].innerHTML = `${leftSlideNum}`;
    }

}


function resetFlags() {
    lastClickedElem = null;
    squareCnt = 0;
    lastClicked_LeftSlide = null;
    lastClicked_MiddleSlide = null;
    flag_focusingElem = null;
}

function deleteCurSlide_theme() {

    let visibleSlide = getVisibleSlide();
    if (visibleSlide) {
        visibleSlide.style.backgroundImage = "";
    }
}

function deleteWholeSlide_theme() {
    let midSlides = getAllMiddleSlide();
    for (let i = 0; i < midSlides.length; i++) {
        let curSlide = midSlides[i];
        curSlide.style.backgroundImage = "";
    }
    currentTheme = "";
}