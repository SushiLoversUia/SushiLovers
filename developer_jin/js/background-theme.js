'use strict';

function addPresentationTheme() {


    // let files = document.querySelector('input[type=file]').files;

    // let files = document.getElementById("btnBackgroundTheme").files;
    let files = document.querySelector('input[type=file]').files;
    
    
    function readAndPreview(file) {
        // Make sure `file.name` matches our extensions criteria
        if (/\.(jpe?g|png|gif)$/i.test(file.name)) {

            let reader = new FileReader();
            reader.addEventListener("load", function () {
                let image = new Image();
                image.title = file.name;
                image.src = this.result;

                // let slidesMiddle = getAllMiddleSlide();
                // for (let i = 0; i < slidesMiddle.length; i++) {
                //     slidesMiddle[i].style.backgroundImage = `url(${image.src})`;
                // }


                // let midColCenter = document.getElementById("midColCenter");
                // if (midColCenter === null) {
                //     return "getNthMiddleSlide error";
                // }
                // let middleSlides = midColCenter.childNodes;
                // for (let i = 0; i < middleSlides.length; i++) {
                //     let middleSlide = middleSlides[i];
                //     if (middleSlide.id === 'slideMiddle') {
                //         middleSlide.style.backgroundImage = `url(${image.src})`;
                //     }
                // }



            }, false);
            reader.readAsDataURL(file);
        }
    }
    //don't need it now, case of user clicked several images
    if (files) {
        [].forEach.call(files, readAndPreview);
    }


}