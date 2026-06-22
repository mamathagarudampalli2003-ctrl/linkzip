import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-6">

      {/* 404 */}
      <h1 className="text-8xl font-bold text-blue-500">
        404
      </h1>

      {/* MESSAGE */}
      <p className="text-2xl mt-4 font-semibold">
        Page Not Found
      </p>

      <p className="text-gray-400 mt-2 text-center max-w-md">
        The page you are looking for does not exist
        or has been moved.
      </p>

      {/* BUTTON */}
      <Link
        to="/dashboard"
        className="mt-8 bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl transition"
      >
        Go Back Dashboard
      </Link>

    </div>
  );
}