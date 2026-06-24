import {
  Copy,
  Trash2,
  BarChart3,
  QrCode,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

export default function LinksTable({
  filteredUrls = [],
  handleCopy,
  handleDelete,
  handleToggleStatus,
  navigate,
}) {

  // ================= SAFETY =================

  if (!Array.isArray(filteredUrls)) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 p-6 rounded-2xl text-red-400">
        Invalid URL data received
      </div>
    );
  }

  return (
    <div className="bg-[#111827] border border-white/10 rounded-3xl p-6 shadow-2xl mt-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">

        <div>
          <h2 className="text-2xl font-bold text-white">
            Smart Links
          </h2>

          <p className="text-gray-400 text-sm mt-1">
            Manage and monitor your intelligent routing links
          </p>
        </div>

        <div className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-xl text-sm">
          {filteredUrls.length} Links
        </div>

      </div>

      {/* EMPTY STATE */}
      {filteredUrls.length === 0 ? (

        <div className="text-center py-20 border border-dashed border-gray-700 rounded-2xl">

          <QrCode
            className="mx-auto mb-4 text-gray-500"
            size={50}
          />

          <h2 className="text-xl font-semibold text-white mb-2">
            No smart links yet
          </h2>

          <p className="text-gray-400">
            Create your first AI-powered smart link 🚀
          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {filteredUrls.map((item) => {

            const shortUrl =
              `https://linkzip-0w52.onrender.com/api/url/r/${item.shortId}`;

            return (

              <div
                key={item._id}
                className="bg-[#1F2937] border border-white/5 rounded-2xl p-5 hover:border-blue-500/40 transition"
              >

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                  {/* LEFT */}
                  <div className="flex-1">

                    {/* TOP */}
                    <div className="flex items-center gap-3 mb-3 flex-wrap">

                      <h2 className="text-lg font-semibold text-white break-all">
                        {item.shortId}
                      </h2>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.status === "active"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {item.status || "active"}
                      </span>

                    </div>

                    {/* ORIGINAL URL */}
                    <div className="mb-3">

                      <p className="text-xs text-gray-500 mb-1">
                        Original URL
                      </p>

                      <p className="text-gray-300 text-sm break-all">
                        {item.originalUrl}
                      </p>

                    </div>

                    {/* SHORT URL */}
                    <div className="mb-3">

                      <p className="text-xs text-gray-500 mb-1">
                        Smart URL
                      </p>

                      <a
                        href={shortUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-400 hover:text-blue-300 underline break-all flex items-center gap-2"
                      >
                        {shortUrl}

                        <ExternalLink size={14} />
                      </a>

                    </div>

                    {/* STATS */}
                    <div className="flex gap-6 mt-4 text-sm text-gray-400 flex-wrap">

                      <span>
                        👆 {item.clicks || 0} Clicks
                      </span>

                      <span>
                        📅{" "}
                        {item.createdAt
                          ? new Date(
                              item.createdAt
                            ).toLocaleDateString()
                          : "N/A"}
                      </span>

                      <span>
                        🌍 Live Routing Enabled
                      </span>

                    </div>

                  </div>

                  {/* ACTIONS */}
                  <div className="flex gap-3 flex-wrap">

                    {/* COPY */}
                    <button
                      onClick={() =>
                        handleCopy?.(shortUrl)
                      }
                      className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 p-3 rounded-xl transition"
                      title="Copy Link"
                    >
                      <Copy size={18} />
                    </button>

                    {/* ANALYTICS */}
                    <button
                      onClick={() =>
                        navigate?.(
                          `/analytics/${item.shortId}`
                        )
                      }
                      className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 p-3 rounded-xl transition"
                      title="Analytics"
                    >
                      <BarChart3 size={18} />
                    </button>

                    {/* TOGGLE STATUS */}
                    <button
                      onClick={() =>
                        handleToggleStatus?.(
                          item._id
                        )
                      }
                      className="bg-green-500/20 hover:bg-green-500/30 text-green-400 p-3 rounded-xl transition"
                      title="Toggle Status"
                    >
                      <CheckCircle2 size={18} />
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() =>
                        handleDelete?.(item._id)
                      }
                      className="bg-red-500/20 hover:bg-red-500/30 text-red-400 p-3 rounded-xl transition"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </div>

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
}