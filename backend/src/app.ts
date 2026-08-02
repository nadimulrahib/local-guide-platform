import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import routes from "./app/routes";
import notFound from "./app/middlewares/notFound";
import globalErrorHandler from "./app/errors/globalErrorHandler";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Root Route
app.get("/", (_, res) => {
  res.send({
    success: true,
    message: "Local Guide Platform API Running 🚀",
  });
});

app.use("/api/v1", routes);

app.use(notFound);

app.use(globalErrorHandler);

export default app;