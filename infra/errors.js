class InternalServerError extends Error {
  constructor({ cause, statusCode }) {
    super("Internal Server Error", {
      cause,
    });
    this.name = "InternalServerError";
    this.statusCode = statusCode ?? 500;
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

class ServiceError extends Error {
  constructor({ cause, message }) {
    super(message ?? "Service unavailable in the moment", {
      cause,
    });
    this.name = "ServiceError";
    this.statusCode = 503;
    this.action = "Please, check if the service is available.";
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

class ValidationError extends Error {
  constructor({ cause, message, action }) {
    super(message ?? "Validation error", {
      cause,
    });
    this.name = "ValidationError";
    this.statusCode = 400;
    this.action = action ?? "Please check your input.";
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

class NotFoundError extends Error {
  constructor({ cause, message, action }) {
    super(message ?? "Resource not found", {
      cause,
    });
    this.name = "NotFoundError";
    this.statusCode = 404;
    this.action = action ?? "Please check the resource identifier.";
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

export {
  InternalServerError,
  MethodNotAllowedError,
  ServiceError,
  ValidationError,
  NotFoundError,
};
