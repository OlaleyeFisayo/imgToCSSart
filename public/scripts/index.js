//Elements Declaration
const SVGInput = document.getElementById("SVGInput");
const uploadSVG = document.getElementById("uploadSVG");
const downloadFile = document.getElementById("downloadFile");
const uploadImage = document.getElementById("uploadImage");

//Functions
const uploadToServer = async () => {
  const formData = new FormData();
  const file = SVGInput.files[0];
  formData.append("svgFile", file);
  try {
    await axios.post("/api/convert-to-css", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.error(error);
  }
};

const getRARFromServer = async () => {
  try {
    const response = await axios.get("/api/convert-to-css", {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Output.rar");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  } catch (error) {
    console.error("Error downloading RAR file:", error);
  }
};

const uploadUserImage = () => {
  const fileInput = document.getElementById("fileInput");
  fileInput.click();
};

const fileReader = (e) => {
  const reader = new FileReader();
  file = e.target.files[0];
  var falseData;
  /* reads file into base 64 data type */
  reader.readAsDataURL(file);
  reader.onload = () => {
    falseData = reader.result;
  };
  reader.onerror = (error) => {
    console.log("error", error);
  };
  reader.onloadend = async () => {
    await uploadToServer();
    await getRARFromServer();
  };
};

//EventListeners
SVGInput.addEventListener("change", fileReader);
downloadFile.addEventListener("click", () => {
  SVGInput.click();
});
uploadImage.addEventListener("click", uploadUserImage);
