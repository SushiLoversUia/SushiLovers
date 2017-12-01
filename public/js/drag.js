'use strict';

//handle all the event, drag, resize ..
function dragElement(elmnt, parentDiv) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    //always move, drag base on parentDivs offsetLeft,Top
    let parentDivLeft = parseInt(parentDiv.offsetLeft);
    let parentDivTop = parseInt(parentDiv.offsetTop);

    let parentDivWidth = parseInt(parentDiv.offsetWidth);
    let parentDivHeight = parseInt(parentDiv.offsetHeight);

    var startX;
    var startY;



    //resize handler
    let handle = document.getElementById('handleResize');
    let handleResizeWidth = handle.clientWidth;
    let handleResizeHeight = handle.clientHeight;

    elmnt.onmousedown = mouseDown;

    //decision to drag or resize or rotate or write something
    function mouseDown(e) {

        startX =elmnt.clientWidth;
        startY =elmnt.clientHeight;


        let slideHighestZ = getMaxZ(elmnt);
        let newZindex = slideHighestZ + 1;
        elmnt.style.zIndex = newZindex;

        lastClickedElem = elmnt;

        //sync left and middle slide focus
        let parentSlide = elmnt.parentNode;
        lastClicked_MiddleSlide = parentSlide;
        let curSlideIdx = getCurSlideIdx(parentSlide);
        lastClicked_LeftSlide = getNthLeftSlide(curSlideIdx);

        flag_focusingElem = "figure";


        let eleLeft = parseInt(elmnt.offsetLeft);
        let eleTop = parseInt(elmnt.offsetTop);
        let elemLeft_screen = eleLeft + parentDivLeft;//element top posY from  whole screen
        let elemTop_screen = eleTop + parentDivTop;//element top posY from whole screen

        e = e || window.event;
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;

        let cursurPosX_inElem = Math.abs(e.clientX - elemLeft_screen); //relative posX in element
        let cursurPosY_inElem = Math.abs(e.clientY - elemTop_screen); //relative posY in element

        //currently only bottom right handle is applied, if true >> resize, false >> move element
        if (
            (cursurPosX_inElem > elmnt.offsetWidth - handleResizeWidth && cursurPosX_inElem < elmnt.offsetWidth) &&
            (cursurPosY_inElem > elmnt.offsetHeight - handleResizeHeight && cursurPosY_inElem < elmnt.offsetHeight)
        ) {

            //mouse release >> closeElementDrag_resize >> make all the mouseEvent val null
            document.onmouseup = closeElementDrag_resize;

            //mouse move >> begin resizing
            document.onmousemove = elementDrag_resize;
        } else {

            //mouse release >> closeElementDrag_move >> make all the mouseEvent val null
            document.onmouseup = closeElementDrag_move;

            //mouse move >> begin dragging element
            document.onmousemove = elementDrag_move;
        }

    
    }

    //resize element funtion
    function elementDrag_resize(e) {
        e = e || window.event;
        // calculate the new cursor position:
        //pos1, pos2 are new cursor position diff



        //have to make pos3,pos4 as startup pos
        elmnt.style.width = (startX + e.clientX )-pos3 + 'px';
        elmnt.style.height = (startY + e.clientY)- pos4 + 'px';


    }


    function closeElementDrag_resize(e) {
        document.onmouseup = null;
        document.onmousemove = null;
    }

    //drag element function
    function elementDrag_move(e) {
        e = e || window.event;
        // calculate the new cursor position:
        //pos1, pos2 are new cursor position diff
        pos1 = e.clientX - pos3;
        pos2 = e.clientY - pos4;

        //have to make pos3,pos4 as startup pos
        pos3 = e.clientX;
        pos4 = e.clientY;

        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop + pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft + pos1) + "px";
    }

    function closeElementDrag_move() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
