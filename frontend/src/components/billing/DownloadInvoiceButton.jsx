import {
  downloadInvoice,
} from "../../api/invoiceApi";

export default function DownloadInvoiceButton() {

  const handleDownload =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const pdf =
          await downloadInvoice(
            token
          );

        const url =
          window.URL.createObjectURL(
            new Blob([pdf])
          );

        const link =
          document.createElement(
            "a"
          );

        link.href = url;

        link.download =
          "invoice.pdf";

        link.click();

      } catch (error) {

        console.log(error);

        alert(
          "Failed to download invoice"
        );
      }
    };

  return (

    <button
      onClick={
        handleDownload
      }
      className="
        bg-green-600
        hover:bg-green-700
        text-white
        px-5
        py-3
        rounded-xl
        font-bold
      "
    >
      📄 Download Invoice
    </button>
  );
}