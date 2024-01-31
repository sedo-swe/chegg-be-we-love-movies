const db = require("../db/connection");
const tableName = "reviews";

async function destroy(reviewId) {
  // Add destroy function
  return db(tableName).where({ "review_id": reviewId }).del();
}

async function list(movie_id) {
  // Add list function, call differently based on movie_id
  if (movie_id) {
    return db("reviews as r")
    .join("movies as m", "m.movie_id", "r.movie_id")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("r.*", "c.*")
    .where({ "m.movie_id": movie_id });
  } else {
    return db("reviews")
      .select("*");
  }
}

async function read(reviewId) {
  // Add read function with reiview_id
  return db(tableName).select("*").where({ "review_id": reviewId }).first();
}

async function readCritic(critic_id) {
  return db("critics").where({ critic_id }).first();
}

async function setCritic(review) {
  review.critic = await readCritic(review.critic_id);
  return review;
}

async function update(review) {
  return db(tableName)
    .select("*")
    .where({ review_id: review.review_id })
    .update(review, "*")
    .then(() => read(review.review_id))
    .then(setCritic);
}

module.exports = {
  destroy,
  list,
  read,
  update,
};
