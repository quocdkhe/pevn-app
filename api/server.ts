import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route";
import cookieParser from "cookie-parser";
dotenv.config();
const port = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.listen(port, () =>
  console.log(`
🚀 Server ready at: http://localhost:8000
⭐️ See sample requests: https://github.com/prisma/prisma-examples/blob/latest/orm/express/README.md#using-the-rest-api`)
);
