
function importMyFile() {
    var file = document.getElementById("btnImport").files[0];
    
    if(/\.(txt)$/i.test(file.name))
    {
        if (file) 
        {
            var fr = new FileReader();
            fr.onload = function(evt) { 
                var text = evt.target.result;
                showMyPres(text);
            }
            fr.readAsText(file);
        } 
        else 
        { 
            alert("Failed to load file");
        }
    }
    else
        alert("The file must be a .txt");
}

function showMyPres(myText) {
    localStoClean();
    var myNewText = myText.split("\n");
    for(i=0; i<myNewText.length-1; i++)
    {
        localStorage.setItem('slide' + i, myNewText[i]);
    }
    recall();
}

function localStoClean() {
    if(localStorage.getItem('presentationInfo') != null)
    {
        var nbSlide = JSON.parse(localStorage.getItem('presentationInfo')).numOfSlides;
        for(i=0; i<nbSlide; i++)
            localStorage.removeItem('slide' + i);
    }
}
