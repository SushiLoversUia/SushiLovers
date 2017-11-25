


window.addEventListener("load", function(){

  boldButton.addEventListener("click", function(){
      editor.execCommand("Bold", false, null)
  })
    underLine.addEventListener("click", function(){
        editor.execCommand("underline", false, null)
    })

  italicButton.addEventListener("click", function(){
      editor.execCommand("Italic", false, null)
  })

  supButton.addEventListener("click", function(){
      editor.execCommand("SuperScript", false, null)
  })

  subButton.addEventListener("click", function(){
      editor.execCommand("SubScript", false, null)
  })

  orderedListButton.addEventListener("click", function(){
      editor.execCommand("InsertOrderedList", false, "newOL"+ Math.round(Math.random()*1000))
  })

  unorderedListButton.addEventListener("click", function(){
      editor.execCommand("InsertUnorderedList", false, "newUL"+ Math.round(Math.random()*1000))
  })

  fontColorButton.addEventListener("change", function(event){
      editor.execCommand("ForeColor", false, event.target.value)
  })

  hightlightButton.addEventListener("change", function(event){
      editor.execCommand("BackColor", false, event.target.value)
  })

  fontChange.addEventListener("change", function(event){
      editor.execCommand("FontName", false, event.target.value)
  })

  fontSize.addEventListener("change", function(event){
      editor.execCommand("FontSize", false, event.target.value)
  })

  linkButton.addEventListener("click", function(event){
    var url = prompt("Enter a URL", "http://")
      editor.execCommand("CreateLink", false, url)
  })
  unlinkButton.addEventListener("click", function(event){
    editor.execCommand("UnLink", false, null)
  })

  undoButton.addEventListener("click", function(event){
    editor.execCommand("undo", false, null)
  })

  redoButton.addEventListener("click", function(event){
    editor.execCommand("redo", false, null)
  })

  alignLeft.addEventListener("click", function(event){
    editor.execCommand("justifyLeft", false, null)
  })

  alignCenter.addEventListener("click", function(event){
    editor.execCommand("justifyCenter", false, null)
  })

  alignRight.addEventListener("click", function(event){
    editor.execCommand("justifyRight", false, null)
  })

  addImg.addEventListener("change", addImage

  )

})
