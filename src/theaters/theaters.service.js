const db = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

const reduceMovies = reduceProperties("theater_id", {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  rating: ["movies", null, "rating"],
  description: ["movies", null, "description"],
  image_url: ["movies", null, "image_url"],
});

async function list() {
  return db("theaters as t")
    .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .select("t.*", "m.*", "mt.*")
    .then(reduceMovies);
}

/*
async function list(movieId) {
  if (movieId) {
    return db("theaters as t")
    .join(
      "movies_theaters as mt",
      "mt.theater_id",
      "t.theater_id"
    )
    .select("t.*", "mt.is_showing", "mt.movie_id")
    .where({ "mt.movie_id": movieId});
  } else {
    return db("theaters as t")
    .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .select("t.*",
      "m.movie_id", "m.title", "m.runtime_in_minutes", "m.rating", 
      "m.description", "m.image_url", "m.created_at as mcreated", "m.updated_at as mupdated",
      "mt.is_showing", "mt.theater_id as mttheater_id");
  }
}
*/

module.exports = {
  list,
};
