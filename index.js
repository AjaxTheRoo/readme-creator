import fs from 'fs';
import inquirer from 'inquirer';

const questions = [
    {
        type: 'input',
        name: 'title',
        message: "Project Title",
    },
    {
        type: 'input',
        name: 'description',
        message: "Description",
    },
    {
        type: 'input',
        name: 'installation',
        message: "Installation Instructions",
    },
    {
        type: 'input',
        name: 'usage',
        message: "Usage Information",
    },
    {
        type: 'input',
        name: 'contributing',
        message: "Contribution Guidelines",
    },
    {
        type: 'input',
        name: 'license',
        message: "License",
    }
];

async function askQuestions() {
    const answers = {};
    for (const question of questions) {
        const answer = await inquirer.prompt(question);
        Object.assign(answers, answer);
    }
    return answers;
}

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('File has been written successfully.');
        }
    });
}

function generateReadme(answers) {
    return `
#Project ${answers.title}

## Description
${answers.description}

## Installation
${answers.installation}

## Usage
${answers.usage}

## Contributing
${answers.contributing}

## License
${answers.license}
`;
}

async function init() {
    const answers = await askQuestions();
    const readmeContent = generateReadme(answers);
    writeToFile('README.md', readmeContent);
}

init();
