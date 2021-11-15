const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');
const util = require('util');

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
            choices: ['View all departments', 'View all employees', 'View all roles', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
        });
        switch (option.options) {
            case 'View all departments':
                viewDepartments();
                break
            case 'View all employees':
            viewEmployee();
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