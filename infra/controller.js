import {
  InternalServerError,
  MethodNotAllowedError,
  ValidationError,
  NotFoundError,
} from "@/infra/errors.js";

function onErrorHandler(err, req, res) {
  if (err instanceof ValidationError || err instanceof NotFoundError) {
    return res.status(err.statusCode).json(err);
  }
  const publicErrorObject = new InternalServerError({
    cause: err,
    statusCode: err?.statusCode ?? 500,
  });
  console.error(publicErrorObject);
  res.status(publicErrorObject.statusCode).json(publicErrorObject);
}

function onNoMatchHandler(req, res) {
  const publicErrorObject = new MethodNotAllowedError();
  res.status(405).json(publicErrorObject);
}

const controller = {
  errorHandler: {
    onNoMatch: onNoMatchHandler,
    onError: onErrorHandler,
  },
};

export default controller;
