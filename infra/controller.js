import { InternalServerError, MethodNotAllowedError } from "@/infra/errors.js";

function onErrorHandler(err, req, res) {
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
