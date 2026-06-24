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

  // ================= OPEN SHORT URL =================

  const openShortUrl = (shortId) => {
  const shortUrl =
    `https://linkzip-0w52.onrender.com/api/url/r/${shortId}`;

  window.open(shortUrl, "_blank");
};
  
  return (
    <div className="bg-[#111827] border border-white/10 rounded-3xl p-6 shadow-2xl mt-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">

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

      {/* EMPTY */}
      {filteredUrls.length === 0 && (
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
      )}

      {/* LINKS */}
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

                  <div className="flex items-center gap-3 mb-2 flex-wrap">

                    <h2 className="text-lg font-semibold text-white break-all">
  {item.customDomain
 ? `${item.customDomain}/${item.shortId}`
 : item.shortId}

{item.domainVerified && (
  <span
    className="
      ml-2
      text-green-400
      text-xs
    "
  >
    ✓ Verified
  </span>
)}
</h2>

<span
  className={`px-3 py-1 rounded-full text-xs font-medium ${
    item.status === "active"
      ? "bg-green-500/20 text-green-400"
      : item.status === "expired"
      ? "bg-yellow-500/20 text-yellow-400"
      : "bg-red-500/20 text-red-400"
  }`}
>
  {item.status}
</span>
             
 {item.rules?.length > 0 && (
  <span
    className="
      px-3
      py-1
      rounded-full
      text-xs
      bg-purple-500/20
      text-purple-400
    "
  >
    Smart Routing
  </span>
)}
{item.aiOptimized && (
  <span
    className="
      px-3
      py-1
      rounded-full
      text-xs
      bg-cyan-500/20
      text-cyan-400
    "
  >
    AI Optimized
  </span>
)}
                  </div>

                  {/* ORIGINAL URL */}
                  <p className="text-gray-400 text-sm break-all mb-2">
                    {item.originalUrl}
                  </p>

                  {/* SHORT URL */}
                  <button
                    onClick={() =>
                      openShortUrl(item.shortId)
                    }
                    className="text-blue-400 hover:text-blue-300 text-sm break-all underline"
                  >
                    {shortUrl}
                  </button>

                  <button
  onClick={() =>
    window.open(
      `/public/${item.shortId}`,
      "_blank"
    )
  }
  className="
    bg-indigo-500/20
    hover:bg-indigo-500/30
    text-indigo-400
    p-3
    rounded-xl
  "
>
  Public
</button>

{item.customDomain &&
 !item.domainVerified && (

<button
  onClick={() =>
    verifyDomain(
      item._id
    )
  }
  className="
    bg-orange-500/20
    hover:bg-orange-500/30
    text-orange-400
    p-3
    rounded-xl
  "
>
  Verify
</button>

)}

                  {/* STATS */}
                  <div className="flex gap-6 mt-4 text-sm text-gray-400 flex-wrap">

                    <span>
                      👆 {item.clicks || 0} Clicks
                    </span>

                    <span>
                      📅{" "}
                      {new Date(
                        item.createdAt
                      ).toLocaleDateString()}
                    </span>

                  </div>

                </div>

                {item.expiresAt && (
  <div
    className="
      mt-3
      text-yellow-400
      text-sm
    "
  >
    ⏰ Expires:
    {" "}
    {new Date(
      item.expiresAt
    ).toLocaleString()}
  </div>
)}

                {/* ACTIONS */}
                <div className="flex gap-3 flex-wrap">

                  {/* OPEN */}
                  <button
                    onClick={() =>
                      openShortUrl(item.shortId)
                    }
                    className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 p-3 rounded-xl transition"
                  >
                    <ExternalLink size={18} />
                  </button>

                  {/* COPY */}
                  <button
                    onClick={() =>
                      handleCopy(shortUrl)
                    }
                    className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 p-3 rounded-xl transition"
                  >
                    <Copy size={18} />
                  </button>

                  {/* ANALYTICS */}
                  <button
                    onClick={() =>
                      navigate(
                        `/analytics/${item.shortId}`
                      )
                    }
                    className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 p-3 rounded-xl transition"
                  >
                    <BarChart3 size={18} />
                  </button>

                  <button
  onClick={() => {
    if (item.qrCode) {
      const link =
        document.createElement("a");

      link.href =
        item.qrCode;

      link.download =
        `${item.shortId}-qr.png`;

      link.click();
    }
  }}
  className="
    bg-yellow-500/20
    hover:bg-yellow-500/30
    text-yellow-400
    p-3
    rounded-xl
    transition
  "
>
  <QrCode size={18} />
</button>

                  {/* STATUS */}
                  <button
                    onClick={() =>
                      handleToggleStatus(item._id)
                    }
                    className="bg-green-500/20 hover:bg-green-500/30 text-green-400 p-3 rounded-xl transition"
                  >
                    <CheckCircle2 size={18} />
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() =>
                      handleDelete(item._id)
                    }
                    className="bg-red-500/20 hover:bg-red-500/30 text-red-400 p-3 rounded-xl transition"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}