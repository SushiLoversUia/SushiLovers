function cleanupCurrentPr() {
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

