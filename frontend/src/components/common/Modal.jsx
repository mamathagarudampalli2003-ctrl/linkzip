export default function Modal({
  open,
  onClose,
  title,
  children,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

      <div className="bg-gray-900 p-6 rounded-2xl w-full max-w-lg border border-gray-800">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">

          <h2 className="text-xl font-bold">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-red-400 text-xl"
          >
            ✕
          </button>

        </div>

        {/* CONTENT */}
        <div>
          {children}
        </div>

      </div>
    </div>
  );
}