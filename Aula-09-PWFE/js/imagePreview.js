'use strict'

const imagePreview = (idFile, IdImage) => {
    const file = document.getElementById(idFile).file[0]
    const preview = document.getElementById (IdImage)
    const fileReader = new FileReader()

    if(file){
        fileReader.readAsDataURL(file)
        fileReader.onload = () => preview.src = fileReader.result
    }
}

export{
    imagePreview
}