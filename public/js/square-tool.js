

//currently only working in square figure condtion, if we add more figures it has to be fixed.
function getMaxZ(inputSquare) {
    let curSlide = inputSquare.parentNode;

    let curSlideSquares = curSlide.childNodes;

    let maxZ = 0;
    for (let i = 0; i < curSlideSquares.length; i++) {
        let curSquare = curSlideSquares[i];
        if (curSquare.id === "square") {
            let curZ = curSquare.style.zIndex;
            if (curZ > maxZ) {
                maxZ = curZ;
            }
        }
    }
    return maxZ;
}

function getSlideSquares(curSlide) {

    let curSlide_childNodes = curSlide.childNodes;
    let rtvSquares = [];

    for (let i = 0; i < curSlide_childNodes.length; i++) {
        let curSquare = curSlide_childNodes[i];
        if (curSquare.id === 'square') {
            rtvSquares.push(curSquare);
        }
    }

    return rtvSquares;
}