export class Router {
  private routes: { [key: string]: { [key: string]: Function } } = {};

  get(path: string, handler: Function) {
    if (!this.routes[path]) {
      this.routes[path] = {};
    }
    this.routes[path]["GET"] = handler;
  }

  post(path: string, handler: Function) {
    if (!this.routes[path]) {
      this.routes[path] = {};
    }
    this.routes[path]["POST"] = handler;
  }

  findRoute(path: string): { [key: string]: Function } {
    return this.routes[path];
  }
}
