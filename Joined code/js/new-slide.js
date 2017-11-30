'use strict';


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
function makeNewSlide() {

    //making left slide, and put it in the leftSlide(parentDiv)
    let parentDiv_midColLeft = document.getElementById("midColLeft");
    let leftSlide = document.createElement("div");
    leftSlide.setAttribute("id", "leftSlide");
    slideCnt++;
    leftSlide.innerHTML = `${slideCnt}`;
    parentDiv_midColLeft.appendChild(leftSlide);
    leftSlide.onclick = showOnMiddle_save;

    //should hide all the slides before making new slides
    hideAllSlides();

    //making center(middle) slide, and put it in the center slide(parentDiv)
    let parentDiv_midColCenter = document.getElementById("midColCenter");
    let middleSlide = document.createElement("div");
    middleSlide.setAttribute("id", "slideMiddle");
    parentDiv_midColCenter.appendChild(middleSlide);
    // console.log(middleSlide);

    lastClicked_LeftSlide = leftSlide;
    lastClicked_MiddleSlide = middleSlide;

    //below is working on totally different condition, put inside of this function just because they have to share elements (left slide, middle slide connection)
    //should hide all the other slides first,
    function showOnMiddle_save() {

        //always have to keep the last clicekd slide >> show it to user.
        lastClicked_LeftSlide = leftSlide;
        lastClicked_MiddleSlide = middleSlide;
        // make invisible all the slides
        hideAllSlides();

        // console.log("here is showOnMiddle function working");
        // console.log(lastClicked_LeftSlide);
        // console.log(lastClicked_MiddleSlide);
        middleSlide.style.visibility = "visible";
        // make visible only one slide, user clicked last time

    }

}
