//delete all left, middle slides 
function deletePresentation_html() {
    console.log("clean up the previous pr")

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

//delete lastClicked_LeftSlide & lastClicked_MiddleSlide
function deleteSlide_html() {
    let deleLeftSlide = lastClicked_LeftSlide;
    let deleMiddleSlide = lastClicked_MiddleSlide;

    if (deleLeftSlide.parentNode && deleMiddleSlide.parentNode) {
        deleLeftSlide.parentNode.removeChild(deleLeftSlide);
        deleMiddleSlide.parentNode.removeChild(deleMiddleSlide);
    }
}



function resetFlags() {
    lastClickedElem = null;
    squareCnt = 0;
    lastClicked_LeftSlide = null;
    lastClicked_MiddleSlide = null;
    flag_focusingElem = null;
    slideCnt = 0;
}

