const service = require("./employees.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function employeeExists(request, response, next) {
  // Add middleware checking existence of movie with movie_id
  const employee = await service.read(request.params.employeeId);
  if (employee) {
    response.locals.employee = employee;
    return next();
  }
  next({ status: 404, message: `Employee cannot be found.` });
}

async function read(request, response) {
  // Add read functioin
  response.json({ data: response.locals.employee });
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

const validFields = new Set([
  "first_name",
  "last_name",
  "phone",
  "title",
  "salary",
  "hire_date"
]);

function hasValidFields(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !validFields.has(field)
  );

  if (invalidFields.length)
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  next();
}

async function create(req, res, next) {
  const newEmployee = ({
    first_name,
    last_name,
    phone,
    title,
    salary,
    hire_date
  } = req.body.data);
  const createdEmployee = await service.create(newEmployee);
  res.status(201).json({ data: createdEmployee });
}

async function update(req, res) {
  const updatedEmployee = {
    ...req.body.data,
    employee_id: res.locals.employee.employee_id,
  };

  const data = await service.update(updatedEmployee);
  res.json({ data });
}

async function destroy(req, res) {
  await service.delete(res.locals.employee.employee_id);
  res.sendStatus(204);
}

module.exports = {
  create: [hasValidFields, asyncErrorBoundary(create)],
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(employeeExists), read],
  update: [
    hasValidFields,
    asyncErrorBoundary(employeeExists),
    asyncErrorBoundary(update),
  ],
  delete: [asyncErrorBoundary(employeeExists), asyncErrorBoundary(destroy)],
  employeeExists,
};
