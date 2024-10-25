import App from './server';

// -------------------TESTING! Not to be used in production.------------------- //
const server = new App();

server.get("/", (_, res) => {
  res.status(201).setHeaders({"Content-Length": "12"}).end("Hello World!");
});
server.get("/ks", (_, res) => {
  res.end("Hello Kaushik!");
});
server.get("/json", (_, res) => {
  res.json({a:1, b:2, c:3});
});

server.post("/", (req, res) => {
  res.end(`${JSON.stringify(req.headers)}`);
});

server.listen(3000, "localhost");
// --------------------------------------------------------------------------- //

export default App;