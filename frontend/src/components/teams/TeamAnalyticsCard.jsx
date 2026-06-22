export default function TeamAnalyticsCard({
  teamLinks,
}) {

  const totalLinks =
    teamLinks.length;

  const totalClicks =
    teamLinks.reduce(
      (sum, link) =>
        sum + (link.clicks || 0),
      0
    );

  const avgClicks =
    totalLinks > 0
      ? Math.round(
          totalClicks /
          totalLinks
        )
      : 0;

  const topLink =
    [...teamLinks].sort(
      (a, b) =>
        (b.clicks || 0) -
        (a.clicks || 0)
    )[0];

  return (

    <div className="grid md:grid-cols-4 gap-4 mb-6">

      <div className="bg-gray-800 p-5 rounded-xl">

        <p className="text-gray-400">
          Team Links
        </p>

        <h2 className="text-3xl font-bold text-blue-400">
          {totalLinks}
        </h2>

      </div>

      <div className="bg-gray-800 p-5 rounded-xl">

        <p className="text-gray-400">
          Total Clicks
        </p>

        <h2 className="text-3xl font-bold text-green-400">
          {totalClicks}
        </h2>

      </div>

      <div className="bg-gray-800 p-5 rounded-xl">

        <p className="text-gray-400">
          Avg Clicks
        </p>

        <h2 className="text-3xl font-bold text-purple-400">
          {avgClicks}
        </h2>

      </div>

      <div className="bg-gray-800 p-5 rounded-xl">

        <p className="text-gray-400">
          Top Link
        </p>

        <h2 className="text-sm font-bold text-orange-400 break-all">
          {topLink?.shortId || "-"}
        </h2>

      </div>

    </div>

  );
}