#!/usr/bin/env node

/**
 * loodos-web-generator
 * generate frontend development boilerplate
 *
 * @author bfkaradag <loodos.com>
 */

import chalk from 'chalk';
import inquirer from 'inquirer';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

const queries = {
	'temp-next': {
		npm: projectName =>
			'npx create-next-app@latest ' + projectName + ' --typescript',
		yarn: projectName =>
			'yarn create next-app ' + projectName + ' --typescript'
	},
	temp: {
		npm: projectName =>
			'npx create-react-app ' + projectName + ' --template typescript',

		yarn: projectName =>
			'yarn create react-app ' + projectName + ' --template typescript'
	}
};
const questions = [
	{
		type: 'input',
		name: 'name',
		message: "What's the project name?"
	},
	{
		type: 'list',
		name: 'pm',
		message: 'Which package manager should be?',
		choices: ['npm', 'yarn'],
		filter(val) {
			return val.toLowerCase();
		}
	},
	{
		type: 'list',
		name: 'next',
		message: 'Will you use Next.js',
		choices: [
			{ value: false, name: 'No' },
			{ value: true, name: 'Yes' }
		]
	},
	{
		type: 'list',
		name: 'ui',
		message: 'Do you need UI framework?',
		choices: [
			{ value: 'none', name: "I am already designer ;)'" },
			{ value: 'antd', name: 'antd' },
			{ value: '@material-ui/core', name: 'material-ui' }
		],
		filter(val) {
			return val.toLowerCase();
		}
	},
	{
		type: 'list',
		name: 'css',
		message: 'Do you need CSS framework?',
		choices: [
			{ value: 'none', name: "Let's create some css files" },
			{ value: 'tailwindcss', name: 'tailwind' }
		]
	}
];
const create = answers => {
	const runShScripts = [];
	runShScripts.push(
		queries[answers.next ? 'temp-next' : 'temp'][answers.pm](answers.name)
	);
	let installPackagesCode = answers.pm === 'npm' ? 'npm install' : 'yarn add';
	installPackagesCode += ' jotai';
	if (answers.ui !== 'none')
		installPackagesCode += ' ' + answers.ui ? ' ' + answers.ui : '';
	if (answers.css !== 'none') {
		installPackagesCode +=
			' ' + answers.css ? ' -D tailwindcss postcss autoprefixer' : '';
	}

	runShScripts.push(installPackagesCode);

	if (answers.css !== 'none') {
		runShScripts.push('npx tailwindcss init -p');
	}
	console.log(runShScripts);
};

console.log(chalk.blueBright(figlet.textSync('loodos web')));

const run = () => {
	inquirer.prompt(questions).then(answers => {
		create(answers);
		const spinner = createSpinner(
			'Ones and zeros are working for you, please wait.'
		).start();

		setTimeout(() => {
			spinner.success();
		}, 4000);
	});
};

run();
// inquirer.prompt(["Project name:"]).then((answers) => {
//     console.log(answers)
// })

//jotai, useLoading, useModal,
//
