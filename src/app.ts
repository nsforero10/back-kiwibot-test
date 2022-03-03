import express from "express";
import config from "config";
import log from "./logger";
import cors from "cors";

import routes from "./routes";
import "dotenv/config";

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, host, async () => {
  log.info(`Server listing at http://${host}:${port}`);
  routes(app);
});
