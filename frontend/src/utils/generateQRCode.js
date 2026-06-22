export const downloadQRCode = (
  elementId,
  fileName = "qr-code"
) => {
  try {
    const canvas =
      document.getElementById(elementId);

    if (!canvas) {
      alert("QR Code not found");
      return;
    }

    const pngUrl =
      canvas.toDataURL("image/png");

    const downloadLink =
      document.createElement("a");

    downloadLink.href = pngUrl;

    downloadLink.download =
      `${fileName}.png`;

    downloadLink.click();
  } catch (err) {
    console.error("QR Download Error", err);
  }
};