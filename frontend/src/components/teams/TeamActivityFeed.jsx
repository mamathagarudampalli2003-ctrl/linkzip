import { useMemo } from "react";

export default function TeamActivityFeed({
teamLinks = [],

activities = [],

team = null,
}) {

const mergedActivities = useMemo(() => {

const backendActivities =
  activities?.map(
    (activity) => ({
      type: "activity",
      title: activity.action,
      description:
        activity.user || "",
      time:
        activity.createdAt,
    })
  ) || [];

const linkActivities =
  teamLinks.map((link) => ({
    type: "link_created",
    title:
      `Link created: ${link.shortId}`,
    description:
      link.originalUrl,
    time:
      link.createdAt,
  }));

return [
  ...backendActivities,
  ...linkActivities,
].sort(
  (a, b) =>
    new Date(b.time || 0) -
    new Date(a.time || 0)
);

}, [teamLinks, team]);

const getIcon = (type) => {

switch (type) {

  case "activity":
    return "⚡";

  case "link_created":
    return "🔗";

  case "member_joined":
    return "👤";

  default:
    return "📌";
}

};

const formatTime = (date) => {

if (!date)
  return "Unknown";

return new Date(date)
  .toLocaleString();

};

return (

<div
  className="
    bg-gray-800
    rounded-xl
    p-5
    border
    border-gray-700
  "
>

  <h3
    className="
      text-lg
      font-bold
      text-purple-400
      mb-4
    "
  >
    ⚡ Team Activity Feed
  </h3>

  {mergedActivities.length === 0 ? (

    <div
      className="
        text-gray-400
        text-center
        py-8
      "
    >
      No activity yet
    </div>

  ) : (

    <div
      className="
        space-y-3
        max-h-96
        overflow-y-auto
      "
    >

      {mergedActivities.map(
        (activity, index) => (

          <div
            key={index}
            className="
              flex
              gap-3
              items-start
              bg-gray-900
              p-3
              rounded-lg
            "
          >

            <div
              className="
                text-xl
                mt-1
              "
            >
              {getIcon(
                activity.type
              )}
            </div>

            <div className="flex-1">

              <p
                className="
                  font-medium
                  text-white
                "
              >
                {activity.title}
              </p>

              {activity.description && (

                <p
                  className="
                    text-sm
                    text-gray-400
                    break-all
                  "
                >
                  {activity.description}
                </p>

              )}

              <p
                className="
                  text-xs
                  text-gray-500
                  mt-1
                "
              >
                {formatTime(
                  activity.time
                )}

              </p>
<TeamActivityFeed
  teamLinks={teamLinks}
  activities={activities}
/>

            </div>

          </div>

        )
      )}

    </div>

  )}

</div>

);

}
