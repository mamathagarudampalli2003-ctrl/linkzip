export default function TeamLinks({
  teamLinks,
  handleCopy,
  handleDelete,
}) {
  if (!teamLinks || teamLinks.length === 0) {
    return (
      <div className="bg-gray-900 p-6 rounded-xl text-center text-gray-400">
        🚀 No links available
      </div>
    );
  }

  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">

      <h2 className="text-2xl font-bold mb-5 text-green-400">
        🔗 Team Links
      </h2>

      <div className="space-y-4">

        {teamLinks.map((link) => {
          const shortUrl =
            `http://localhost:8000/api/url/r/${link.shortId}`;

          return (
            <div
              key={link._id}
              className="bg-gray-800 p-4 rounded-lg"
            >

              {/* ORIGINAL */}
              <p className="text-sm break-all text-gray-300">
                {link.originalUrl}
              </p>

              {/* SHORT */}
              <a
                href={shortUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 text-sm break-all"
              >
                {shortUrl}
              </a>

              {/* FOOTER */}
              <div className="flex justify-between items-center mt-4">

                <div>

  <p className="text-xs text-gray-400">
    👆 {link.clicks || 0} Clicks
  </p>

  <p className="text-xs text-gray-500 mt-1">
    Created:
    {" "}
    {new Date(
      link.createdAt
    ).toLocaleDateString()}
  </p>

</div>

                <div className="flex gap-2">

                  <button
                    onClick={() =>
                      handleCopy(shortUrl)
                    }
                    className="bg-green-500 px-3 py-1 rounded text-sm"
                  >
                    Copy
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(link._id)
                    }
                    className="bg-red-500 px-3 py-1 rounded text-sm"
                  >
                    Delete
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