import {
  useEffect,
  useState,
} from "react";

import {
  addDomain,
  getDomains,
  verifyDomain,
  deleteDomain,
} from "../../api/domainApi";

export default function DomainManager() {

  const [domain, setDomain] =
    useState("");

  const [domains, setDomains] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const token =
    localStorage.getItem("token");

  const loadDomains =
    async () => {

      try {

        const data =
          await getDomains(token);

        setDomains(
          data.domains || []
        );

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {

    loadDomains();

  }, []);

  const handleAdd =
    async () => {

      if (!domain) return;

      try {

        setLoading(true);

        await addDomain(
          domain,
          token
        );

        setDomain("");

        await loadDomains();

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  const handleVerify =
    async (
      domainName,
      verificationToken
    ) => {

      try {

        await verifyDomain(
          domainName,
          verificationToken,
          token
        );

        loadDomains();

      } catch (error) {

        console.log(error);
      }
    };

  const handleDelete =
    async (domainName) => {

      const confirmDelete =
        window.confirm(
          "Delete this domain?"
        );

      if (!confirmDelete) return;

      try {

        await deleteDomain(
          domainName,
          token
        );

        loadDomains();

      } catch (error) {

        console.log(error);
      }
    };

  return (

    <div
      className="
        bg-gray-900
        border
        border-gray-800
        rounded-3xl
        p-6
      "
    >

      <h2
        className="
          text-2xl
          font-bold
          mb-6
        "
      >
        🌐 Custom Domains
      </h2>

      {/* Add Domain */}

      <div
        className="
          flex
          gap-3
          mb-6
        "
      >

        <input
          value={domain}
          onChange={(e) =>
            setDomain(
              e.target.value
            )
          }
          placeholder="go.yourdomain.com"
          className="
            flex-1
            bg-gray-800
            p-3
            rounded-xl
            outline-none
          "
        />

        <button
          onClick={
            handleAdd
          }
          disabled={loading}
          className="
            bg-purple-600
            hover:bg-purple-700
            px-6
            rounded-xl
            font-bold
          "
        >
          {
            loading
              ? "Adding..."
              : "Add"
          }
        </button>

      </div>

      {/* Empty State */}

      {domains.length === 0 && (

        <div
          className="
            text-center
            py-10
            text-gray-400
          "
        >
          No domains added yet.
        </div>
      )}

      {/* Domains List */}

      <div
        className="
          space-y-4
        "
      >

        {domains.map(
          (item) => (

            <div
              key={item.domain}
              className="
                bg-gray-800
                rounded-2xl
                p-4
              "
            >

              <div
                className="
                  flex
                  justify-between
                  items-center
                "
              >

                <div>

                  <h3
                    className="
                      font-semibold
                      text-lg
                    "
                  >
                    {item.domain}
                  </h3>

                  <p
                    className="
                      text-xs
                      text-gray-400
                      mt-1
                      break-all
                    "
                  >
                    Token:
                    {" "}
                    {
                      item.verificationToken
                    }
                  </p>

                </div>

                <div>

                  {item.verified ? (

                    <span
                      className="
                        bg-green-500/20
                        text-green-400
                        px-3
                        py-1
                        rounded-full
                        text-sm
                      "
                    >
                      Verified
                    </span>

                  ) : (

                    <span
                      className="
                        bg-yellow-500/20
                        text-yellow-400
                        px-3
                        py-1
                        rounded-full
                        text-sm
                      "
                    >
                      Pending
                    </span>

                  )}

                </div>

              </div>

              <div
                className="
                  flex
                  gap-3
                  mt-4
                "
              >

                {!item.verified && (

                  <button
                    onClick={() =>
                      handleVerify(
                        item.domain,
                        item.verificationToken
                      )
                    }
                    className="
                      bg-green-600
                      hover:bg-green-700
                      px-4
                      py-2
                      rounded-xl
                    "
                  >
                    Verify
                  </button>

                )}

                <button
                  onClick={() =>
                    handleDelete(
                      item.domain
                    )
                  }
                  className="
                    bg-red-600
                    hover:bg-red-700
                    px-4
                    py-2
                    rounded-xl
                  "
                >
                  Delete
                </button>

              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
}