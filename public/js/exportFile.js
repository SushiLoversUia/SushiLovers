
function exportMyFile() {
    var i = 0;
    var textToSave = "";
    while(localStorage.getItem('slide' + i))
    {
        textToSave += localStorage.getItem('slide' + i) + "\r\n";
        i++;
    }

    var hiddenElement = document.createElement('a');
    var nameFile = JSON.parse(localStorage.getItem('presentationInfo')).prName

    hiddenElement.href = 'data:attachment/text,' + encodeURI(textToSave);
    hiddenElement.target = '_blank';
    console.log(nameFile.replace(/ /g,"-") + '.txt');
    hiddenElement.download = nameFile.replace(/ /g,"-") + '.txt';
    hiddenElement.click();
}

