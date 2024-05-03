import "dotenv/config";
import * as express from "express";
import * as cors from "cors";
import { AppDataSource } from "./data-source";
import routes from "./routes/routes";
import { errorHandler } from "./helpers/response.helper";
import exceptionHelper from "./helpers/exception.helper";
import openapiHelper from "./helpers/openapi.helper";
exceptionHelper();

AppDataSource.initialize().then(async () => {
  // await openapiHelper.runDaemon(); // disable on development

  const app = express();
  app.use(express.json());
  app.use(
    cors({
      origin: ["https://seoulmate.kookm.in", "http://localhost:3000"],
    })
  );

  app.use(routes);

  app.use(errorHandler);
  app.listen(3000, () => console.log("Server started on port 3000"));
});
