import { mongoConnection } from "../infra/mongodb/helper/mongo-helper";
import app from "./config/app";
const port = 3000;
mongoConnection.connect(process.env.MongoUrl).then(() => {
  app.listen(port, () => {
    console.log(`app listening on port ${port}`);
  });
});
