// TODO: Write code to define and export the Employee class
// define the class object
class Employee {
	// create the main constructor for the employee class
	constructor(name, id, email) {
		this.name = name;
		this.id = id;
		this.email = email;
	}
	// define the getName function
	getName() {
		return this.name;
	}
	// define the getID function
	getId() {
		return this.id;
	}
	// define the getEmail function
	getEmail() {
		return this.email;
	}
	// define the getRole function
	getRole() {
		return "Employee";
	}
}
// Export the class so that we can access it in other files
module.exports = Employee;
