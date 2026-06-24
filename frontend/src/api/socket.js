import { io } from "socket.io-client";

const socket = io(
  "https://linkzip-0w52.onrender.com",
  {
    autoConnect: true,
  }
);

export default socket;