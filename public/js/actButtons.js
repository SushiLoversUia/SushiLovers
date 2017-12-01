window.addEventListener("load", function () {

    boldButton.addEventListener("click", function () {
        document.execCommand("Bold", false, null)
    })

    underLine.addEventListener("click", function () {
        document.execCommand("underline", false, null)
    })

    italicButton.addEventListener("click", function () {
        document.execCommand("Italic", false, null)
    })

    supButton.addEventListener("click", function () {
        document.execCommand("SuperScript", false, null)
    })

    subButton.addEventListener("click", function () {
        document.execCommand("SubScript", false, null)
    })

    orderedListButton.addEventListener("click", function () {
        document.execCommand("InsertOrderedList", false, "newOL" + Math.round(Math.random() * 1000))
    })

    unorderedListButton.addEventListener("click", function () {
        document.execCommand("InsertUnorderedList", false, "newUL" + Math.round(Math.random() * 1000))
    })

    fontColorButton.addEventListener("change", function (event) {
        document.execCommand("ForeColor", false, event.target.value)
    })

    hightlightButton.addEventListener("change", function (event) {
        document.execCommand("BackColor", false, event.target.value)
    })

    fontChange.addEventListener("change", function (event) {
        document.execCommand("FontName", false, event.target.value)
    })

    fontSize.addEventListener("change", function (event) {
        document.execCommand("FontSize", false, event.target.value)
    })

    linkButton.addEventListener("click", function (event) {
        var url = prompt("Enter a URL", "http://")
        document.execCommand("CreateLink", false, url)
    })
    unlinkButton.addEventListener("click", function (event) {
        document.execCommand("UnLink", false, null)
    })

    undoButton.addEventListener("click", function (event) {
        document.execCommand("undo", false, null)
    })

    redoButton.addEventListener("click", function (event) {
        document.execCommand("redo", false, null)
    })

    alignLeft.addEventListener("click", function (event) {
        document.execCommand("justifyLeft", false, null)
    })

    alignCenter.addEventListener("click", function (event) {
        document.execCommand("justifyCenter", false, null)
    })

    alignRight.addEventListener("click", function (event) {
        document.execCommand("justifyRight", false, null)
    })

    //save all the information currently the user is using, seeing
    let btnSave = document.getElementById('btnSave');
    btnSave.addEventListener('click', save);

    //open(retrive) information that user stored previously
    let btnRecall = document.getElementById('btnRecall');
    btnRecall.addEventListener('click', recall);

    //export in flat file
    let btnExport = document.getElementById('btnExport');
    btnExport.addEventListener('click', exportMyFile);
    
    //import a presentation
    let btnImport = document.getElementById('btnImport');
    btnImport.addEventListener('change', importMyFile);

    //making new example squares on our slide(in the middle)
    //make new slides
    let btnNewSlide = document.getElementById('btnNewSlide');
    btnNewSlide.addEventListener('click', defaultNewSlide);

    let btnNewtextbox = document.getElementById('btnNewtextbox');
    btnNewtextbox.addEventListener('click', newTextbox);

    //put image file from local dir inside of square(that user clicked last time)
    

    //left, down arrow >> previous slide, right,up arrow >> next slide, delete >> delete slide or square(figure)
    document.onkeydown = keyEvent;

    //backspace delete or delete last clicked square or slide
    let btnDelete_square = document.getElementById('btnDelete_square');
    btnDelete_square.addEventListener('click', deleteSquare_html);
    let btnDelete_curSlide = document.getElementById('btnDelete_curSlide');
    btnDelete_curSlide.addEventListener('click', deleteSlide_html);

    let btnDelete_curSlideTheme = document.getElementById('btnDelete_curSlideTheme');
    btnDelete_curSlideTheme.addEventListener('click', deleteCurSlide_theme);

    let btnDelete_wholeSlideTheme = document.getElementById('btnDelete_wholeSlideTheme');
    btnDelete_wholeSlideTheme.addEventListener('click', deleteWholeSlide_theme);
})
