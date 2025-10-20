import mongoose from "mongoose";

export default async function connectToDB() {
  try {
    const DB_URI = process.env.DB_URI || "mongodb://localhost:27017/mysampledb";

    mongoose.connection.on("connecting", () => {
      console.log("connecting to database");
    });

    mongoose.connection.on("connected", () => {
      console.log("connected to database");
    });

    mongoose.connection.on("disconnected", () => {
      console.log("database connection disconnected");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("database reconnected");
    });

    mongoose.connection.on("close", () => {
      console.log("database connection close");
    });

    mongoose.connection.on("error", (e) => {
      console.log("Database encountered an error");
      console.error(e);
    });

    await mongoose.connect(DB_URI);
  } catch (e) {
    console.log("Error Occured while connecting to DB");
    process.exit(1);
  }
}
