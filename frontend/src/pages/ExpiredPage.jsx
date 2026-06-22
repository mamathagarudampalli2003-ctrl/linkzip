export default function ExpiredPage() {
  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-black
        text-white
      "
    >
      <div className="text-center">

        <h1 className="text-6xl font-bold text-yellow-400">
          Link Expired
        </h1>

        <p className="mt-4 text-gray-400">
          This smart link has expired.
        </p>

      </div>
    </div>
  );
}