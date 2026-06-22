export default function TopLinksTable({
  urls = [],
}) {

  const topUrls =
    [...urls]
      .sort(
        (a, b) =>
          (b.clicks || 0) -
          (a.clicks || 0)
      )
      .slice(0, 10);

  return (

    <div
      className="
        bg-[#111827]
        border
        border-white/10
        rounded-3xl
        p-6
      "
    >

      <div className="mb-6">

        <h2
          className="
            text-2xl
            font-bold
            text-white
          "
        >
          Top Performing Links
        </h2>

        <p className="text-gray-400 mt-2">
          Highest traffic smart links
        </p>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-white/10">

              <th className="text-left py-4 text-gray-400">
                Short ID
              </th>

              <th className="text-left py-4 text-gray-400">
                Clicks
              </th>

              <th className="text-left py-4 text-gray-400">
                Status
              </th>

              <th className="text-left py-4 text-gray-400">
                Created
              </th>

            </tr>

          </thead>

          <tbody>

            {topUrls.map((url) => (

              <tr
                key={url._id}
                className="
                  border-b
                  border-white/5
                "
              >

                <td className="py-4 text-white font-medium">
                  {url.shortId}
                </td>

                <td className="py-4 text-cyan-400 font-semibold">
                  {url.clicks || 0}
                </td>

                <td className="py-4">

                  <span
                    className={`
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      ${
                        url.status ===
                        "active"
                          ? "bg-green-500/10 text-green-400"
                          : "bg-red-500/10 text-red-400"
                      }
                    `}
                  >
                    {url.status}
                  </span>

                </td>

                <td className="py-4 text-gray-400">

                  {new Date(
                    url.createdAt
                  ).toLocaleDateString()}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}