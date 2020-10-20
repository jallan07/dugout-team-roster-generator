// TODO: Write code to define and export the Employee class

// Create the constructor for the class
function Employee(name, id, email, getName, getID, getEmail, getRole) {
	(this.name = name),
		(this.id = id),
		(this.email = email),
		(this.getName = getName()),
		(this.getID = getID()),
		(this.getEmail = getEmail()),
		(this.getRole = getRole());
}

// Define the getName prototype
Employee.prototype.getName() = function () {
	return this.name;
};

// Define the getID prototype
Employee.prototype.getID() = function () {
	return this.id;
};

// Define the getEmail prototype
Employee.prototype.getEmail() = function () {
	return this.email;
};

// Define the getRole prototype
Employee.prototype.getRole() = function () {
	return "Employee";
};

// Export the class
module.exports = Employee;
