(async () => {
  const ccEverywhere = await window.CCEverywhere.initialize({
    clientId: "22d488e78a6a47e5a1a66bbc53416c42",
    appName: "convertImgToSVG",
    appVersion: { major: 1, minor: 0 },
    platformCategory: "web",
  });
  /* file: user uploaded file
    imageUrl: base64 representation we pass into QA function */
  var file, encodedImage;

  /* This event listener checks to see if the user uploaded a new file */
  document.getElementById("fileInput").addEventListener("change", (e) => {
    const reader = new FileReader();
    file = e.target.files[0];
    /* reads file into base 64 data type */
    reader.readAsDataURL(file);
    reader.onload = () => {
      encodedImage = reader.result;
    };
    reader.onerror = (error) => {
      console.log("error", error);
    };
    reader.onloadend = () => {
      document.getElementById("convert-to-svg").click();
    };
  });

  const exportOptions = [
    //   /* Download export button */
    {
      target: "Download",
      variant: "primary",
      optionType: "button",
      buttonType: "native",
    },
  ];

  const callbacks = {
    onCancel: () => {},
    onError: (err) => {
      console.error("Error received is", err.toString());
    },
  };

  document.getElementById("convert-to-svg").addEventListener("click", () => {
    ccEverywhere.openQuickAction({
      id: "convert-to-svg",
      inputParams: {
        asset: {
          data: encodedImage,
          dataType: "base64",
          type: "image",
        },
        exportOptions: exportOptions,
      },
      callbacks: callbacks,
      modalParams: {},
    });
  });
})();
