const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(request, response, next) {
  // Add middleware checking existence of movie with movie_id
  const movie = await service.read(request.params.movieId);
  if (movie) {
    response.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: `Movie cannot be found.` });
}

async function read(request, response) {
  // Add read functioin
  response.json({ data: response.locals.movie });
}

async function list(request, response) {
  // Add list functioin
  const is_showing = request.query.is_showing;
  if (is_showing) {
    response.json({ data: await service.list(is_showing) });
  }
  else {
    response.json({ data: await service.list() });
  }
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
  movieExists,
};
