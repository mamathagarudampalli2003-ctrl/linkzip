export default function RuleBuilder({
  aiRules,
  updateRule,
  deleteRule,
  addRule,
}) {
  return (
    <div className="bg-gray-900 p-5 rounded-xl border border-gray-800 mt-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">

        <h2 className="text-xl font-bold text-purple-400">
          🤖 AI Rules
        </h2>

        <button
          onClick={addRule}
          className="bg-blue-500 px-4 py-2 rounded"
        >
          ➕ Add Rule
        </button>

      </div>

      {/* RULES */}
      <div className="space-y-4">

        {aiRules.map((rule, index) => (
          <div
            key={index}
            className="bg-gray-800 p-4 rounded-lg grid md:grid-cols-3 gap-3"
          >

            {/* TYPE */}
            <select
              value={rule.type}
              onChange={(e) =>
                updateRule(
                  index,
                  "type",
                  e.target.value
                )
              }
              className="p-3 rounded bg-gray-700"
            >
              <option value="device">
                Device
              </option>

              <option value="country">
                Country
              </option>

              <option value="time">
                Time
              </option>
            </select>

            {/* VALUE */}
            <input
              type="text"
              value={rule.value}
              onChange={(e) =>
                updateRule(
                  index,
                  "value",
                  e.target.value
                )
              }
              placeholder="Enter value"
              className="p-3 rounded bg-gray-700"
            />

            {/* DELETE */}
            <button
              onClick={() =>
                deleteRule(index)
              }
              className="bg-red-500 rounded px-4 py-2"
            >
              Delete
            </button>

          </div>
        ))}

      </div>
    </div>
  );
}