const printPdf = (file) => {
  let blob = null;

  file = file.replace("data:image/png;base64,", "");

  const contentType = "application/pdf";
  const sliceSize = 512;
  const byteCharacters = window.atob(file);
  const byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  blob = new Blob(byteArrays, {
    type: contentType,
  });

  const blobURL = window.URL.createObjectURL(blob);
  const theWindow = window.open(blobURL);
  const theDoc = theWindow.document;
  const theScript = document.createElement("script");
  function injectThis() {
    window.print();
  }
  theScript.innerHTML = `window.onload = ${injectThis.toString()};`;
  theDoc.body.appendChild(theScript);
};

const downloadPdf = (file, file_name) => {
  const linkSource = file;
  const downloadLink = document.createElement("a");
  const fileName = file_name;
  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
};

export default {
  printPdf,
  downloadPdf,
};
