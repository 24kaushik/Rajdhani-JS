interface myRequest {
  method: string;
  path: string;
  headers: { [key: string]: string };
  body: string | null;
}

const requestParser = (request: string): myRequest => {
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
};

export { requestParser, myRequest };