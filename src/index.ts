import dotenv from "dotenv";
import express from "express";
import fileUpload from "express-fileupload";
import http from "http";
import path from "path";
import { Server } from "socket.io";
import { ControllerRegistry } from "./Registry/ControllerRegistry";
import SocketRegistry from "./Registry/SocketRegistry";
const bodyParser = require("body-parser");

export const app = express();

const main = async () => {
  dotenv.config();

  //test

  // app.use(bodyParser.json({ limit: "100mb" }));

  app.use(express.json({ limit: "100mb" }));
  // app.use(jsonErrorHandler);

  // app.use(FileUpload());

  app.use(
    fileUpload({
      createParentPath: true, // Automatically create directories if they don’t exist
    })
  );

  app.use(express.static("./"));

  const server = http.createServer(app);
  const socketServer = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  ControllerRegistry(app);
  SocketRegistry(socketServer);

  app.use("/static", express.static(path.join(__dirname, "../client/build//static")));

  app.get("*", function (req, res) {
    res.sendFile("index.html", {
      root: path.join(__dirname, "../client/build/"),
    });
  });

  // const PORT = process.env.PORT || 4050;
  const PORT = 4050;
  // const PORT = 8080;
  server.listen(PORT, () => console.log(`28/04/2024 04:17pm - listening to ports ${PORT}`));
};

//COPIED FROM LAPTOP

main();
