export default function LinkCard({
  item,
  shortUrl,
  handleCopy,
  handleDelete,
  handleToggleStatus,
  navigate,
}) {
  return (
    <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">

      {/* ORIGINAL */}
      <p className="text-sm break-all text-gray-300">
        {item.originalUrl}
      </p>

      {/* SHORT URL */}
      <a
        href={shortUrl}
        target="_blank"
        rel="noreferrer"
        className="text-blue-400 text-sm break-all"
      >
        {shortUrl}
      </a>

      {/* STATS */}
      <div className="flex justify-between mt-3 text-xs text-gray-400">

        <span>
          👆 {item.clicks || 0} Clicks
        </span>

        <span>
          {item.status === "disabled"
            ? "🚫 Disabled"
            : "✅ Active"}
        </span>

      </div>

      {/* ACTIONS */}
      <div className="flex gap-2 mt-4 flex-wrap">

        <button
          onClick={() => handleCopy(shortUrl)}
          className="bg-green-500 px-3 py-1 rounded text-sm"
        >
          Copy
        </button>

        <button
          onClick={() =>
            handleDelete(item._id)
          }
          className="bg-red-500 px-3 py-1 rounded text-sm"
        >
          Delete
        </button>

        <button
          onClick={() =>
            handleToggleStatus(item._id)
          }
          className="bg-yellow-500 px-3 py-1 rounded text-sm"
        >
          Toggle
        </button>

        <button
          onClick={() =>
            navigate(
              `/analytics/${item.shortId}`
            )
          }
          className="bg-purple-500 px-3 py-1 rounded text-sm"
        >
          Analytics
        </button>

      </div>

    </div>
  );
}