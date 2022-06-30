const ask = require('./ask');

module.exports = async () => {
	const name = await ask({
		name: `name`,
		message: `project name`,
		hint: `(kebab-case only )`
	});
	const uiLibrary = await ask({
		name: `uiLibrary`,
		message: `ui library`,
		hint: `(optional: if different from CLI name)`
	});
	const description = await ask({
		name: `description`,
		message: `CLI description?`
	});
	const version = await ask({
		name: `version`,
		message: `CLI version?`,
		initial: `0.0.1`
	});
	const license = await ask({
		name: `license`,
		message: `CLI license?`,
		initial: `UNLICENSED`
	});
	const authorName = await ask({
		name: `authorName`,
		message: `CLI author name?`
	});
	const authorEmail = await ask({
		name: `authorEmail`,
		message: `CLI author email?`
	});
	const authorUrl = await ask({
		name: `authorUrl`,
		message: `CLI author URL?`
	});

	const vars = {
		name,
		command: command ? command : name,
		description,
		version,
		license,
		authorName,
		authorEmail,
		authorUrl
	};

	return vars;
};
