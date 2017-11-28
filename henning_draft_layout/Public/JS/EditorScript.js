

    let editor= document.getElementById('whiteBoard');
    let textBox;
    let resizeHandle
    let text;
    let slideInfo = [];
    //editor.designMode = "on";

//Create new textbox
    newText.addEventListener("click", function(event){

      textBox = document.createElement("div");
      textBox.style.backgroundColor="rgba(#ffffff, 0)"
      textBox.style.width= "300px";
      textBox.style.height= "70px";
      textBox.style.border= "2px solid #d3d3d3";
      textBox.id= "textBox";
      textBox.style.position = "absolute";
      textBox.style.whiteSpace= "pre-line";
      textBox.style.display="flex";
      textBox.style.left = "1px";
      textBox.style.top = "1px"
      editor.appendChild(textBox);

////////////////////////////////////////////////
      text = document.createElement("p");
      text.setAttribute("id", "text");
      text.contentEditable = "true";
      text.innerHTML = 'Enter text';
      text.style.width = "100%";
      text.style.height = "100%";
      text.style.margin = "0";
      textBox.appendChild(text);

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
      textBox.appendChild(resizeHandle);



      editElement(textBox);
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


    textBox.addEventListener("mousedown", translate);
    textBox.addEventListener("mouseup", release);

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


function save() {
    console.log("you just clicked save button!");

    let parentDiv = editor
    let childNodes = parentDiv.childNodes;
    //storing square figures
    for (let i = 0; i < childNodes.length; i++) {
        if (childNodes[i].id === "textBox") {
            saveSquares(childNodes[i], parentDiv);
        }
    }
    console.log(slideInfo);
    localStorage.setItem('storage_figures', JSON.stringify(slideInfo));
}


function saveSquares(square, parentDiv) {

  console.log("saveSquare")
    let parentDivHeight = parentDiv.offsetHeight;
    let parentDivWidth = parentDiv.offsetWidth;

    //square figure information
    //currently store binary data of image in this obj.
    let figureInfo = {
        "type": "",
        "size": {
            "width": "",
            "height": ""
        },
        "position": {
            "left": "",
            "top": ""
        },
        "text": {
            "content": "",
            "fontSize": "",
            "fontcolor": "",
            "textAlign": ""
        },
        "image": {
            "src": ""
        }

    }


let figure = textBox;



    /*********************************************************** */
    /* get information to put them in infoStructure ************ */
    /*********************************************************** */
    //figure size info
    let figureHeight = figure.offsetHeight / parentDivHeight * 100 + "%";
    let figureWidth = figure.offsetWidth  / parentDivWidth * 100 + "%";

    //figure position info
    let figureLeft = figure.offsetLeft / parentDivWidth * 100 + "%";
    let figureTop = figure.offsetTop / parentDivHeight * 100 + "%";

    //figure text info
    let figureText = figure.querySelector("#text");
    let figureText_content = figureText.innerHTML;

    //figure text css
    let figureText_fontSize = figure.style.fontSize;
    let figureText_color = figure.style.color;
    let figureText_Align = figure.style.textAlign;

    //figure backgroud image
    let figureImg_src = figure.style.backgroundImage;



    /*********************************************************** */
    /**** put info just got above in the structure ************ */
    /*********************************************************** */
    figureInfo.type = "textBox";
    figureInfo.size.height = figureHeight;
    figureInfo.size.width = figureWidth;

    figureInfo.position.top = figureTop;
    figureInfo.position.left = figureLeft;

    figureInfo.text.content = figureText_content;
    figureInfo.text.fontSize = figureText_fontSize;
    figureInfo.text.fontcolor = figureText_color;
    figureInfo.text.textAlign = figureText_Align;

    figureInfo.image.src = figureImg_src;


    //put all the info in slideInfo.
    slideInfo.push(figureInfo);
}

////////////////////////////////////////////////////////////

function open() {
    let parentDiv = document.getElementById('whiteBoard');
    let figures_string = localStorage.getItem("storage_figures");
    let figures_json = JSON.parse(figures_string);

    console.log(figures_json);

    //loop through all the data we just got
    for (let i = 0; i < figures_json.length; i++) {

        //case of square information >> call the recallSquares for opening speicifically squares
        if (figures_json[i].type == "textBox") {
            recallSquares(figures_json[i], parentDiv);

        }

        //other figures, should add later
        else {
        }
    }
}

//open function helper, same reason with saveSquares, to retrive squares we need specific function for open squares.
function recallSquares(squareInfo, parentDiv) {

  textBox = document.createElement("div");
  textBox.id= "textBox";
  textBox.style.backgroundColor="rgba(#ffffff, 0)"
  textBox.style.width= squareInfo.size.width;
  textBox.style.height= squareInfo.size.height;
  textBox.style.border= "2px solid #d3d3d3";


  textBox.style.position = "absolute";
  textBox.style.left = squareInfo.position.left;
  textBox.style.top = squareInfo.position.top;

  textBox.style.whiteSpace= "pre-line";
  textBox.style.display="flex";
  textBox.style.left =  squareInfo.position.left;
  textBox.style.top = squareInfo.position.top;
  editor.appendChild(textBox);

////////////////////////////////////////////////
  let text = document.createElement("p");
  text.setAttribute("id", "text");
  text.contentEditable = "true";
  text.innerHTML = squareInfo.text.content;
  text.style.width = "100%";
  text.style.height = "100%";
  text.style.margin = "0";
  textBox.appendChild(text);

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
  textBox.appendChild(resizeHandle);



  editElement(textBox);
//  addImage(myDiv)


}

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
