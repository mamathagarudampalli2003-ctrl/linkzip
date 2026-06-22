import { useState } from "react";

export default function TeamModal({ onClose, onCreate }) {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {

    if (!name.trim()) {
      alert("Team name is required");
      return;
    }

    try {
      setLoading(true);

      const newTeam = {
        name: name.trim(),
        description: description.trim(),
      };

      await onCreate(newTeam);

      setName("");
      setDescription("");
      onClose();

    } catch (error) {
      console.error("Create team error:", error);
      alert("Failed to create team");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="
      fixed inset-0
      bg-black/70
      backdrop-blur-md
      flex items-center justify-center
      z-50
    ">

      <div className="
        w-full max-w-2xl
        bg-[#0f172a]
        border border-white/10
        rounded-3xl
        p-8
        shadow-2xl
      ">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">

          <div>
            <h2 className="text-3xl font-bold text-white">
              Create New Team
            </h2>

            <p className="text-gray-400 mt-2">
              Build a collaboration workspace for your team
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ✕
          </button>

        </div>

        {/* TEAM NAME */}
        <div className="mb-5">

          <label className="text-gray-400 text-sm">
            Team Name
          </label>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Development Team"
            className="
              w-full mt-2 p-4
              rounded-2xl
              bg-[#111827]
              border border-white/10
              text-white
              outline-none
              focus:border-blue-500
            "
          />
        </div>

        {/* DESCRIPTION */}
        <div className="mb-8">

          <label className="text-gray-400 text-sm">
            Description (optional)
          </label>

          <textarea
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What does this team do?"
            className="
              w-full mt-2 p-4
              rounded-2xl
              bg-[#111827]
              border border-white/10
              text-white
              outline-none
              focus:border-blue-500
            "
          />
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-4">

          <button
            onClick={onClose}
            className="
              flex-1 p-4
              rounded-2xl
              bg-gray-700
              hover:bg-gray-600
              text-white font-semibold
            "
          >
            Cancel
          </button>

          <button
            onClick={handleCreate}
            disabled={loading}
            className="
              flex-1 p-4
              rounded-2xl
              bg-gradient-to-r from-blue-500 to-purple-600
              hover:opacity-90
              text-white font-semibold
              shadow-lg
            "
          >
            {loading ? "Creating..." : "Create Team 🚀"}
          </button>

        </div>

      </div>

    </div>
  );
}