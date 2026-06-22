import { useNavigate } from "react-router-dom";
import { useState } from "react";

import LinksTable from "../../components/links/LinksTable";

export default function ShortenerSection({
  teamId,
  setTeamId,
  teams,

  url,
  setUrl,

  customId,
  setCustomId,

  mobileUrl,
  setMobileUrl,

  desktopUrl,
  setDesktopUrl,

  morningUrl,
  setMorningUrl,

  eveningUrl,
  setEveningUrl,

  indiaUrl,
  setIndiaUrl,

  usUrl,
  setUsUrl,

  expiry,
  setExpiry,

  aiRules,
  setAiRules,

  urls,
  loading,

  search,
  setSearch,

  sortType,
  setSortType,

  createShortUrl,
  fetchUrls,
  deleteUrl,
  toggleUrlStatus,
  customDomain,
  setCustomDomain,
  password,
  setPassword,
  variantAUrl,
  variantBUrl,
  analytics,
}) {

  const navigate = useNavigate();

  // ================= RULE STATES =================

  const [ruleType, setRuleType] =
    useState("device");

  const [ruleValue, setRuleValue] =
    useState("");

  const [ruleUrl, setRuleUrl] =
    useState("");

  // ================= ADD RULE =================

  const handleAddRule = () => {

    if (
      !ruleType ||
      !ruleValue ||
      !ruleUrl
    ) {
      alert("Fill all rule fields");
      return;
    }

    const newRule = {
      type: ruleType,
      value: ruleValue.toLowerCase(),
      url: ruleUrl,
    };

    setAiRules([
      ...aiRules,
      newRule,
    ]);

    setRuleValue("");
    setRuleUrl("");
  };

  // ================= REMOVE RULE =================

  const removeRule = (index) => {

    const updated =
      aiRules.filter(
        (_, i) => i !== index
      );

    setAiRules(updated);
  };

  // ================= SHORTEN =================

  const handleShorten =
    async () => {

      if (!url) {
        alert("Please enter URL");
        return;
      }

      try {

        await createShortUrl({
          originalUrl: url,
          customId,
          customDomain,
          mobileUrl,
          desktopUrl,
          morningUrl,
          eveningUrl,
          password,

          countryUrls: {
            IN: indiaUrl,
            US: usUrl,
          },

          expiresAt: expiry,

          rules: aiRules,

          teamId,
        });

        // RESET

        setUrl("");
        setCustomId("");
        setCustomDomain("");
        setMobileUrl("");
        setDesktopUrl("");
        setMorningUrl("");
        setEveningUrl("");
        setIndiaUrl("");
        setUsUrl("");
        setExpiry("");
        setAiRules([]);
        setVariantAUrl("");
        setVariantBUrl("");

        fetchUrls();

        alert(
          "Short URL Created Successfully 🚀"
        );

      } catch (error) {

        console.error(error);

        alert(
          "Failed to create short URL"
        );
      }
    };

  // ================= COPY =================

  const handleCopy = async (
    shortId
  ) => {

    const shortUrl = shortId;

    try {

      await navigator.clipboard.writeText(
        shortUrl
      );

      alert("Copied Successfully ✅");

    } catch (error) {

      alert("Copy failed");

    }
  };

  // ================= DELETE =================

  const handleDelete =
    async (id) => {

      try {

        await deleteUrl(id);

        fetchUrls();

      } catch (error) {

        console.error(error);

      }
    };

  // ================= TOGGLE =================

  const handleToggleStatus =
    async (id) => {

      try {

        await toggleUrlStatus(id);

        fetchUrls();

      } catch (error) {

        console.error(error);

      }
    };

  // ================= FILTER =================

  const filteredUrls = urls
    ?.filter(
      (item) =>
        item.originalUrl
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        item.shortId
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    )
    ?.sort((a, b) => {

      if (sortType === "clicks") {
        return (
          (b.clicks || 0) -
          (a.clicks || 0)
        );
      }

      return (
        new Date(b.createdAt) -
        new Date(a.createdAt)
      );
    });

  return (
    <div className="space-y-6">

      {/* SEARCH */}

      <div className="flex flex-col md:flex-row gap-4">

        <input
          type="text"
          placeholder="Search links..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
            flex-1
            p-3
            rounded-xl
            bg-gray-800
            border
            border-gray-700
            text-white
          "
        />

        <select
          value={sortType}
          onChange={(e) =>
            setSortType(e.target.value)
          }
          className="
            p-3
            rounded-xl
            bg-gray-800
            border
            border-gray-700
          "
        >
          <option value="latest">
            Latest
          </option>

          <option value="clicks">
            Most Clicks
          </option>

        </select>

      </div>

      <div>
  <label
    className="
      text-sm
      text-gray-400
    "
  >
    Custom Domain
  </label>

  <input
    type="text"
    placeholder="go.mybrand.com"
    value={customDomain}
    onChange={(e) =>
      setCustomDomain(
        e.target.value
      )
    }
    className="
      w-full
      p-3
      rounded-xl
      bg-[#111827]
      border
      border-gray-700
      text-white
    "
  />
</div>

      {/* FORM */}

      <div className="
        grid
        md:grid-cols-2
        gap-4
        bg-gray-900
        p-6
        rounded-2xl
        border
        border-gray-800
      ">

        {/* TEAM */}

        <div className="md:col-span-2">

          <select
            value={teamId}
            onChange={(e) =>
              setTeamId(e.target.value)
            }
            className="
              w-full
              p-3
              rounded-xl
              bg-gray-800
              border
              border-gray-700
            "
          >

            <option value="">
              No Team (Personal)
            </option>

            {Array.isArray(teams) &&
 teams.map(team => (
              <option
                key={team._id}
                value={team._id}
              >
                {team.name}
              </option>
            ))}

          </select>

        </div>

        <input
          value={url}
          onChange={(e) =>
            setUrl(e.target.value)
          }
          placeholder="Long URL"
          className="p-3 rounded-xl bg-gray-800 border border-gray-700"
        />

        <input
          value={customId}
          onChange={(e) =>
            setCustomId(e.target.value)
          }
          placeholder="Custom ID"
          className="p-3 rounded-xl bg-gray-800 border border-gray-700"
        />

        <input
          value={mobileUrl}
          onChange={(e) =>
            setMobileUrl(e.target.value)
          }
          placeholder="Mobile URL"
          className="p-3 rounded-xl bg-gray-800 border border-gray-700"
        />

        <input
          value={desktopUrl}
          onChange={(e) =>
            setDesktopUrl(e.target.value)
          }
          placeholder="Desktop URL"
          className="p-3 rounded-xl bg-gray-800 border border-gray-700"
        />

        <input
          value={morningUrl}
          onChange={(e) =>
            setMorningUrl(e.target.value)
          }
          placeholder="Morning URL"
          className="p-3 rounded-xl bg-gray-800 border border-gray-700"
        />

        <input
          value={eveningUrl}
          onChange={(e) =>
            setEveningUrl(e.target.value)
          }
          placeholder="Evening URL"
          className="p-3 rounded-xl bg-gray-800 border border-gray-700"
        />

        <input
          value={indiaUrl}
          onChange={(e) =>
            setIndiaUrl(e.target.value)
          }
          placeholder="India URL"
          className="p-3 rounded-xl bg-gray-800 border border-gray-700"
        />

        <input
          value={usUrl}
          onChange={(e) =>
            setUsUrl(e.target.value)
          }
          placeholder="US URL"
          className="p-3 rounded-xl bg-gray-800 border border-gray-700"
        />

        <input
          type="datetime-local"
          value={expiry}
          onChange={(e) =>
            setExpiry(e.target.value)
          }
          className="p-3 rounded-xl bg-gray-800 border border-gray-700"
        />

        <input
  value={password}
  onChange={(e) =>
    setPassword(e.target.value)
  }
  placeholder="Password Protect Link"
  className="
    p-3
    rounded-xl
    bg-gray-800
    border
    border-gray-700
  "
/>

<div className="bg-gray-900 p-6 rounded-3xl border border-gray-800 mt-6">

  <h2 className="text-xl font-bold mb-4">
    🔥 A/B Testing Results
  </h2>

  {analytics?.abTesting?.map((item) => (
    <div
      key={item.shortId}
      className="flex justify-between py-3"
    >
      <span>{item.shortId}</span>

      <span className="text-green-400">
        A: {item.variantA} | B: {item.variantB}
      </span>

      <span className="text-purple-400 font-bold">
        Winner: {item.winner}
      </span>
    </div>
  ))}

</div>

      </div>

      {/* RULE ENGINE */}

      <div className="
        bg-gray-900
        p-6
        rounded-2xl
        border
        border-gray-800
        space-y-4
      ">

        <h2 className="text-xl font-bold">
          Add Smart Rules
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          <select
            value={ruleType}
            onChange={(e) =>
              setRuleType(e.target.value)
            }
            className="p-3 rounded-xl bg-gray-800 border border-gray-700"
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

          <input
            value={ruleValue}
            onChange={(e) =>
              setRuleValue(e.target.value)
            }
            placeholder="Rule Value"
            className="p-3 rounded-xl bg-gray-800 border border-gray-700"
          />

          <input
            value={ruleUrl}
            onChange={(e) =>
              setRuleUrl(e.target.value)
            }
            placeholder="Redirect URL"
            className="p-3 rounded-xl bg-gray-800 border border-gray-700"
          />

        </div>

        <button
          onClick={handleAddRule}
          className="
            bg-purple-600
            hover:bg-purple-700
            px-5
            py-3
            rounded-xl
            font-semibold
          "
        >
          Add Rule
        </button>

        {/* RULE LIST */}

        <div className="space-y-3">

          {aiRules.map(
            (rule, index) => (

              <div
                key={index}
                className="
                  bg-gray-800
                  p-4
                  rounded-xl
                  flex
                  justify-between
                  items-center
                "
              >

                <div>
                  <p>
                    {rule.type} →
                    {" "}
                    {rule.value}
                  </p>

                  <p className="text-sm text-gray-400">
                    {rule.url}
                  </p>
                </div>

                <button
                  onClick={() =>
                    removeRule(index)
                  }
                  className="
                    bg-red-500
                    px-3
                    py-1
                    rounded-lg
                  "
                >
                  Remove
                </button>

              </div>
            )
          )}

        </div>

      </div>

      {/* BUTTON */}

      <button
        onClick={handleShorten}
        disabled={loading}
        className="
          w-full
          bg-blue-600
          hover:bg-blue-700
          transition
          p-4
          rounded-xl
          font-bold
        "
      >
        {loading
          ? "Creating..."
          : "Shorten URL 🚀"}
      </button>

      {/* TABLE */}

      <LinksTable
        filteredUrls={filteredUrls}
        handleCopy={handleCopy}
        handleDelete={handleDelete}
        handleToggleStatus={
          handleToggleStatus
        }
        navigate={navigate}
      />

    </div>
  );
}