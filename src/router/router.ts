export class Router {
  private routes: { [key: string]: Function } = {};

  get(path: string, handler: Function) {
    this.routes[path] = handler;
  }

  findRoute(path: string): Function | undefined {
    return this.routes[path];
  }
}
