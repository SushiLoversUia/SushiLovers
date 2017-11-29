

function makeVisible_NthSlide(nth) {
    getNthMiddleSlide(nth).style.visibility = "visible";
}


//make presentation info structure >> store user info as well..?
function hideAllSlides() {
    let colMiddle = document.getElementById("midColCenter");
    let childNodes = colMiddle.childNodes;

    for (let i = 0; i < childNodes.length; i++) {
        if (childNodes[i].id === "slideMiddle") {
            // console.log(childNodes[i]);
            childNodes[i].style.visibility = "hidden";
        }
    }
}
//numOfLeftSlide === numOfRightSlide  
function getNumOfSlides() {

    let slideCnt = null;

    let midColLeft = document.getElementById("midColLeft");

    if (midColLeft === null) {
        slideCnt = "slideCnt error";
    } else {
        let leftSlides = midColLeft.childNodes;

        for (let i = 0; i < leftSlides.length; i++) {
            let leftSlide = leftSlides[i];
            if (leftSlide.id === 'leftSlide') {

                slideCnt++;
            }
        }
    }

    return slideCnt;
}

function getNthLeftSlide(nth) {
    let midColLeft = document.getElementById("midColLeft");
    let returnSlide = null;

    if (midColLeft === null) {
        returnSlide = "getNthLeftSlide error";

    } else {
        let leftSlides = midColLeft.childNodes;
        let slideCnt = 0;


        for (let i = 0; i < leftSlides.length; i++) {
            let leftSlide = leftSlides[i];
            if (leftSlide.id === 'leftSlide') {

                if (slideCnt === nth) {
                    returnSlide = leftSlide;
                    break;
                }
                slideCnt++;
            }
        }
    }

    return returnSlide;

}


function getNthMiddleSlide(nth) {
    let midColCenter = document.getElementById("midColCenter");
    if (midColCenter === null) {
        return "getNthMiddleSlide error";
    }
    let middleSlides = midColCenter.childNodes;

    let slideCnt = 0;

    let returnSlide = null;
    for (let i = 0; i < middleSlides.length; i++) {
        let middleSlide = middleSlides[i];
        if (middleSlide.id === 'slideMiddle') {

            if (slideCnt === nth) {
                returnSlide = middleSlide;
                break;
            }
            slideCnt++;
        }
    }

    return returnSlide;
}
