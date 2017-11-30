'use strict';



let themeInput = document.getElementById('btnChangeTheme');
themeInput.addEventListener('change', changeBackgroundTheme);

function changeBackgroundTheme() {
    let files = document.getElementById("btnChangeTheme").files;

    function readAndPreview(file) {
        // Make sure `file.name` matches our extensions criteria
        if (/\.(jpe?g|png|gif)$/i.test(file.name)) {

            let reader = new FileReader();
            reader.addEventListener("load", function () {
                let image = new Image();
                image.title = file.name;
                image.src = this.result;

                //save current theme, new slide >> new theme will be applied
                currentTheme = `url(${image.src})`;

                let slidesMiddle = getAllMiddleSlide();
                for (let i = 0; i < slidesMiddle.length; i++) {
                    slidesMiddle[i].style.backgroundImage = `url(${image.src})`;

                }
            }, false);
            reader.readAsDataURL(file);
        }
    }
    //don't need it now, case of user clicked several images
    if (files) {
        [].forEach.call(files, readAndPreview);
    }
}


// //somehow, putImageFiles(add-image.js) has some bugs when try to use two inputs suppose this method is more secure and cleaner
// function changeBackgroundTheme() {
//     let curFiles = themeInput.files;
//     //case your didn't select anything
//     if (curFiles.length === 0) {

//     } else {
//         for (let i = 0; i < curFiles.length; i++) {
//             if (validFileType(curFiles[i])) {
//                 let image = document.createElement('img');
//                 image.src = window.URL.createObjectURL(curFiles[i]);

//                 //save current theme, new slide >> new theme will be applied
//                 currentTheme = `url(${image.src})`;

//                 let slidesMiddle = getAllMiddleSlide();
//                 for (let i = 0; i < slidesMiddle.length; i++) {
//                     slidesMiddle[i].style.backgroundImage = `url(${image.src})`;

//                 }
//             }
//         }
//     }
// }



// function validFileType(file) {
//     let fileTypes = [
//         'image/jpeg',
//         'image/pjpeg',
//         'image/png'
//     ]
//     for (var i = 0; i < fileTypes.length; i++) {
//         if (file.type === fileTypes[i]) {
//             return true;
//         }
//     }
//     return false;
// }
