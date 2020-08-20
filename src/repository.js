const { ERROR_MESSAGES } = require("./constants");

function findRepository(repositories, id) {
  const repoIndex = repositories.findIndex((repository) => repository.id === id);

  if (repoIndex === -1) {
    throw new Error(JSON.stringify({ status: 400, message: ERROR_MESSAGES.NOT_FOUND }));
  }

  return repoIndex;
}

module.exports = {
  findRepository,
};
