//Elements Declaration
const SVGInput = document.getElementById("SVGInput");
const uploadSVG = document.getElementById("uploadSVG");
const downloadFile = document.getElementById("downloadFile");

//Functions
const handleUpload = async () => {
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

const handleClick = async () => {
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

//EventListeners
uploadSVG.addEventListener("click", handleUpload);
downloadFile.addEventListener("click", handleClick);
