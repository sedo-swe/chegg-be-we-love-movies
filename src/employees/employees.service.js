const db = require("../db/connection");

const tableName = "employees";

function create(newRestaurant) {
  return knex(tableName)
    .insert(newRestaurant, "*")
    .then((createdRecords) => createdRecords[0]);
}

async function list(is_showing) {
  return db("employees as e")
    .select("e.*")
    .modify((queryBuilder) => {
      if (is_showing) {
        queryBuilder
          .join(
            "employees_projects as ep",
            "e.employee_id",
            "ep.employee_id"
          )
          .where({ "ep.is_showing": true })
          .groupBy("e.employee_id");
    }
    });
}

async function read(employee_id) {
  // Add read function
  return db(tableName)
    .select("employee_id", "first_name", "last_name", "phone", "title", "salary", "hire_date")
    .where({ "employee_id": employee_id })
    .first();
}

function update(updatedEmployee) {
  return knex(tableName)
    .select("*")
    .where({ employee_id: updatedEmployee.employee_id })
    .update(updatedEmployee, "*");
}

function destroy(employee_id) {
  return knex(tableName).where({ employee_id }).del();
}


module.exports = {
  create,
  list,
  read,
  update,
  delete: destroy,
};
