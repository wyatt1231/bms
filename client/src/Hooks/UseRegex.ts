export const regex_image = /[\/.](gif|jpg|jpeg|tiff|png)$/i;
export const regex_pdf = /[\/.](pdf)$/i;

const GenerateFileType = (file_name: string): "img" | "pdf" | "" => {
  if (regex_pdf.test(file_name)) {
    return "pdf";
  }

  if (regex_image.test(file_name)) {
    return "img";
  }

  return "pdf";
};

export default {
  GenerateFileType,
};
