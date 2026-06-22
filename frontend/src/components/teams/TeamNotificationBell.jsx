import { useState } from "react";

export default function TeamNotificationBell({
  notifications = [],
  clearNotifications,
}) {

  const [open, setOpen] =
    useState(false);

  return (

    <div className="relative">

      <button
        onClick={() =>
          setOpen(!open)
        }
        className="
          relative
          bg-gray-800
          px-4
          py-2
          rounded-lg
        "
      >
        🔔

        {notifications.length > 0 && (

          <span
            className="
              absolute
              -top-2
              -right-2
              bg-red-500
              text-xs
              px-2
              rounded-full
            "
          >
            {notifications.length}
          </span>

        )}

      </button>

      {open && (

        <div
          className="
            absolute
            right-0
            mt-2
            w-80
            bg-gray-900
            border
            border-gray-700
            rounded-xl
            shadow-xl
            z-50
          "
        >

          <div className="p-4">

            <div className="flex justify-between items-center mb-3">

  <h3
    className="
      text-lg
      font-bold
      text-blue-400
    "
  >
    Notifications
  </h3>

  {notifications.length > 0 && (

    <button
      onClick={clearNotifications}
      className="
        text-xs
        bg-red-500
        px-2
        py-1
        rounded
      "
    >
      Clear
    </button>

  )}

</div>

            {notifications.length === 0 ? (

              <p className="text-gray-400">
                No Notifications
              </p>

            ) : (

              notifications.map(
                (notification) => (

                  <div
                    key={notification.id}
                    className="
                      bg-gray-800
                      p-3
                      rounded-lg
                      mb-2
                    "
                  >

                    <p>
                      {notification.message}
                    </p>

                  </div>

                )
              )

            )}

          </div>

        </div>

      )}

    </div>

  );

}