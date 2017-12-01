
function importMyFile() {
    var f = document.getElementById("btnImport").files[0];
    var text;
    
    if (f) 
    {
        var r = new FileReader();
        r.onload = function(e) { 
            var contents = e.target.result;
            showMyPres(contents);
        }
        r.readAsText(f);
    } 
    else 
    { 
        alert("Failed to load file");
    }
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
