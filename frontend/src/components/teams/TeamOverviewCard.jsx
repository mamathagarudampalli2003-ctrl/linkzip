export default function TeamOverviewCard({
  team,
  teamLinks,
}) {

  const totalMembers =
    team?.members?.length || 0;

  const totalLinks =
    teamLinks?.length || 0;

  const totalClicks =
    teamLinks?.reduce(
      (sum, link) =>
        sum + (link.clicks || 0),
      0
    );

  const totalAdmins =
    team?.members?.filter(
      (m) =>
        m.role === "admin" ||
        m.role === "owner"
    ).length || 0;

  return (
    <div className="grid md:grid-cols-4 gap-4 mb-6">

      <div className="bg-gray-800 p-5 rounded-xl">
        <h4 className="text-gray-400">
          Members
        </h4>

        <p className="text-3xl font-bold text-blue-400">
          {totalMembers}
        </p>
      </div>

      <div className="bg-gray-800 p-5 rounded-xl">
        <h4 className="text-gray-400">
          Team Links
        </h4>

        <p className="text-3xl font-bold text-green-400">
          {totalLinks}
        </p>
      </div>

      <div className="bg-gray-800 p-5 rounded-xl">
        <h4 className="text-gray-400">
          Total Clicks
        </h4>

        <p className="text-3xl font-bold text-purple-400">
          {totalClicks}
        </p>
      </div>

      <div className="bg-gray-800 p-5 rounded-xl">
        <h4 className="text-gray-400">
          Admins
        </h4>

        <p className="text-3xl font-bold text-orange-400">
          {totalAdmins}
        </p>
      </div>

    </div>
  );
}