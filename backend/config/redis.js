import { createClient } from "redis";

const redisClient =
  createClient({

    url:
      process.env.REDIS_URL ||
      "redis://localhost:6379",

    socket: {

      reconnectStrategy:
        (retries) => {

          if (retries > 10) {
            return new Error(
              "Redis reconnect failed"
            );
          }

          return Math.min(
            retries * 500,
            5000
          );
        },

    },

  });

// ================= EVENTS =================

redisClient.on(
  "connect",
  () => {

    console.log(
      "Redis Connecting..."
    );

  }
);

redisClient.on(
  "ready",
  () => {

    console.log(
      "Redis Ready ✅"
    );

  }
);

redisClient.on(
  "reconnecting",
  () => {

    console.log(
      "Redis Reconnecting..."
    );

  }
);

redisClient.on(
  "error",
  (err) => {

    console.log(
      "Redis Error ❌",
      err.message
    );

  }
);

// ================= CONNECT =================

(async () => {

  try {

    await redisClient.connect();

    console.log(
      "Redis Connected ✅"
    );

  } catch (error) {

    console.log(
      "Redis Connection Failed ❌",
      error.message
    );

  }

})();

// ================= SHUTDOWN =================

process.on(
  "SIGINT",
  async () => {

    try {

      await redisClient.quit();

      console.log(
        "Redis Connection Closed"
      );

    } catch (error) {

      console.log(
        "Redis Shutdown Error:",
        error.message
      );

    }

  }
);

export default redisClient;