const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/*const reduceProperties = require("../utils/reduce-properties");

const reduceMovies = reduceProperties("theater_id", {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  rating: ["movies", null, "rating"],
  description: ["movies", null, "description"],
  image_url: ["movies", null, "image_url"],
  mcreated: ["movies", null, "created_at"],
  mupdated: ["movies", null, "updated_at"],
  is_showing: ["movies", null, "is_showing"],
  mttheater_id: ["movies", null, "theater_id"],
});*/

async function list(request, response) {
  // Add list function
  const { movieId } = request.params;
  if (movieId)
    response.json({ data: await service.list(movieId) });
  else {
    /* response.json({ data: reduceMovies(await service.list()) }); */
    response.json({ data: await service.list() });
  }
}

module.exports = {
  list: asyncErrorBoundary(list),
};
