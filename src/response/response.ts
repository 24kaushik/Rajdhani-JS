import { Socket } from "net";
import { objectToHeaders } from "../utils/headerParser";

interface myResponse {
  status: (code: number) => myResponse;
  statusCode: number;
  setHeaders: (headers: { [key: string]: string }) => myResponse;
  headers: { [key: string]: string };
  body: string;
  end: (body: string) => void;
}

const createResponse = (socket: Socket): myResponse => {
  const response: myResponse = {
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
      const responseString = `HTTP/1.1 ${
        response.statusCode
      } OK\r\n${objectToHeaders(response.headers, body)}\r\n${body}`;
      socket.write(responseString);
    },
  };

  return response;
};

export { createResponse, myResponse };
