async function uploadFile() {

    const fileInput = document.getElementById("fileInput")

    const formData = new FormData()

    formData.append("file", fileInput.files[0])

    await fetch("/upload", {
        method: "POST",
        body: formData
    })

    alert("File Uploaded Successfully")

}