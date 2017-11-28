'use strict';


//open resotred data, currently using localStorage 
function recall() {
    let retrivedPr_string = localStorage.getItem("presentationInfo");
    let retrivedPr_json = JSON.parse(retrivedPr_string);
    // console.log(retrivedPr_string);
    // console.log(retrivedPr_json);

    let midColCenter = document.getElementById("midColCenter");
    let midColLeft = document.getElementById("midColLeft");
    slideCnt = 0;


    //making whole presentation again based on retired presentation data
    for (let i = 0; i < retrivedPr_json.length; i++) {

        //making middle slide
        let slideInfo = retrivedPr_json[i];
        let newSlideMiddle = recallSlide(slideInfo);
        midColCenter.appendChild(newSlideMiddle);

        //making left slide
        let leftSlide = document.createElement("div");
        leftSlide.setAttribute("id", "leftSlide");
        slideCnt++;
        leftSlide.innerHTML = `${slideCnt}`;
        midColLeft.appendChild(leftSlide);
        leftSlide.onclick = showOnMiddle_recall;

        //should hide all the slides before making new slides
        hideAllSlides();

        lastClicked_LeftSlide = leftSlide;
        lastClicked_MiddleSlide = newSlideMiddle;

        function showOnMiddle_recall() {
            //always have to keep the last clicekd slide >> show it to user.
            lastClicked_LeftSlide = leftSlide;
            lastClicked_MiddleSlide = newSlideMiddle;
            // make invisible all the slides
            hideAllSlides();

            // console.log("here is showOnMiddle function working");
            // console.log(lastClicked_LeftSlide);
            // console.log(lastClicked_MiddleSlide);
            newSlideMiddle.style.visibility = "visible";
            // make visible only one slide, user clicked last time

        }

    }

    makeDragaable();
}

function makeDragaable() {
    let midColCenter = document.getElementById("midColCenter");
    let slides = midColCenter.childNodes;
    for (let j = 0; j < slides.length; j++) {

        if (slides[j].id === "slideMiddle") {
            let curSlide = slides[j];
            let curSlide_childNodes = curSlide.childNodes;

            for (let i = 0; i < curSlide_childNodes.length; i++) {

                if (curSlide_childNodes[i].id === "square") {
                    let curSquare = curSlide_childNodes[i];
                    dragElement(curSquare, curSlide);
                }
            }
        }
    }

}

//make new slide with retrived data and return that slide
function recallSlide(slideInfo) {
    // let figures_string = localStorage.getItem("storage_figures");
    // let figures_json = JSON.parse(figures_string);
    // console.log(parentDiv);
    // console.log(figures_json);
    let newSlide = document.createElement("div");
    newSlide.setAttribute("id", "slideMiddle");

    for (let i = 0; i < slideInfo.length; i++) {
        if (slideInfo[i].type == "square") {
            let curSquare = recallSquare(slideInfo[i]);
            newSlide.appendChild(curSquare);
            // dragElement(curSquare, newSlide);
        }
        //other figures, should add later
        else { }
    }

    return newSlide;
}

//open function helper, same reason with saveSquares, to retrive squares we need specific function for open squares.
function recallSquare(squareInfo) {


    //making new div >> it will be square figure at the end
    let square = document.createElement("div");
    square.setAttribute("id", `square`);

    /*********************************************************** */
    /**** put the square information we just retrived ************ */
    /*********************************************************** */

    //size info
    square.style.width = squareInfo.size.width;
    square.style.height = squareInfo.size.height;

    //position info
    square.style.left = squareInfo.position.left;
    square.style.top = squareInfo.position.top;

    //text css
    square.style.fontSize = squareInfo.text.fontSize;
    square.style.color = squareInfo.text.fontcolor;
    square.style.textAlign = squareInfo.text.textAlign;

    //square background
    square.style.backgroundImage = squareInfo.image.src;

    //making handle for resizing and put it inside of square div we are making now
    let resizeHandle_square = document.createElement("div")
    resizeHandle_square.setAttribute("id", "handleResize");
    square.appendChild(resizeHandle_square);

    //making text element <p> and put it inside of div
    let textP = document.createElement("p");
    textP.setAttribute("id", "text");
    textP.contentEditable = "true";
    //put the original text info     
    textP.innerHTML = squareInfo.text.content;
    square.appendChild(textP);

    //put the square we have made so far inside of parentDiv(id : slideMiddle)

    //add functionality(dragable, resizable) to the square we just made

    return square;
}

