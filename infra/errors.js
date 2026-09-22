class InternalServerError extends Error {
  constructor({ cause }) {
    super("Internal Server Error", {
      cause,
    });
    this.name = "InternalServerError";
    this.statusCode = 500;
    this.action = "Please contact support.";
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status_code: this.statusCode,
      action: this.action,
    };
  }
}

class MethodNotAllowedError extends Error {
  constructor() {
    super("Method Not Allowed");
    this.name = "MethodNotAllowedError";
    this.statusCode = 405;
    this.action = "POST not allowed";
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status_code: this.statusCode,
      action: this.action,
    };
  }
}

export { InternalServerError, MethodNotAllowedError };
