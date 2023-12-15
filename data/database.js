import mongoose from "mongoose";

export const connectDB = () => {
  const MONGO_URI = process.env.MONGO_URI;
  mongoose
    .connect(`${MONGO_URI}`, {
      dbName: "backend_db",
    })
    .then((c) => console.log(`Database Connected with ${c.connection.host}`))
    .catch((e) => console.log(e));
};
