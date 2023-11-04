import { useState } from "react";
import { BiPhotoAlbum } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

function App() {
  // State for storing uploaded images and selected images
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  // Function to handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Create a new image object with a unique ID and add it to the images state
        const newImage = {
          src: reader.result,
          id: Date.now(),
          selected: false,
        };
        setImages((prevImages) => [...prevImages, newImage]);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to handle drag start event
  const handleDragStart = (event, imageId) => {
    // Set the dragged image ID in the dataTransfer object
    event.dataTransfer.setData("imageId", imageId);
    console.log(event, "id", imageId);
  };

  // Function to handle drag over event and prevent default behavior
  const handleDragOver = (event) => {
    event.preventDefault();
    console.log(event);
  };

  // Function to handle drop event and rearrange images based on the dropped image's position
  const handleDrop = (event, targetIndex) => {
    console.log(event, "target", targetIndex);
    const draggedImageId = event.dataTransfer.getData("imageId");
    const draggedIndex = images.findIndex(
      (image) => image.id.toString() === draggedImageId
    );
    const updatedImages = [...images];
    const [draggedImage] = updatedImages.splice(draggedIndex, 1);
    updatedImages.splice(targetIndex, 0, draggedImage);
    setImages(updatedImages);
  };

  // Function to handle checkbox change and update selectedImages state
  const handleCheckboxChange = (id) => {
    const updatedImages = images.map((image) =>
      image.id === id ? { ...image, selected: !image.selected } : image
    );
    setImages(updatedImages);
    const selected = updatedImages.filter((image) => image.selected);
    setSelectedImages(selected);
  };

  // Filter selected images and update the selectedImages state
  const handleDelete = () => {
    // Filter out selected images and update the images and selectedImages states
    const updatedImages = images.filter((image) => !image.selected);
    setImages(updatedImages);
    setSelectedImages([]);
  };

  return (
    <div className="App">
      <div>
        {/* Display the number of selected images */}
        {selectedImages.length > 0 ? (
          <h2 className="bg-orange-500 text-white text-xl font-bold rounded-lg bg-opacity-50 py-2">
            Selected Images: {selectedImages.length}
          </h2>
        ) : (
          <h2 className="bg-orange-500 text-white text-xl font-bold rounded-lg bg-opacity-50 py-2">
            Image Gallery
          </h2>
        )}
      </div>
      <div className="image-container" onDragOver={handleDragOver}>
        {/* Map through images and display each image with drag and checkbox functionality */}
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`img-wrapper relative ${
              index === 0 ? "first-img" : "others-image"
            } ${image.selected ? "selected" : ""}`}
            draggable
            onDragStart={(event) => handleDragStart(event, image.id)}
            onDrop={(event) => handleDrop(event, index)}
          >
            <img src={image.src} alt={`Uploaded ${image.id}`} />

            {/* Checkbox for selecting the image */}
            <input
              type="checkbox"
              className="absolute top-2 right-2 checkbox"
              checked={image.selected}
              onChange={() => handleCheckboxChange(image.id)}
            />
          </div>
        ))}
        {/* Image uploader input */}
        <label>
          <div className="w-48 h-48 mt-4 border rounded-lg cursor-pointer mx-auto">
            <BiPhotoAlbum className="text-5xl mx-auto mt-12 cursor-pointer" />
            <h1 className="mt-2 text-lg font-bold cursor-pointer">
              Upload Image
            </h1>
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageUpload}
            />
          </div>
        </label>

        {/* Delete selected images button */}
        {selectedImages.length > 0 && (
          <label>
            <div className="w-48 h-48 mt-4 border border-red-500 mx-auto rounded-lg cursor-pointer">
              <button onClick={handleDelete}>
                <AiFillDelete
                  className="text-5xl mx-auto mt-12 text-red-500"
                  cursor-pointer
                />
                <h3 className="mt-2 text-lg font-bold text-red-500 cursor-pointer">
                  Delete Selected
                </h3>
              </button>
            </div>
          </label>
        )}
      </div>
    </div>
  );
}

export default App;
