const router = require("express").Router({ mergeParams: true });
const controller = require("./employees.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// const reviewsRouter = require("../reviews/reviews.router");
// const theatersRouter = require("../theaters/theaters.router");

// // Add route for theaters and reviews
// router.use("/:movieId/theaters", controller.movieExists, theatersRouter);
// router.use("/:movieId/reviews", controller.movieExists, reviewsRouter);

router
  .route("/")
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed);

router
  .route("/:employeesId")
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete)
  .all(methodNotAllowed);


module.exports = router;
