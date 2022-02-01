const mysql = require('mysql2');
const inquirer = require('inquirer');

const db = mysql.createConnection({
  user: 'root',
  database: 'employee_db'
});

function init() {
  inquirer.prompt([
    {
      type: 'list',
      message: 'Would you like to view a table or add to a table?',
      choices: ['View', 'Add'],
      name: 'selection'
    },
    {
      type: 'list',
      message: 'What table would you like to view?',
      choices: ['Departments', 'Roles', 'Employees'],
      name: 'view',
      when: (answer) => answer.selection === 'View'
    },
    {
      type: 'list',
      message: 'What would you like to add to?',
      choices: ['Departments', 'Roles', 'Employees'],
      name: 'add',
      when: (answer) => answer.selection === 'Add'
    },
  ])
    .then((answer) => {
      const { selection, view, add } = answer;
      switch (selection) {
        case 'View':
          db.query(`SELECT * FROM ${view};`, (err, data) => {
            console.table(data);
            init();
          });
          break;
        case 'Add':
          if (add === 'Departments') addDepartment();
          if (add === 'Roles') addRole();
          if (add === 'Employees') addEmployee();
          break;
        default:
          break;
      }
    })
};

function addDepartment() {
  inquirer.prompt([
    {
      message: 'What is the name of the Department you would like to add?',
      name: 'department',
    }
  ])
    .then((answers) => {
      const { department } = answers;
      db.query(`INSERT INTO Departments (name) VALUES ('${department}');`, (err, data) => {
        console.log(`Department ${department} has been added to the database.`);
        init();
      });
    })
};

function addRole() {
  inquirer.prompt([
    {
      message: 'What is the title of the Role you would like to add?',
      name: 'title',
    },
    {
      message: 'What is the salary of the new role?',
      name: 'salary'
    },
    {
      message: 'What is the department ID of the new role?',
      name: 'id'
    }
  ])
    .then((answers) => {
      const { title, salary, id } = answers;
      db.query(`INSERT INTO roles (title, salary, department_id) VALUES ('${title}', '${salary}', '${id}');`, (err, data) => {
        console.log(`The role ${title} has been added to the database.`);
        if (err) {
          console.log(err);
        }
        init();
      });
    })
};

function addEmployee() {
  inquirer.prompt([
    {
      message: 'What is the first name of the Employee you would like to add?',
      name: 'firstName',
    },
    {
      message: 'What is the last name of the Employee you would like to add?',
      name: 'lastName'
    },
    {
      message: 'What is the role_id of the new employee?',
      name: 'roleId'
    },
    {
      message: 'What is the manager_id of the new employee?',
      name: 'managerId'
    }
  ])
    .then((answers) => {
      const { firstName, lastName, roleId, managerId } = answers;
      db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${firstName}', '${lastName}', '${roleId}', '${managerId}');`, (err, data) => {
        console.log(`Employee ${firstName} ${lastName} has been added to the database.`);
        init();
      });
    })
};

init();