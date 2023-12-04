const inquirer = require('inquirer');
import fs from 'fs';
import { applicationType } from './util/util';


interface IAnswers {
  title: string;
  description: string;
  installation: string;
  usage: string;
  localdev: string;
  technologies: string;
}
const generateReadMe = (answers: IAnswers) =>
  `# ${answers.title} 
### ${answers.description}

# Table of Contents
### [Installation](#Installation)
### [Technologies](#Technologies)
### [Future Development](#Future-Development)
### [Contact](#Contact)
### [Licenses](#Licenses)

# Installation 
${answers.installation}
# Usage
${answers.usage}
# Local Dev
${answers.localdev}

# Description
# Technologies
${answers.technologies}
`

inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter this applications name',
      validate: function (title: string) {
        if (!title || title === "") {
          return "Application title cannot be left blank";
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'installation',
      message: 'Type any installation instructions here'
    },
    {
      type: 'input',
      name: 'usage',
      message: 'enter usage notes'
    },
    {
      type: 'input',
      name: 'localdev',
      message: 'enter local dev notes'
    },
    {
      type: 'input',
      name: 'description',
      message: 'enter a description of the application',
      validate: function (description: string) {
        if (!description || description === "") {
          return "Description cannot be left blank";
        }
        return true;
      }
    },
    {
      type: 'list',
      name: 'install',
      message: 'What type of application is this?',
      choices: applicationType
    },
    {
      type: 'input',
      name: 'technologies',
      message: 'list any technologies or frameworks you have used'
    },
  ]).then((answers: IAnswers) => {
    const readme = generateReadMe(answers);

    fs.writeFile('./final/README.md', readme, (err) =>
      err ? console.log(err, "Something went wrong, please try again") : console.log('README.md created!'))
  })




