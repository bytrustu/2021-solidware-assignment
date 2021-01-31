import express, { Request, Response, NextFunction } from "express";
import path from "path";
import morgan from "morgan";
import hpp from "hpp";
import helmet from "helmet";
import cors from "cors";
import config from "./config";
import { errorHandler, logHandler } from "./modules/handler";
import userRouter from "./routes/userRouter";
import teamRouter from "./routes/teamRouter";

const app = express();
const { PORT } = config;

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
  app.use(hpp());
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(
    cors({
      origin: ["http://localhost:3005", "http://133.186.159.157:3005"],
      credentials: true,
    })
  );
} else {
  app.use(morgan("dev"));
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
}

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next();
});

app.set("etag", false);
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/user", userRouter);
app.use("/api/team", teamRouter);

app.use(logHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🔥 Running on Port ${PORT}`);
});

export default app;
