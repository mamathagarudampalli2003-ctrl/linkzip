import { useState } from "react";

export default function BulkUpload({
  createShortUrl,
}) {

  const [loading, setLoading] =
    useState(false);

  const handleFile = async (e) => {

    const file =
      e.target.files[0];

    if (!file) return;

    const text =
      await file.text();

    const rows =
      text.split("\n");

    setLoading(true);

    try {

      for (
        let i = 1;
        i < rows.length;
        i++
      ) {

        const row =
          rows[i].trim();

        if (!row) continue;

        const cols =
          row.split(",");

        await createShortUrl({
          originalUrl:
            cols[0],
        });
      }

      alert(
        "Bulk Upload Completed 🚀"
      );

    } catch (err) {

      console.log(err);

      alert(
        "Upload Failed"
      );
    }

    setLoading(false);
  };

  return (

    <div
      className="
        bg-[#111827]
        rounded-2xl
        p-6
        border
        border-white/10
      "
    >

      <h2
        className="
          text-xl
          font-bold
          text-white
          mb-4
        "
      >
        Bulk Upload CSV
      </h2>

      <input
        type="file"
        accept=".csv"
        onChange={handleFile}
      />

      {loading && (
        <p className="mt-3">
          Uploading...
        </p>
      )}

    </div>
  );
}