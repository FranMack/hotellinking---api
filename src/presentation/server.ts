import express from "express";
import morgan from "morgan";
import { Router } from "express";
import fileUpload from "express-fileupload"
import cors from "cors";




interface ServerOptions {
  port: number;
  routes: Router;
}

export class Server {
  public readonly app = express();
  private serverListener?: any;
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: ServerOptions) {
    const { port, routes } = options;

    this.port = port;
    this.routes = routes;
  }

  async start() {
    //* Middlewares
    this.app.use(express.json()); // raw
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded
    this.app.use(morgan("tiny"));
    this.app.use(
      cors({
        origin: "http://localhost:4000", // URL del frontend
        credentials: true, // Habilita el envio de cookies
      })
    );
    this.app.use(fileUpload({
      limits: { fileSize: 50 * 1024 * 1024 },
    }));

    //* Routes
    this.app.use("/api",this.routes);

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  public close() {
    this.serverListener?.close();
  }
}
