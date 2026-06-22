export default function ExportAnalyticsButton({
  urls,
}) {

  const exportCSV = () => {

    const rows = [
      [
        "Short ID",
        "Original URL",
        "Clicks",
        "Unique Clicks",
        "Created At",
      ],
    ];

    urls.forEach((url) => {

      rows.push([
        url.shortId,
        url.originalUrl,
        url.clicks || 0,
        url.uniqueClicks || 0,
        url.createdAt,
      ]);
    });

    const csvContent =
      rows
        .map((e) =>
          e.join(",")
        )
        .join("\n");

    const blob =
      new Blob(
        [csvContent],
        {
          type:
            "text/csv;charset=utf-8;",
        }
      );

    const link =
      document.createElement("a");

    const urlBlob =
      URL.createObjectURL(blob);

    link.href =
      urlBlob;

    link.download =
      "analytics.csv";

    link.click();
  };

  return (
    <button
      onClick={exportCSV}
      className="
        bg-green-600
        hover:bg-green-700
        px-5
        py-3
        rounded-xl
        font-semibold
      "
    >
      Export Analytics CSV
    </button>
  );
}