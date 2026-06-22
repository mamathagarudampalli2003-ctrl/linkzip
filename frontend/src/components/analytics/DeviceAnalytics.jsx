export default function DeviceAnalytics({
  deviceStats,
}) {

  const mobile =
    deviceStats?.mobile || 0;

  const desktop =
    deviceStats?.desktop || 0;

  const tablet =
    deviceStats?.tablet || 0;

  const total =
    mobile +
    desktop +
    tablet;

  const mobilePercent =
    total
      ? Math.round(
          (mobile / total) * 100
        )
      : 0;

  const desktopPercent =
    total
      ? Math.round(
          (desktop / total) * 100
        )
      : 0;

  const tabletPercent =
    total
      ? Math.round(
          (tablet / total) * 100
        )
      : 0;

  const devices = [
    {
      name: "Mobile",
      value: mobilePercent,
    },
    {
      name: "Desktop",
      value: desktopPercent,
    },
    {
      name: "Tablet",
      value: tabletPercent,
    },
  ];

  return (

    <div className="
      bg-[#111827]
      border
      border-white/10
      rounded-3xl
      p-6
    ">

      <h2 className="
        text-white
        text-xl
        font-bold
        mb-6
      ">
        Device Analytics
      </h2>

      <div className="space-y-5">

        {devices.map((item) => (

          <div key={item.name}>

            <div className="
              flex
              justify-between
              mb-2
            ">

              <span className="text-gray-300">
                {item.name}
              </span>

              <span className="text-cyan-400">
                {item.value}%
              </span>

            </div>

            <div className="
              h-3
              rounded-full
              bg-gray-700
            ">

              <div
                className="
                  h-3
                  rounded-full
                  bg-cyan-500
                "
                style={{
                  width:
                    `${item.value}%`,
                }}
              />

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}