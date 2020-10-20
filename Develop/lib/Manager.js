// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
// import the Employee class
const Employee = require("./Employee");
// create the Manager class, and extend it on to the employee class
class Manager extends Employee {
	constructor(name, id, email, officeNumber) {
		// grab the previously created values from the employee class
		super(name, id, email);
		// add on the office Number value
		this.officeNumber = officeNumber;
	}
	// overwrite the getRole function so that it returns the proper position
	getRole() {
		return "Manager";
	}
	// create the getOfficeNumber function to extend onto the employee class
	getOfficeNumber() {
		return this.officeNumber;
	}
}
// export the module for use in other files
module.exports = Manager;
