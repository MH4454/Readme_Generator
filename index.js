// Grabbing dependencies for this file
const fs = require("fs");
const inquirer = require("inquirer");
const Choices = require("inquirer/lib/objects/choices");
const { report } = require("process");
const util = require("util");

function promptUser(){
    return inquirer.prompt([
        {
            type: 'input',
            message: 'What is your GitHub username?',
            name: 'username',
        },
        {
            type: 'input',
            message: 'What is your e-mail address?',
            name: 'email'
        },
        {
            type: 'input',
            message: 'What is your Readme title?',
            name: 'title'
        },
        {
            type: 'input',
            message: 'Please provide a description of your project',
            name: 'description'
        },
        {
            type: 'list',
            message: 'What licenses would you like to include',
            name: 'license',
            choices: ['MIT','APACHE 2.0','GPL 3.0','BSD 3','None']
        },
        {
            type: 'input',
            message: 'What are the dependencies install commands?',
            name: 'installation',
            default: 'npm install'
        },
        {
            type: 'input',
            message: 'What command should be run to run tests?',
            name: 'tests'
        },
        {
            type: 'input',
            message: 'How does a user use the repo?',
            name: 'usage'
        },
        {
            type: 'input',
            message: 'What does a user need to know about contributing?',
            name: 'contribute'
        }
    ])
};

function generateMD(response){
    let badge = "";
    if(response.license == "MIT"){
        badge = "![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)"
    }else if (response.license == "APACHE 2.0"){
        badge = "![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)"
    }else if (response.license == "GPL 3.0"){
        badge = "![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)"
    }else if (response.license == "BSD 3"){
        badge = "![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)"
    }
    return`# ${response.title}  ${badge}

    ${response.description}
## Table of Contents:
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)
### Installation:
In order to install the necessary dependencies, open the console and run the following:
\`\`\`${response.installation}\`\`\`
### Usage:
${response.usage}
### License:
This project is licensed under:
${response.license}
### Contributing:
${response.contribute}
### Tests:
In order to test open the console and run the following:
\`\`\`${response.tests}\`\`\`
### Questions:
If you have any questions contact me on [GitHub](https://github.com/${response.username}) or contact at ${response.email}
![picture](https://github.com/${response.username}.png?size=80)
    
 `
};

promptUser().then(function(response){
    const markdown = generateMD(response);
    return fs.writeFileSync("./generated/generatedREADME.md", markdown);
}).then(function () {
        console.log("Generating README.md ...");
    }).catch(function(err){
    console.log(err)
})