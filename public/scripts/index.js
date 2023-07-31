//Elements Declaration
const SVGInput = document.getElementById("SVGInput");
const uploadSVG = document.getElementById("uploadSVG");

//Varibles
var file, encodedSVG;

//Functions
const checkChange = (event) => {
  let reader = new FileReader();
  file = event.target.files[0];
  reader.readAsDataURL(file);
  reader.onload = () => {
    encodedSVG = reader.result;
  };
  reader.onerror = (error) => {
    console.log("error", error);
  };
};

const handleUpload = async () => {
  try {
    await axios.post("/api/convert-to-css", {
      encodedSVG,
    });
  } catch (error) {
    console.error(error);
  }
};

//EventListeners
SVGInput.addEventListener("change", checkChange);
uploadSVG.addEventListener("click", handleUpload);
