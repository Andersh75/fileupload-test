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
    img.src = byteStringToDataURL(file.type, dataURLToByteString(e.target.result))
    imageFileDisplayArea.appendChild(img)
    // downloadURL(e.target.result, `test.png`)
    // var blob = dataURLtoBlob(e.target.result)
    // downloadBlob(blob, `test.png`)
    // blobToDataURL(blob, result => {
    //   downloadURL(result, `test.png`)
    // })

    //var decodedData = window.atob(`aWQsbmFtZSxhZ2UKMSwiRnJlZCBGb28iLDk5CjIsIkpvZSBCbG9nZ3MiLDIyCg==`)
    console.log(dataURLToByteString(e.target.result))
    downloadURL(stringToDataURL(file.type, `hej`), `test.md`)
  }
  reader.readAsDataURL(file)
})

let fileInputBlob = document.querySelector(`#fileInputBlob`)
fileInputBlob.addEventListener(`change`, e => {
  let files = e.target.files
  let file = files[0]
  let reader = new FileReader()

  reader.onload = function(e) {
    // let blobFileDisplayArea = document.querySelector(`#blobFileDisplayArea`)
    // blobFileDisplayArea.innerHTML = ``
    let arrayBuffer = e.target.result

    let blob = arrayBufferToBlob(arrayBuffer, file.type)
    // var dataView = new DataView(arrayBuffer)
    // var decoder = new TextDecoder(`utf-8`)
    // var decodedString = decoder.decode(dataView)
    // console.log(decodedString)
    // blobToArrayBuffer(blob, result => {
    //   downloadBlob(arrayBufferToBlob(result), `test.png`)
    // })
    // arrayBufferToDataURL(arrayBuffer, file.type, result => {
    //   downloadURL(result, `test.png`)
    // })

    downloadBlob(blob, `test.png`)
  }
  reader.readAsArrayBuffer(file)
})

function arrayBufferToBlob(arrayBuffer, type) {
  return new Blob([arrayBuffer], { type: type })
}

function arrayBufferToDataURL(arrayBuffer, type, callback) {
  var blob = arrayBufferToBlob(arrayBuffer, type)
  var reader = new FileReader()
  reader.onload = function(e) {
    callback(e.target.result)
  }
  reader.readAsDataURL(blob)
}

function stringToByteString(string) {
  return btoa(string)
}

function byteStringToString(byteString) {
  return atob(byteString)
}

function dataURLToByteString(dataURL) {
  return dataURL.split(`,`)[1]
}

function dataURLToMimeString(dataURL) {
  return dataURL
    .split(`,`)[0]
    .split(`:`)[1]
    .split(`;`)[0]
}

function byteStringToDataURL(mime, byteString) {
  return `data:${mime};base64,${byteString}`
}

function stringToDataURL(mime, string) {
  return `data:${mime};base64,${stringToByteString(string)}`
}

function dataURLtoArrayBuffer(dataURL) {
  var byteString = byteStringToString(dataURLToByteString(dataURL))
  return new ArrayBuffer(byteString.length)
}

function dataURLtoBlob(dataURL) {
  var mimeString = dataURLToMimeString(dataURL)
  var byteString = byteStringToString(dataURLToByteString(dataURL))
  let arrayBuffer = dataURLtoArrayBuffer(dataURL)
  var _ia = new Uint8Array(arrayBuffer)
  for (var i = 0; i < byteString.length; i++) {
    _ia[i] = byteString.charCodeAt(i)
  }

  // var dataView = new DataView(arrayBuffer)
  // var blob = arrayBufferToBlob(dataView, mimeString)
  return arrayBufferToBlob(arrayBuffer, mimeString)
}

function blobToArrayBuffer(blob, callback) {
  var fileReader = new FileReader()
  fileReader.onload = function(e) {
    callback(e.target.result)
  }
  fileReader.readAsArrayBuffer(blob)
}

function blobToDataURL(blob, callback) {
  var a = new FileReader()
  a.onload = function(e) {
    callback(e.target.result)
  }
  a.readAsDataURL(blob)
}

function downloadBlob(blob, name) {
  const link = document.createElement(`a`)
  if (link.download !== undefined) {
    const url = window.URL.createObjectURL(blob)
    link.setAttribute(`href`, url)
    link.setAttribute(`download`, `test.png`)
    link.style.visibility = `hidden`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

function downloadURL(uri, name) {
  var link = document.createElement(`a`)
  link.download = name
  link.href = uri
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
