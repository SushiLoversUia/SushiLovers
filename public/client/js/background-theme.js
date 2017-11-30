'use strict';




//somehow, putImageFiles(add-image.js) has some bugs when try to use two inputs suppose this method is more secure and cleaner
function changeBackgroundTheme() {
    let curFiles = themeInput.files;
    //case your didn't select anything
    if (curFiles.length === 0) {
        let para = document.createElement('p');
        para.textContent = 'No files currently selected for upload';
        preview.appendChild(para);
    } else {
        for (let i = 0; i < curFiles.length; i++) {
            if (validFileType(curFiles[i])) {
                let image = document.createElement('img');
                image.src = window.URL.createObjectURL(curFiles[i]);

                //save current theme, new slide >> new theme will be applied
                currentTheme = image.src;
                let slidesMiddle = getAllMiddleSlide();
                for (let i = 0; i < slidesMiddle.length; i++) {
                    slidesMiddle[i].style.backgroundImage = `url(${image.src})`;
                }
            }
        }
    }
}

let fileTypes = [
    'image/jpeg',
    'image/pjpeg',
    'image/png'
]

function validFileType(file) {
    for (var i = 0; i < fileTypes.length; i++) {
        if (file.type === fileTypes[i]) {
            return true;
        }
    }
    return false;
}
