<img src="./logo.png" align="center">
<hr>

# RajdhaniJS

RajdhaniJS is a basic Express.js clone with features to handle basic GET and POST requests. It supports accessing headers and body in both request and response, and includes TypeScript support.

## Features

- Handle basic GET and POST requests
- Access headers and body in both request and response
- TypeScript support

## Instalation
To install RajdhaniJS, run:

```bash
npm install rajdhani-js
```

## Usage
Here is a basic example of how to use RajdhaniJS:

```js
import Rajdhani from "rajdhani-js";

const app = Rajdhani();

app.get("/", (req, res) => {
  res.end("Hello World!");
});

app.listen(8000, "localhost", () => {
  console.log("Server is running on port 8000");
});
```

### The `app` object
```js
const app = Rajdhani();
```
The app object (or whatever name you choose) has the following properties:


1. `app.get(path, callback)`:
    - Listens for GET requests on the specified `path`.
    - Accepts two arguments: `path` (string) and `callback` (function) that receives the request and response objects.

2. `app.post(path, callback)`:
    - Listens for POST requests on the specified `path`.
    - Accepts two arguments: `path` (string) and `callback` (function) that receives the request and response objects.



3. `app.listen(port, host, callback?)`:
    - Starts the server, listening on the specified port and host.
    - Accepts two required arguments: port (number) and host (string). The third argument, callback, is optional and runs after the server starts.


### The Request object
The request object contains the following properties:

1. `.method`: Returns the HTTP method.

2. `.path`: Returns the requested path. 

3. `.headers`: Returns an object with all headers.

4. `.body`: Accesses the request body. Returns a string or `null`.


### The Response object
The response object contains the following properties:

1. `.status(code)`: Sets the response status code. Expects a number as an argument.
2. `.setHeaders(headers)`: Sets the response headers. Expects an object as an argument.
3. `.json(data)`: Sends a JSON response to the client. Expects an object as an argument.
4. `.end(body?)`: Ends the response. Optionally accepts a string as an argument to send in the response body.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License
This project is licensed under the MIT License.