let fileInputText = document.querySelector(`#fileInputText`)
fileInputText.addEventListener(`change`, e => {
  let files = e.target.files
  let file = files[0]
  let reader = new FileReader()

  reader.onload = function(e) {
    let textFileDisplayArea = document.querySelector(`#textFileDisplayArea`)
    textFileDisplayArea.innerHTML = ``
    textFileDisplayArea.innerText = e.target.result
  }
  reader.readAsText(file)
})

let fileInputImage = document.querySelector(`#fileInputImage`)
fileInputImage.addEventListener(`change`, e => {
  let files = e.target.files
  let file = files[0]
  let reader = new FileReader()

  reader.onload = function(e) {
    let imageFileDisplayArea = document.querySelector(`#imageFileDisplayArea`)
    imageFileDisplayArea.innerHTML = ``
    let img = new Image()
    img.src = e.target.result
    imageFileDisplayArea.appendChild(img)
  }
  reader.readAsDataURL(file)
})
