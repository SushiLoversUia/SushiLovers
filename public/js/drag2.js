let active = false;
let active2 = true;

let curX;
let curY;
let divPosX;
let divPosY;


function dragElement(elmnt, parentDiv){

  let handle = document.getElementById('handleResize');

  //var rect = element.getBoundingClientRect();
  elmnt.addEventListener("mousedown", translate);
  elmnt.addEventListener("mouseup", release);

  handle.addEventListener("mousedown", resize);

  console.log(handle);


 function translate(e) {

    lastClickedElem = elmnt;

    active = true;

    curX=e.clientX;
    curY=e.clientY;

    divPosX=lastClickedElem.getBoundingClientRect().x //parseInt(lastClickedElem.style.left)
    divPosY=lastClickedElem.getBoundingClientRect().y //parseInt(lastClickedElem.style.top)


        }

parentDiv.addEventListener("mousemove", mouseMove);

function mouseMove(e) {

  if(active && active2){

    lastClickedElem.style.left= divPosX+ e.clientX-curX+"px";
    lastClickedElem.style.top=  divPosY+ e.clientY-curY +"px";
}


else if(active && !active2){


  lastClickedElem.style.width= divSizeX+ e.clientX-curX +"px";
  lastClickedElem.style.height= divSizeY+  e.clientY-curY +"px";
}


}
function release(e) {
    
      active = false;
      active2= true;
}


function resize(e) {

console.log("resize")

active2 = false;

lastClickedElem = elmnt;

curX=e.clientX;
curY=e.clientY;

divSizeX= lastClickedElem.clientWidth;
divSizeY= lastClickedElem.clientHeight;

}

}
