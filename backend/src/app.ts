import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./app/errors/globalErrorHandler";
import notFound from "./app/middlewares/notFound";

const app = express();

app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.use(notFound);

app.use(globalErrorHandler);

app.get("/", (_, res) => {
  res.send({
    success: true,
    message: "Local Guide Platform API Running 🚀",
  });
});

export default app;