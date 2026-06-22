import { Server } from "socket.io";

let io;

const activeUsers =
  new Map();

export const initializeSocket =
(server) => {

  io = new Server(server, {

    cors: {

      origin: [
        "http://localhost:5173",
        process.env.FRONTEND_URL,
      ],

      methods: [
        "GET",
        "POST",
      ],

      credentials: true,

    },

  });

  io.on(
    "connection",
    (socket) => {

      console.log(
        "⚡ Socket Connected:",
        socket.id
      );

      socket.on(
        "register-user",
        (userId) => {

          activeUsers.set(
            socket.id,
            userId
          );

          io.emit(
            "visitor-count",
            {
              count:
                new Set(
                  activeUsers.values()
                ).size,
            }
          );

        }
      );

      socket.on(
        "join-team",
        (teamId) => {

          socket.join(
            teamId
          );

          console.log(
            `👥 Joined Team ${teamId}`
          );

        }
      );

      socket.on(
        "leave-team",
        (teamId) => {

          socket.leave(
            teamId
          );

          console.log(
            `👋 Left Team ${teamId}`
          );

        }
      );

      socket.on(
        "disconnect",
        () => {

          activeUsers.delete(
            socket.id
          );

          io.emit(
            "visitor-count",
            {
              count:
                new Set(
                  activeUsers.values()
                ).size,
            }
          );

          console.log(
            "❌ Socket Disconnected:",
            socket.id
          );

        }
      );

    }
  );

};

export const getIO = () => {

  if (!io) {

    throw new Error(
      "Socket.IO not initialized"
    );

  }

  return io;

};

export const emitTeamNotification =
(
  teamId,
  payload
) => {

  try {

    const io = getIO();

    io.to(teamId).emit(
      "team-notification",
      payload
    );

  } catch (error) {

    console.log(
      "Socket Emit Error:",
      error.message
    );

  }

};