const db = require("../db/connection");

async function list(is_showing) {
  return db("movies")
    .select("movies.*")
    .modify((queryBuilder) => {
      if (is_showing) {
        queryBuilder
          .join(
            "movies_theaters",
            "movies.movie_id",
            "movies_theaters.movie_id"
          )
          .where({ "movies_theaters.is_showing": true })
          .groupBy("movies.movie_id");
      }
    });
}

async function read(movie_id) {
  // Add read function
  return db("movies")
    .select("movie_id", "title", "runtime_in_minutes", "rating", "description", "image_url", "created_at", "updated_at")
    .where({ "movie_id": movie_id })
    .first();
}

module.exports = {
  list,
  read,
};
