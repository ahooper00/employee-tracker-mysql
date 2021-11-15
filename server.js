const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');
const util = require('util');
const { request } = require('http');
const AddEntriesFromIterable = require('es-abstract/2019/AddEntriesFromIterable');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
let connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'company_db',
    },
    console.log(`Connected to the company_db database.`)
);

connection.query = util.promisify(connection.query);

connection.connect((err) => {
    if (err) throw err;

    // begin application
    console.table('Company Employee Tracker');
    beginApplication();
});

const beginApplication = async () => {
    try {
        let option = await inquirer.prompt({
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all employees', 'View all roles', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit']
        });
        switch (option.options) {
            case 'View all departments':
                viewDepartments();
                break
            case 'View all employees':
                viewEmployee();
                break
            case 'View all roles':
                viewRoles();
                break
            case 'Add a department':
                addDepartment();
                break
            case 'Add a role':
                addRole();
                break
            case 'Add an employee':
                addEmployee();
                break
            case 'Update an employee role':
                updateEmployeeRole();
                break
            case 'Exit':
                connection.end();
                break;
        };
    } catch (err) {
        console.log(err);
    };
};

const viewDepartments = async () => {
    console.log("DEPARTMENT VIEW");
    try {
        let query = 'SELECT * FROM department';
        connection.query(query, function (err, res) {
            if (err) throw err;
            let departmentList = [];
            res.forEach(department => departmentList.push(department));
            console.table(departmentList);
            beginApplication();
        });
    } catch (err) {
        console.log(err);
        beginApplication()
    }
}

const viewEmployee = async () => {
    console.log("EMPLOYEE VIEW");
    try {
        let query = 'SELECT * FROM employee';
        connection.query(query, function (err, res) {
            if (err) throw err;
            let employeeList = [];
            res.forEach(employee => employeeList.push(employee));
            console.table(employeeList);
            beginApplication();
        });
    } catch (err) {
        console.log(err);
        beginApplication();
    }
}

const viewRoles = async () => {
    console.log("ROLES VIEW");
    try {
        let query = 'SELECT * FROM employee_role';
        connection.query(query, function (err, res) {
            if (err) throw err;
            let roleList = [];
            res.forEach(role => roleList.push(role));
            console.table(roleList);
            beginApplication();
        });
    } catch (err) {
        console.log(err);
        beginApplication();
    }
}

const addDepartment = async () => {
    try {
        console.log('ADD A NEW DEPARTMENT');

        let inputDepartment = await inquirer.prompt({
            type: 'input',
            name: 'newDepartment',
            message: 'What is the name of the new department?',
        });
        let departmentName = await connection.query('INSERT INTO department SET ?', {
            department_name: inputDepartment.newDepartment
        });
        console.log(`${inputDepartment.newDepartment} added!`)
        beginApplication();
    } catch (err) {
        console.log(err);
        beginApplication();
    }
}

const addRole = async () => {
    try {
        console.log('ADD A NEW ROLE');

        let inputRole = await inquirer.prompt(
            {
                type: 'input',
                name: 'newRole',
                message: 'What is the title of the new role?',
            },
            {
                type: 'input',
                name: 'departmentId',
                message: 'What is the department ID that the role belongs to?',
            },
            {
                type: 'list',
                name: 'salary',
                message: 'What department ID does this new role have?',
                choices: department.map((department_id) => {
                    return {
                        name: department_id.department_name,
                        value: department_id.id,
                    }
                })
            });
    }
}