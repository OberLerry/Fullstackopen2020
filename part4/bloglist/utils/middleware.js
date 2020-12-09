const logger = require("./logger");
const jwt = require("jsonwebtoken");
const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "ValidationError") {
    return response.status(400).send({ error: "Username is already taken" });
  } else {
    console.log(error.message);
    return response.status(401).send({ error: "JWT problem" });
  }
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("Authorization");
  if (authorization) {
    request.token = authorization;
  } else {
    request.token = null;
  }
  next();
};

module.exports = { errorHandler, tokenExtractor };
