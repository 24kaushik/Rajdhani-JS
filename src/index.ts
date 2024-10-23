import App from './server';

// -------------------TESTING! Not to be used in production.------------------- //
const server = new App();

server.get("/", (_, res) => {
  res.status(201).setHeaders({"Content-Length": "12"}).end("Hello World!");
});
server.get("/ks", (_, res) => {
  res.end("Hello Kaushik!");
});

server.listen(3000, "localhost");
// --------------------------------------------------------------------------- //

export default App;