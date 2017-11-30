'use strict';


//to put image data inside of figure(currently only square)
function putImageFiles() {
    let files = document.querySelector('input[type=file]').files;

    function readAndPreview(file) {
        // Make sure `file.name` matches our extensions criteria
        if (/\.(jpe?g|png|gif)$/i.test(file.name)) {

            let reader = new FileReader();
            reader.addEventListener("load", function () {
                let image = new Image();
                image.title = file.name;
                image.src = this.result;

                let newSquare = makeNewSquare();
                //put the image user just clicked inside of last clicked squares
                newSquare.style.backgroundImage = `url(${image.src})`;
                flag_focusingElem = "figure";

            }, false);
            reader.readAsDataURL(file);
        }
    }
    //don't need it now, case of user clicked several images
    if (files) {
        [].forEach.call(files, readAndPreview);
    }
}