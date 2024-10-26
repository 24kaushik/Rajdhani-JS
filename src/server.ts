import * as net from "net";
import { Router } from "./router/router";
import { requestParser, myRequest } from "./request/request";
import { createResponse, myResponse } from "./response/response";

class App {
  private server: net.Server;
  private socket: net.Socket | null = null;
  private router: Router = new Router();

  constructor() {
    this.server = net.createServer((socket: net.Socket) => {
      this.socket = socket;

      socket.on("data", (data) => {
        this.handleRequest(data, socket);
      });

      socket.on("error", (err) => {
        throw err;
      });

      socket.on("end", () => {
      });
    });
  }

  get(path: string, handler: (req: myResponse, res: myResponse) => any) {
    this.router.get(path, handler);
  }

  post(path: string, handler: (req: myResponse, res: myResponse) => any) {
    this.router.post(path, handler);
  }

  private handleRequest(data: Buffer, socket: net.Socket) {
    const request = data.toString();
    const [requestLine] = request.split("\r\n");
    const [method, path] = requestLine.split(" ");

    if (method === "GET" && this.router.findRoute(path)?.GET !== undefined) {
      const req = requestParser(request);
      const res = createResponse(socket);
      const func = this.router.findRoute(path).GET;
      if (func !== undefined) {
        func(req, res);
      }
    } else if (
      method === "POST" &&
      this.router.findRoute(path)?.GET !== undefined
    ) {
      const req = requestParser(request);
      const res = createResponse(socket);
      const func = this.router.findRoute(path).POST;
      if (func !== undefined) {
        func(req, res);
      }
    } else {
      const response = `HTTP/1.1 404 Not Found\r\nContent-Length: 9\r\n\r\nNot Found`;
      socket.write(response);
    }
  }

  listen(port: number, hostname: string, callback: (() => void) | undefined) {
    this.server.listen(port, hostname, callback ? callback : () => {});
  }
}

export default App;
