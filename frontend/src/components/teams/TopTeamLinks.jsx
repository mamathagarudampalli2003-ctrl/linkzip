export default function TopTeamLinks({
  teamLinks,
}) {

  const topLinks =
    [...teamLinks]
      .sort(
        (a, b) =>
          (b.clicks || 0) -
          (a.clicks || 0)
      )
      .slice(0, 5);

  return (

    <div className="bg-gray-800 p-5 rounded-xl">

      <h3 className="text-xl font-bold mb-4">

        🔥 Top Team Links

      </h3>

      {topLinks.map((link) => (

        <div
          key={link._id}
          className="flex justify-between py-2 border-b border-gray-700"
        >

          <span>
            {link.shortId}
          </span>

          <span className="text-green-400">
            {link.clicks}
          </span>

        </div>

      ))}

    </div>

  );
}