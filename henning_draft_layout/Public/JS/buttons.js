




window.addEventListener("load", function(){


  btnSave.addEventListener("click", save)
  btnOpen.addEventListener("click", open)


  boldButton.addEventListener("click", function(){
      document.execCommand("Bold", false, null)
  })

  underLine.addEventListener("click", function(){
        document.execCommand("underline", false, null)
    })

  italicButton.addEventListener("click", function(){
      document.execCommand("Italic", false, null)
  })

  supButton.addEventListener("click", function(){
      document.execCommand("SuperScript", false, null)
  })

  subButton.addEventListener("click", function(){
      document.execCommand("SubScript", false, null)
  })

  orderedListButton.addEventListener("click", function(){
      document.execCommand("InsertOrderedList", false, "newOL"+ Math.round(Math.random()*1000))
  })

  unorderedListButton.addEventListener("click", function(){
      document.execCommand("InsertUnorderedList", false, "newUL"+ Math.round(Math.random()*1000))
  })

  fontColorButton.addEventListener("change", function(event){
      document.execCommand("ForeColor", false, event.target.value)
  })

  hightlightButton.addEventListener("change", function(event){
      document.execCommand("BackColor", false, event.target.value)
  })

  fontChange.addEventListener("change", function(event){
      document.execCommand("FontName", false, event.target.value)
  })

  fontSize.addEventListener("change", function(event){
      document.execCommand("FontSize", false, event.target.value)
  })

  linkButton.addEventListener("click", function(event){
    var url = prompt("Enter a URL", "http://")
      document.execCommand("CreateLink", false, url)
  })
  unlinkButton.addEventListener("click", function(event){
    document.execCommand("UnLink", false, null)
  })

  undoButton.addEventListener("click", function(event){
    document.execCommand("undo", false, null)
  })

  redoButton.addEventListener("click", function(event){
    document.execCommand("redo", false, null)
  })

  alignLeft.addEventListener("click", function(event){
    document.execCommand("justifyLeft", false, null)
  })

  alignCenter.addEventListener("click", function(event){
    document.execCommand("justifyCenter", false, null)
  })

  alignRight.addEventListener("click", function(event){
    document.execCommand("justifyRight", false, null)
  })

  addImg.addEventListener("change", addImage)

})
