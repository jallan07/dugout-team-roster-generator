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
function getManager() {
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
	console.log(intro + "\n");
	inquirer
		.prompt([
			{
				type: "input",
				message: "What is the manager's name?",
				name: "managerName",
				validate: (input) => {
					// accepts only if the user has input something
					// if the input passes validation, then return true
					if (input !== "") {
						return true;
					}
					// otherwise, display the following message
					else {
						return "Please enter a name for your manager.";
					}
				},
			},
			{
				type: "input",
				name: "managerId",
				message: "What is the manager's ID number?",
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
				message: "What is the manager's email address?",
				validate: (input) => {
					// accept only the normal email format
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
				message: "What is the manager's office number?",
				validate: (input) => {
					// accept only numbers
					const passed = input.match(/^[1-9]\d*$/);
					// if the input passes the validation, then return true
					if (passed) {
						return true;
					}
					// otherwise, display the following message
					return "Please enter numbers only.";
				},
			},
		])
		// and to create objects for each team member (using the correct classes as blueprints!)
		.then((responses) => {
			const manager = new Manager(
				responses.managerName,
				responses.managerId,
				responses.managerEmail,
				responses.managerOffice
			);
			teamMembers.push(manager);

			// dialogue for the next part
			const managerCollected = [
				"\r",
				"-".repeat(60),
				`Awesome. ${manager.name} has been added to the team!`,
				"Next up, we need to get some information about your other team members.",
				"-".repeat(60),
			].join("\n\n");
			console.log(managerCollected);
			addMembers();
		});

	// function that asks to create more seats for additional team members (engineers and interns)
	function addMembers() {
		inquirer
			.prompt([
				{
					type: "list",
					message: "Which type of employee would you like to add next?",
					choices: ["Engineer", "Intern", "I'm done adding team members"],
					name: "position",
				},
			])
			.then((response) => {
				// if the user selects Engineer, then we want to call the addEngineer function
				if (response.position === "Engineer") {
					addEngineer();
					// OR, if the user selects Intern, then we want to call the addIntern function
				} else if (response.position === "Intern") {
					addIntern();
				} else {
					return;
				}
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
				// Push the newly entered engineer to the teamMembers object array
				teamMembers.push(engineer);
				addMembers();
			});
	}

	// function that creates more interns
	function addIntern() {}
}

// store the team members in an array of objects after they have been created
const teamMembers = [];
// initialize the getManager function
getManager();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
