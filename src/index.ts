import * as net from "net";

interface Request {
  method: string;
  path: string;
  headers: { [key: string]: string };
  body: string | null;
}

interface Response {
  status: (code: number) => Response;
  statusCode: number;
  setHeaders: (headers: { [key: string]: string }) => Response;
  headers: { [key: string]: string };
  body: string;
  end: (body: string) => void;
}

function objectToHeaders(headersObj: { [key: string]: string }, body:string): string {
    let headersString = "";
    headersObj["Content-Length"] = body.length.toString();
    for (const key in headersObj) {
      if (headersObj.hasOwnProperty(key)) {
        headersString += `${key}: ${headersObj[key]}\r\n`;
      }
    }

    return headersString;
  }
  

class App {
  private server: net.Server;
  private socket: net.Socket | null = null;
  private routes: { [key: string]: Function } = {};

  constructor() {
    this.server = net.createServer((socket: net.Socket) => {
      this.socket = socket;

      socket.on("data", (data) => {
        this.handleRequest(data, socket);
      });

      socket.on("error", (err) => {
        console.error(err);
      });

      socket.on("end", () => {
        console.log("Client disconnected");
      });
    });
    console.log("Server created");
  }

  get(path: string, handler: (req: Request, res: Response) => void) {
    this.routes[path] = handler;
  }

  private handleRequest(data: Buffer, socket: net.Socket) {
    const request = data.toString();
    const [requestLine] = request.split("\r\n");
    const [method, path] = requestLine.split(" ");

    if (method === "GET" && this.routes[path]) {
      const req = this.desturctureRequest(request);
      const res = this.createResponse(socket);
      this.routes[path](req, res);
    } else {
      const response = `HTTP/1.1 404 Not Found\r\nContent-Length: 9\r\n\r\nNot Found`;
      socket.write(response);
    }
  }

  private desturctureRequest(request: string): Request {
    const [requestLine, ...headersAndBody] = request.split("\r\n");
    const [method, path] = requestLine.split(" ");
    const headers = headersAndBody
      .slice(0, -2)
      .reduce((acc: { [key: string]: string }, header: string) => {
        const [key, value] = header.split(": ");
        acc[key] = value;
        return acc;
      }, {});
    const body = headersAndBody.slice(-1)[0];

    return {
      method,
      path,
      headers,
      body,
    };
  }

  private createResponse(socket: net.Socket): Response {
    const response: Response = {
      statusCode: 200,
      status: (code: number) => {
        response.statusCode = code;
        return response;
      },
      headers: {},
      setHeaders: (headers: { [key: string]: string }) => {
        response.headers = headers;
        return response;
      },
      body: "",
      end: (body: string) => {
        const responseString = `HTTP/1.1 ${response.statusCode} OK\r\n${objectToHeaders(response.headers, body)}\r\n${body}`;
        socket.write(responseString);
      },
    };

    return response;
  }

  listen(port: number, hostname: string) {
    this.server.listen(port, hostname, () => {
      console.log(`Server listening on ${hostname}:${port}`);
    });
  }
}



// -------------------TESTING! Not to be used in production.------------------- //
const server = new App();

server.get("/", (_, res) => {
  res.status(201).setHeaders({"Content-Length": "12"}).end("Hello World!");
});
server.get("/ks", (_, res) => {
  res.end("Hello Kaushik!");
});

server.listen(3000, "localhost");
