import { QRCodeCanvas } from "qrcode.react";

export default function QRCodeCard({
  item,
  shortUrl,
  handleDownloadQR,
}) {
  return (
    <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 flex flex-col items-center">

      <QRCodeCanvas
        id={`qr-${item._id}`}
        value={shortUrl}
        size={120}
      />

      <button
        onClick={() =>
          handleDownloadQR(item._id)
        }
        className="mt-4 bg-blue-500 px-4 py-2 rounded text-sm"
      >
        ⬇ Download QR
      </button>

    </div>
  );
}