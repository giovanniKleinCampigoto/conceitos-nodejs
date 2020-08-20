const { ERROR_MESSAGES } = require("./constants");

const { validate } = require("uuid");

function beforeHandErrorHandler(request, response, next) {
  const { id } = request.params;

  if (!validate(id)) {
    return response.status(400).json({ error: ERROR_MESSAGES.BAD_ID });
  }

  next();
}

function errorHandlerMiddleware(err, request, response, next) {
  if (err) {
    console.log(err);
    try {
      const { status, message } = JSON.parse(err.message);
      return response.status(status).json({ message });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "Something went wrong" });
    }
  }
  next();
}

module.exports = {
  errorHandlerMiddleware,
  beforeHandErrorHandler,
};
