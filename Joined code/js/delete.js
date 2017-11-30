

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


function deleteSquare_html() {
    
}

function deleteSlide_html() {

}

