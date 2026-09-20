import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error(
    " Please define the MONGO_URI environment variable inside . env.local",
  );
}

let cachedConnection = null;

export async function connectToDatabase() {
  if (cachedConnection) {
    return cachedConnection;
  }

  const conn = await mongoose.connect(MONGO_URI);
  cachedConnection = conn;

  return conn;
}
