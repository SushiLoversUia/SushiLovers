'use strict';


// https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
// there is code for reading only one image as well.
//to put image data inside of figure(currently only square)
//currently we could choose mutliple pictures, but no big problem
function previewFiles() {
    let files = document.querySelector('input[type=file]').files;

    function readAndPreview(file) {
        // Make sure `file.name` matches our extensions criteria
        if (/\.(jpe?g|png|gif)$/i.test(file.name)) {

            let reader = new FileReader();
            reader.addEventListener("load", function () {
                let image = new Image();
                image.title = file.name;
                image.src = this.result;

                //put the image user just clicked inside of last clicked squares
                lastClickedElem.style.backgroundImage = `url(${image.src})`;
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