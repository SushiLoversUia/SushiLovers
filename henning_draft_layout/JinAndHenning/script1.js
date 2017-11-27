

    var editor= myFrame.document;
    var myDiv;
    let resizeHandle
    var text;
    //editor.designMode = "on";

    newText.addEventListener("click", function(event){

      myDiv = document.createElement("div");
      myDiv.style.backgroundColor="#a8a9b8"
      myDiv.style.width= "300px";
      myDiv.style.height= "70px";
      myDiv.style.border= "2px solid #d3d3d3";
      myDiv.id= "myDiv";
      myDiv.style.position = "absolute";
      myDiv.style.whiteSpace= "pre-line";
      myDiv.style.display="flex";
      myDiv.style.left = "1px";
      myDiv.style.top = "1px"
      editor.body.appendChild(myDiv);

////////////////////////////////////////////////
      text = document.createElement("p");
      text.setAttribute("id", "text");
      text.contentEditable = "true";
      text.innerHTML = 'Enter text';
      text.style.width = "100%";
      text.style.height = "100%";
      text.style.margin = "0";
      myDiv.appendChild(text);

////////////////////////////////////////////////

      resizeHandle = document.createElement("div")
      resizeHandle.style.backgroundColor= "#f1f1f1"
      resizeHandle.style.width= "8px";
      resizeHandle.style.height= "8px";
      resizeHandle.style.cursor= "nwse-resize";
      resizeHandle.style.position= "absolute";
      resizeHandle.style.right= "0";
      resizeHandle.style.bottom= "0";

      resizeHandle.setAttribute("id", "handleResize");
      myDiv.appendChild(resizeHandle);



      editElement(myDiv);
    //  addImage(myDiv)

    })

///////////////////////////////////////////////////////////

let active = false;
let active2 = true;

let curX;
let curY;
let divPosX;
let divPosY;
let lastClickedElem

  function editElement(elmnt){


    myDiv.addEventListener("mousedown", translate);
    myDiv.addEventListener("mouseup", release);

    resizeHandle.addEventListener("mousedown", resize);


   function translate(e) {

      lastClickedElem = elmnt;

      active = true;

      curX=e.clientX;
      curY=e.clientY;

      divPosX= parseInt(lastClickedElem.style.left)
      divPosY=parseInt(lastClickedElem.style.top)
      console.log()
          }

  editor.addEventListener("mousemove", mouseMove);

  function mouseMove(e) {

    if(active && active2){

      lastClickedElem.style.left= divPosX+ e.clientX-curX +"px";
      lastClickedElem.style.top=  divPosY+  e.clientY-curY +"px";
  }

  else if(active && !active2){

    lastClickedElem.style.width= divSizeX+ e.clientX-curX +"px";
    lastClickedElem.style.height=  divSizeY+  e.clientY-curY +"px";
  }


}
  function release(e) {
      console.log("yo")
        active = false;
        active2= true;
  }


  function resize(e) {

  console.log("resize")

  active2 = false;

  lastClickedElem = elmnt;

  curX=e.clientX;
  curY=e.clientY;

  divSizeX= parseInt(lastClickedElem.style.width)
  divSizeY=parseInt(lastClickedElem.style.height)


  }

}

function addImage(){

   let myImage = document.getElementById('addImg').files[0];
   var reader = new FileReader();
   reader.addEventListener("load", function(){
         let image = new Image();

        image.title = myImage.name;
        image.src = this.result;
        lastClickedElem.style.backgroundImage = `url(${image.src})`;
   })
   if(myImage){
      reader.readAsDataURL(myImage);
    }
    else{
    }
}




////////////////////////////////////////////////////////////




/*

    /function previewFiles(elemt) {

        lastClickedElem = elemt;
        let files = document.querySelector('input[type=file]').files;

        function readAndPreview(file) {
            // Make sure `file.name` matches our extensions criteria
            if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
                var reader = new FilesReader();
                // let square = elmnt;
                reader.addEventListener("load", function () {
                    var image = new Image();
                    // image.height = 100;
                    image.title = file.name;
                    image.src = this.result;
                    console.log(lastClickedElem);
                    lastClickedElem.style.backgroundImage = `url(${image.src})`;
                }, false);
                reader.readAsDataURL(file);
            }
        }
        if (files) {
            [].forEach.call(files, readAndPreview);

        }
    }*/
