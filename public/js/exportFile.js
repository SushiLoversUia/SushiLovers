'use strict';

function exportMyFile() {
    var i = 0;
    var textToSave = "";
    while(localStorage.getItem('slide' + i))
    {
        textToSave += localStorage.getItem('slide' + i) + "\\n";
        i++;
    }

    var hiddenElement = document.createElement('a');

    hiddenElement.href = 'data:attachment/text,' + encodeURI(textToSave);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'myFile.txt';
    hiddenElement.click();
}

