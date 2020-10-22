// requirements & dependencies
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// Function that gets the information of the manager of the team
function buildRoster() {
	// introduction dialogue
	const intro = [
		"\r",
		"-".repeat(60),
		"W E L C O M E   T O   T H E   D U G O U T",
		"With D U G O U T, you can easily create team rosters and organizational charts...all from right here in the command line.",
		"-".repeat(60),
		"Please answer the following questions to build your team.",
		"First, let's get information about the manager...",
		"-".repeat(60),
	].join("\n\n");
	// print the intro dialogue to the screen
	console.log(intro + "\n");
	// run the addCoworker function
	addCoworker();

	// function that asks to create more seats for additional team members (engineers and interns)
	function addCoworker() {
		inquirer
			.prompt([
				{
					type: "list",
					message: "Which type of employee would you like to add next?",
					choices: [
						"Manager",
						"Engineer",
						"Intern",
						"I'm done adding team members",
					],
					name: "position",
				},
			])
			.then((response) => {
				// if the user selects Manager, then we want to call the addManager function
				if (response.position === "Manager") {
					addManager();
					// OR, if the user selects Engineer, then we want to call the addEngineer function
				} else if (response.position === "Engineer") {
					addEngineer();
					// OR, if the user selects Intern, then we want to call the addIntern function
				} else if (response.position === "Intern") {
					addIntern();
				} else {
					console.log("Team created:");
					console.log(coworkers);
				}
			});
	}
	// function that adds managers
	function addManager() {
		// set the dialogue for the addManager flow
		const managerDialogue = [
			"\r",
			"-".repeat(60),
			`Cool, let's add some managers!`,
			"Just a few questions to get their information added...",
			"-".repeat(60),
		].join("\n\n");
		// display the dialogue for the manager flow
		console.log(managerDialogue);
		// prompt user for inputs
		inquirer
			.prompt([
				{
					type: "input",
					message: "What's the name of the Team Manager?",
					name: "managerName",
					validate: (input) => {
						// accept only if the user inputs info
						// if the input passes the validation, then return true
						if (input !== "") {
							return true;
						} else {
							// otherwise, display the following message
							return "Please enter a name for your manager.";
						}
					},
				},
				{
					type: "input",
					name: "managerId",
					message: "What's their ID number?",
					validate: (input) => {
						// accept only numbers
						const passed = input.match(/^[1-9]\d*$/);
						// if the input passes the validation, then return true
						if (passed) {
							return true;
						}
						// otherwise, display the following message
						return "Please enter a positive number greater than zero.";
					},
				},
				{
					type: "input",
					name: "managerEmail",
					message: "What's their email address?",
					validate: (input) => {
						// accept only the correct format of an email address
						const passed = input.match(/\S+@\S+\.\S+/);
						// if the input passes the validation, then return true
						if (passed) {
							return true;
						}
						// otherwise, display the following message
						return "Please enter a valid email address.";
					},
				},
				{
					type: "input",
					name: "managerOffice",
					message: "What's their office number?",
					validate: (input) => {
						// accept numbers only
						const passed = input.match(/[1-9]/gi);
						// if the input passes the validation, then return true
						if (passed) {
							return true;
						}
						// otherwise, display the following message
						return "Please enter numbers only.";
					},
				},
			])
			.then((responses) => {
				// save the responses as a new manager
				const manager = new Manager(
					responses.managerName,
					responses.managerId,
					responses.managerEmail,
					responses.managerOffice
				);

				// dialogue for the next part
				const managerCollected = [
					"\r",
					"-".repeat(60),
					`Awesome. ${manager.name} has been added to the team!`,
					"-".repeat(60),
				].join("\n\n");
				// print the dialogue to the screen
				console.log(managerCollected);

				// Push the newly entered manager to the coworkers object array
				coworkers.push(manager);

				// run the addCoworker function again
				addCoworker();
			});
	}
	// function that creates more engineers
	function addEngineer() {
		// set the dialogue for the addEngineer flow
		const engineerDialogue = [
			"\r",
			"-".repeat(60),
			`Great, let's add some engineers!`,
			"Just a few questions to get their information added...",
			"-".repeat(60),
		].join("\n\n");
		// display the dialogue for the engineer flow
		console.log(engineerDialogue);
		// prompt user for inputs
		inquirer
			.prompt([
				{
					type: "input",
					message: "What's the name of the Software Engineer?",
					name: "engineerName",
					validate: (input) => {
						// accept only if the user inputs info
						// if the input passes the validation, then return true
						if (input !== "") {
							return true;
						} else {
							// otherwise, display the following message
							return "Please enter a name for your engineer.";
						}
					},
				},
				{
					type: "input",
					name: "engineerId",
					message: "What's their ID number?",
					validate: (input) => {
						// accept only numbers
						const passed = input.match(/^[1-9]\d*$/);
						// if the input passes the validation, then return true
						if (passed) {
							return true;
						}
						// otherwise, display the following message
						return "Please enter a positive number greater than zero.";
					},
				},
				{
					type: "input",
					name: "engineerEmail",
					message: "What's their email address?",
					validate: (input) => {
						// accept only the correct format of an email address
						const passed = input.match(/\S+@\S+\.\S+/);
						// if the input passes the validation, then return true
						if (passed) {
							return true;
						}
						// otherwise, display the following message
						return "Please enter a valid email address.";
					},
				},
				{
					type: "input",
					name: "engineerGithub",
					message: "What's their github username?",
					validate: (input) => {
						// accept uppercase, lowercase, or numbers
						const passed = input.match(/[a-z1-9]/gi);
						// if the input passes the validation, then return true
						if (passed) {
							return true;
						}
						// otherwise, display the following message
						return "Please enter a valid email address.";
					},
				},
			])
			.then((responses) => {
				// save the responses as a new engineer
				const engineer = new Engineer(
					responses.engineerName,
					responses.engineerId,
					responses.engineerEmail,
					responses.engineerGithub
				);
				// Push the newly entered engineer to the coworkers object array
				coworkers.push(engineer);
				addCoworker();
			});
	}
	// function that creates more interns
	function addIntern() {
		// set the dialogue for the addEngineer flow
		const internDialogue = [
			"\r",
			"-".repeat(60),
			`Sweet, let's add some internss!`,
			"Just a few questions to get their information added...",
			"-".repeat(60),
		].join("\n\n");
		// display the dialogue for the engineer flow
		console.log(internDialogue);
		// prompt user for inputs
		inquirer
			.prompt([
				{
					type: "input",
					message: "What's the name of the Intern Developer?",
					name: "internName",
					validate: (input) => {
						// accept only if the user inputs info
						// if the input passes the validation, then return true
						if (input !== "") {
							return true;
						} else {
							// otherwise, display the following message
							return "Please enter a name for your intern.";
						}
					},
				},
				{
					type: "input",
					name: "internId",
					message: "What's their ID number?",
					validate: (input) => {
						// accept only numbers
						const passed = input.match(/^[1-9]\d*$/);
						// if the input passes the validation, then return true
						if (passed) {
							return true;
						}
						// otherwise, display the following message
						return "Please enter a positive number greater than zero.";
					},
				},
				{
					type: "input",
					name: "internEmail",
					message: "What's their email address?",
					validate: (input) => {
						// accept only the correct format of an email address
						const passed = input.match(/\S+@\S+\.\S+/);
						// if the input passes the validation, then return true
						if (passed) {
							return true;
						}
						// otherwise, display the following message
						return "Please enter a valid email address.";
					},
				},
				{
					type: "input",
					name: "internSchool",
					message: "What's school do they attend?",
					validate: (input) => {
						// accept only if the user inputs info
						// if the input passes the validation, then return true
						if (input !== "") {
							return true;
						} else {
							// otherwise, display the following message
							return "Please enter a valid school name.";
						}
					},
				},
			])
			.then((responses) => {
				// save the responses as a new intern
				const intern = new Intern(
					responses.internName,
					responses.internId,
					responses.internEmail,
					responses.internSchool
				);
				// Push the newly entered intern to the coworkers object array
				coworkers.push(intern);
				addCoworker();
			});
	}
	// After the user has input all employees desired, call the `render` function (required
	// above) and pass in an array containing all employee objects; the `render` function will
	// generate and return a block of HTML including templated divs for each employee!
	const html = render(coworkers);
	// After you have your html, you're now ready to create an HTML file using the HTML
	// returned from the `render` function. Now write it to a file named `team.html` in the
	// `output` folder. You can use the variable `outputPath` above target this location.
	// Hint: you may need to check if the `output` folder exists and create it if it
	// does not.
	fs.writeFile("./output/team.html", html, "utf-8", function (err) {
		if (err) throw err;
	});
}

// initialize the getManager function
buildRoster();
