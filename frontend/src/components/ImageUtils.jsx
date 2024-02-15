const ImageUtils = (imageData) => {
    console.log(imageData);
    // The code converts binary image data from each book into URLs and creates an array of these URLs (images).
    const bufferData = new Uint8Array(imageData.image.data.data); //converts binary image data into Uint8Array (8-bit unsigned integer array).
    const blob = new Blob([bufferData], {type: imageData.image.contentType}); //create binary large object (blob) from Uint8Array with specifying content type.
    const urlCreator = window.URL || window.webkitURL; //checking web api's
    const imageUrl = urlCreator.createObjectURL(blob); //creating url representing blob & imageUrl is an array of URLs
    return (imageUrl)
}

export default ImageUtils;