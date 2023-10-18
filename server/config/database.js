import { mongoose } from "mongoose";

export const connectToDatabase = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected: " + connection.host);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
