import { EmptyState as EmptyImage } from "../../assets";

export default function EmptyState({
  title = "No Data Found",
  subtitle = "Nothing available right now",
}) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">

      <img
        src={EmptyImage}
        alt="Empty"
        className="w-64 mb-4"
      />

      <h2 className="text-xl font-bold text-white">
        {title}
      </h2>

      <p className="text-gray-400 mt-2">
        {subtitle}
      </p>

    </div>
  );
}