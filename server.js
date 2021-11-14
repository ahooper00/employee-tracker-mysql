const inquirer = require('inquirer');

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