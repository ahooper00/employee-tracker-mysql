const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');
const util = require('util');
const { request } = require('http');

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
        const departments = await getDepartments();
        const departmentChoices = departments.map(dept => dept.department_name)

        let inputRole = await inquirer.prompt([
            {
                type: 'input',
                name: 'newRole',
                message: 'What is the title of the new role?',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of this new role?',
            },
            {
                type: 'list',
                name: 'departmentName',
                message: 'What is the department name that this role belongs to?',
                choices: departmentChoices,
            }
        ]);
        let departmentId = departments.find(dept => dept.department_name === inputRole.departmentName).id;
        await connection.query('INSERT INTO employee_role SET ?', {
            department_id: departmentId,
            title: inputRole.newRole,
            salary: inputRole.salary
        });
        console.log(`${inputRole.newRole} added!`)
        beginApplication();
    } catch (err) {
        console.log(err);
    }
}

const getDepartments = () => new Promise((resolve, reject) => {
    let query = 'SELECT * FROM department';
    connection.query(query, function (err, res) {
        if (err) reject(err);
        let departmentList = [];
        res.forEach(department => departmentList.push(department));
        console.log(departmentList);
        resolve(departmentList);
    });
});

const addEmployee = async () => {
    try {
        console.log('ADD NEW EMPLOYEE');
        const role = await getRoles();
        const roleChoices = role.map(empl => empl.title)

        let inputEmployee = await inquirer.prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'What is the new employee first name?',
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'What is the employee last name?',
            },
            {
                type: 'list',
                name: 'role',
                message: 'What is the role of the new employee?',
                choices: roleChoices,
            }
        ]);
        let employeeRole = role.find(empl => empl.title === inputEmployee.role).id;
        await connection.query('INSERT INTO employee SET ?', {
            role_id: employeeRole,
            first_name: inputEmployee.firstName,
            last_name: inputEmployee.lastName,
        });
        console.log(`${inputEmployee.role} added!`)
        beginApplication();
    } catch (err) {
        console.log(err);
    }
}

const getRoles = () => new Promise((resolve, reject) => {
    let query = 'SELECT * FROM employee_role';
    connection.query(query, function (err, res) {
        if (err) reject(err);
        let employeeList = [];
        res.forEach(employee => employeeList.push(employee));
        console.log(employeeList);
        resolve(employeeList);
    });
});

const updateEmployeeRole = async () => {
    try {
        console.log('UPDATE EXISTING EMPLOYEE ROLE');
        const employees = await getEmployees();
        const roles = await getRoles();
        const employeeChoices = employees.map(empl => `${empl.first_name} ${empl.last_name}`);
        const roleChoices = roles.map(role => role.title);

        let updateEmployee = await inquirer.prompt([
            {
                type: 'list',
                name: 'name',
                message: 'Which employee would you like to update?',
                choices: employeeChoices,
            },
            {
                type: 'list',
                name: 'newRole',
                message: 'What would you like to update the role to?',
                choices: roleChoices,
            }
        ]);
        let employee = employees.find(empl => `${empl.first_name} ${empl.last_name}` === updateEmployee.name);
        let employeeRoleId = roles.find(role => role.title === updateEmployee.newRole).id;

        await connection.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [
            employeeRoleId,
            employee.id
        ]);
        console.log(`Role update!`)
        beginApplication();
    } catch (err) {
        console.log(err)
    }
}

const getEmployees = () => new Promise((resolve, reject) => {
    let query = 'SELECT * FROM employee';
    connection.query(query, function (err, res) {
        if (err) reject(err);
        let employeeList = [];
        res.forEach(employee => employeeList.push(employee));
        console.log(employeeList);
        resolve(employeeList);
    });
})