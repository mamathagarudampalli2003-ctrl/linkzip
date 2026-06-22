export default function CountryAnalytics({
  countryStats,
}) {

  const countries =
    Object.entries(
      countryStats || {}
    );

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
        Top Countries
      </h2>

      <div className="space-y-4">

        {countries.length === 0 ? (

          <p className="text-gray-500">
            No data available
          </p>

        ) : (

          countries.map(
            ([country, count]) => (

              <div
                key={country}
                className="
                  flex
                  justify-between
                "
              >

                <span className="text-gray-300">
                  {country}
                </span>

                <span className="text-cyan-400">
                  {count}
                </span>

              </div>

            )
          )

        )}

      </div>

    </div>
  );
}