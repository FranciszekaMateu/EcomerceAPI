class UserDTO {
    constructor(id, firstName, lastName, fullName, email, role) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = fullName;
        this.email = email;
        this.role = role;
    }
}

module.exports = UserDTO;
