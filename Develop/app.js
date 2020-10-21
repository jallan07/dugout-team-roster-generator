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
	const intro = [
		"\r",
		"-".repeat(60),
		"Please answer the following questions to build your team.",
		"First, let's get information about the manager.",
	].join("\n\n");
	console.log(intro + "\n");
	inquirer
		.prompt([
			{
				type: "input",
				message: "What is the manager's name?",
				name: "managerName",
				validate: (input) => {
					if (input !== "") {
						return true;
					} else {
						return "Please enter a name for your manager.";
					}
				},
			},
			{
				type: "input",
				name: "managerId",
				message: "What is the manager's ID number?",
				validate: (input) => {
					const passed = input.match(/^[1-9]\d*$/);
					if (passed) {
						return true;
					}
					return "Please enter a positive number greater than zero.";
				},
			},
			{
				type: "input",
				name: "managerEmail",
				message: "What is the manager's email address?",
				validate: (input) => {
					const passed = input.match(/\S+@\S+\.\S+/);
					if (passed) {
						return true;
					}
					return "Please enter a valid email address.";
				},
			},
			{
				type: "input",
				name: "managerOffice",
				message: "What is the manager's office number?",
				validate: (input) => {
					const passed = input.match(/^[1-9]\d*$/);
					if (passed) {
						return true;
					}
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
			console.log(teamMembers);
			addMembers();
		});
}

// function that asks to create more seats for additional team members (engineers and interns)
function addMembers() {}

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
