import { app } from "./app.js";
import { config } from "dotenv";
import { connectToDatabase } from "./config/database.js";

config({
  path: "./config/config.env",
});

connectToDatabase();

app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});

