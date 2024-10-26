function objectToHeaders(
  headersObj: { [key: string]: string },
  body: string
): string {
  let headersString = "";
  headersObj["Content-Length"] = body ? body.length.toString() : "0";
  for (const key in headersObj) {
    if (headersObj.hasOwnProperty(key)) {
      headersString += `${key}: ${headersObj[key]}\r\n`;
    }
  }

  return headersString;
}

function headersToObject(headers: string): { [key: string]: string } {
  return headers
    .split("\r\n")
    .reduce((acc: { [key: string]: string }, header: string) => {
      const [key, value] = header.split(": ");
      acc[key] = value;
      return acc;
    }, {});
}

export { objectToHeaders };
