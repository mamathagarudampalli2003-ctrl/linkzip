import { useEffect, useState } from "react";
import socket from "../socket/socket";

export default function useRealTimeAnalytics(userId) {
  const [liveAnalytics, setLiveAnalytics] = useState(null);

  useEffect(() => {
    if (!userId) return;

    socket.emit("join-room", userId);

    socket.on("analytics-update", (data) => {
      setLiveAnalytics(data.data);
    });

    return () => {
      socket.off("analytics-update");
    };
  }, [userId]);

  return { liveAnalytics };
}