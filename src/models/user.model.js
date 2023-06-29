import jwt from "jsonwebtoken";

export class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  generateAuthToken() {
    const token = jwt.sign({ email: this.email }, process.env.JWT_SECRET);
    return token;
  }
}
