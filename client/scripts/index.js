//Elements Declaration
const SVGInput = document.getElementById("SVGInput");
const uploadSVG = document.getElementById("uploadSVG");

//Varibles
let file, encodedImage;

//Functions
const checkChange = (event) => {
  let reader = new FileReader();
  file = event.target.files[0];
  reader.readAsDataURL(file);
  reader.onload = () => {
    encodedImage = reader.result;
  };
  reader.onerror = (error) => {
    console.log("error", error);
  };
};

const handleUpload = async () => {
  try {
    await axios.post("https://localhost:3000/api/convert-to-css", {
      encodedImage,
    });
  } catch (error) {
    console.error(error);
  }
};

//EventListeners
SVGInput.addEventListener("change", checkChange);
uploadSVG.addEventListener("click", handleUpload);

