const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'password',
      database: 'company_db'
    },
    console.log(`Connected to the movies_db database.`)
  );








const firstQuestionPrompt = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
        }
    ]).then
}

// const firstQuestionPrompt = () => {
//     return inquirer.prompt([
//         {
//             type: 'list',
//             name: 'members',
//             message: `Do you want to add a team member?`,
//             choices: ['Yes', 'No'],
//         }
//     ]).then(answers => {
//         const addTeamMember = answers.members;
//         return addTeamMember === 'Yes'
//     })
// }