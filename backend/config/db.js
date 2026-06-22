import mongoose from "mongoose";

const connectDB = async () => {
  try {

    if (!process.env.MONGO_URI) {
      throw new Error(
        "MONGO_URI missing in .env"
      );
    }

    mongoose.set(
      "autoIndex",
      process.env.NODE_ENV !== "production"
    );

    await mongoose.connect(
      process.env.MONGO_URI,
      {
        maxPoolSize: 20,

        minPoolSize: 5,

        serverSelectionTimeoutMS: 5000,

        socketTimeoutMS: 45000,
      }
    );

    console.log(
      "MongoDB Connected ✅"
    );

  } catch (error) {

    console.log(
      "MongoDB Error ❌",
      error.message
    );

    process.exit(1);

  }
};

// ================= CONNECTION EVENTS =================

mongoose.connection.on(
  "connected",
  () => {
    console.log(
      "MongoDB Ready ✅"
    );
  }
);

mongoose.connection.on(
  "disconnected",
  () => {
    console.log(
      "MongoDB Disconnected ❌"
    );
  }
);

mongoose.connection.on(
  "reconnected",
  () => {
    console.log(
      "MongoDB Reconnected ✅"
    );
  }
);

mongoose.connection.on(
  "error",
  (err) => {
    console.log(
      "MongoDB Connection Error ❌",
      err
    );
  }
);

// ================= GRACEFUL SHUTDOWN =================

process.on(
  "SIGINT",
  async () => {

    await mongoose.connection.close();

    console.log(
      "MongoDB Connection Closed"
    );

    process.exit(0);

  }
);

export default connectDB;