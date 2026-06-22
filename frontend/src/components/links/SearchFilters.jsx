export default function SearchFilters({
  search,
  setSearch,
  sortType,
  setSortType,
}) {
  return (
    <div className="flex flex-col md:flex-row gap-3 mb-6">

      {/* SEARCH */}
      <input
        type="text"
        placeholder="🔍 Search links..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="p-3 rounded-lg bg-gray-800 border border-gray-700 w-full"
      />

      {/* SORT */}
      <select
        value={sortType}
        onChange={(e) =>
          setSortType(e.target.value)
        }
        className="p-3 rounded-lg bg-gray-800 border border-gray-700"
      >
        <option value="latest">
          🆕 Latest
        </option>

        <option value="clicks">
          🔥 Most Clicked
        </option>
      </select>

    </div>
  );
}