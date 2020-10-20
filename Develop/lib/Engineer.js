// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const engineer = {
	name: this.name,
	id: this.id,
	email: this.email,
	getName: () => this.name,
	getID: () => this.ID,
	getEmail: () => this.email,
	getRole: () => "Engineer",
};

module.exports = engineer;
