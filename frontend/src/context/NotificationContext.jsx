import {
  createContext,
  useContext,
  useState,
} from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({
  children,
}) => {
  const [notification, setNotification] =
    useState(null);

  // ================= SHOW NOTIFICATION =================

  const showNotification = (
    message,
    type = "success"
  ) => {
    setNotification({
      message,
      type,
    });

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <NotificationContext.Provider
      value={{
        notification,
        showNotification,
      }}
    >
      {children}

      {/* TOAST UI */}
      {notification && (
        <div className="fixed top-5 right-5 z-50">
          <div
            className={`px-4 py-3 rounded shadow-lg text-white ${
              notification.type === "error"
                ? "bg-red-500"
                : notification.type === "warning"
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
          >
            {notification.message}
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
};

// ================= CUSTOM HOOK =================

export const useNotification = () => {
  return useContext(NotificationContext);
};