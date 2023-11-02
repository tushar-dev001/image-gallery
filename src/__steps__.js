/***
 *1. Image Upload:
 **When a user selects an image file, it gets read using FileReader.
 **Once the file is read, a new image object is created with a unique ID and added to the images state.  
 *
 *2. Drag and Drop:
 ** Images are draggable (draggable attribute set to true).
 ** When an image is dragged, its ID is stored in the dataTransfer object.
 ** When an image is dropped, the dragged image's ID is retrieved from the dataTransfer object, and the images array is updated to reflect the new order.
 * 
 * 3. Checkbox Selection:
 ** Each image has a checkbox associated with it.
 ** When a checkbox is clicked, the corresponding image's selected property is toggled, and the selectedImages state is updated with the currently selected images.
 ** When a checkbox is clicked, then count the selected image.
 * 
 * 4. Image Deletion:
 ** When the "Delete Selected" button is clicked, it filters out the selected images from the images state, removing them from the gallery.
 * 
 * 
 * */ 