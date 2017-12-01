'use strict';



let themeInput = document.getElementById('btnChangeTheme');
themeInput.addEventListener('change', changeBackgroundTheme);
themeInput.style.opacity = 0;
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
