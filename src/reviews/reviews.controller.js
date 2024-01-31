const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const methodNotAllowed = require("../errors/methodNotAllowed");

const mapProperties = require("../utils/map-properties");

async function reviewExists(request, response, next) {
  // Add middleware checking whether review exists or not
  const { reviewId } = request.params;
  const review = await service.read(reviewId);
  if (review) {
    response.locals.review = review;
    return next();
  }
  return next({ status: 404, message: `Review cannot be found.` });
}

async function destroy(request, response) {
  // Add delete function
  await service.destroy(response.locals.review.review_id);
  response.sendStatus(204);
}

const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  created_at: "critic.created_at",
  updated_at: "critic.updated_at",
});

async function list(request, response) {
  // Add list function, if movieId is present, then call service with movieId
  const { movieId } = request.params;
  if (movieId) {
    const reviews = await service.list(movieId);
    const nreviews = reviews.map((r) => addCritic(r));
    response.json({ data: await nreviews });
  }
  else {
    response.json({ data: await service.list() });
  }
}

function hasMovieIdInPath(request, response, next) {
  if (request.params.movieId) {
    return next();
  }
  methodNotAllowed(request, response, next);
}

function noMovieIdInPath(request, response, next) {
  if (request.params.movieId) {
    return methodNotAllowed(request, response, next);
  }
  next();
}

async function update(request, response) {
  // Add update function
  const updatedReview = {
    ...response.locals.review,
    ...request.body.data,
    review_id: response.locals.review.review_id,
  };
  response.json({ data: await service.update(updatedReview) });
}

module.exports = {
  delete: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(destroy),
  ],
  list: [hasMovieIdInPath, asyncErrorBoundary(list)],
  update: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(update),
  ],
};
