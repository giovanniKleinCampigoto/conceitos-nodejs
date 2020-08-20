const express = require("express");
const cors = require("cors");

const { v4: uuid } = require("uuid");

const { beforeHandErrorHandler, errorHandlerMiddleware } = require("./middlewares");
const { findRepository } = require("./repository");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/repositories/:id", beforeHandErrorHandler);

const repositories = [];

app.get("/repositories", (request, response) => {
  const { id } = request.query;

  if (id) {
    const repositoryIndex = findRepository(repositories, id);
    return response.json([repositories[repositoryIndex]]);
  }

  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, techs, url } = request.body;

  const repository = {
    id: uuid(),
    title,
    techs,
    url,
    likes: 0,
  };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, techs, url, likes } = request.body;

  const repositoryIndex = findRepository(repositories, id);

  let originalRepository = repositories[repositoryIndex];

  const repository = {
    id,
    title: title || originalRepository.title,
    techs: techs || originalRepository.techs,
    url: url || originalRepository.url,
    likes: originalRepository.likes,
  };

  originalRepository = repository;

  return response.json(originalRepository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoriesIndex = findRepository(repositories, id);

  repositories.splice(repositoriesIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = findRepository(repositories, id);

  repositories[repositoryIndex].likes++;
  const { likes } = repositories[repositoryIndex];

  return response.json({ likes });
});

app.use("/repositories/:id", errorHandlerMiddleware);
module.exports = app;
