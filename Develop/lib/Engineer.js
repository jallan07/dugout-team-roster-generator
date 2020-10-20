// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
// import the Employee class to build on top of it
const Employee = require("./Employee");
// create the Engineer class, and extend it on to the Employee class
class Engineer extends Employee {
	constructor(name, id, email, github) {
		// grab the previously created values from the employee class
		super(name, id, email);
		// add on the github value
		this.github = github;
	}
	// overwrite the getRole funciton so that it returns the proper position
	getRole() {
		return "Engineer";
	}
	// create the getGitHub() function to extend onto the employee class
	getGithub() {
		return this.github;
	}
}
// export this module for use in other files
module.exports = Engineer;
