// TODO: Write code to define and export the Employee class
const employee = {
	name: this.name,
	id: this.id,
	email: this.email,
	getName: () => this.name,
	getID: () => this.ID,
	getEmail: () => this.email,
	getRole: () => "Employee",
};

module.exports = employee;
