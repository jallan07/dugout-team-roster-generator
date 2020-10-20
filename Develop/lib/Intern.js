// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
// import the Employee class to build on top of it
const Employee = require("./Employee");
// create the Intern class, and extend it on to the Employee class
class Intern extends Employee {
	constructor(name, id, email, school) {
		// grab the previously created values from the employee class
		super(name, id, email);
		// add on the school value
		this.school = school;
	}

	// overwrite the getRole funciton so that it returns the proper position
	getRole() {
		return "Intern";
	}
	// create the getSchool() function to extend onto the employee class
	getSchool() {
		return this.school;
	}
}
// export this module for use in other files
module.exports = Intern;
