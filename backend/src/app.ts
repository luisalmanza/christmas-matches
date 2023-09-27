import "dotenv/config";
import express from "express";
import cors from "cors";
import dbConnect from "./config/mongo";
import routes from "./routes";
import EventEmitter from 'events';
import swaggerUI from "swagger-ui-express";
import openApiConfiguration from "./docs/swagger";

const NODE_ENV = process.env.NODE_ENV || "development";

const myEmitter = new EventEmitter();
myEmitter.setMaxListeners(15);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("storage"));

const port: string | number = process.env.PORT || 3000;

app.use("/documentation", swaggerUI.serve, swaggerUI.setup(openApiConfiguration));

app.use("/api", routes);

if (NODE_ENV !== "test") {
    app.listen(port, () => {
        console.log(`Ready in the port ${port}`);
    });

    dbConnect().then(() => {
        console.log("Successful connection");
    });
}

export default app;