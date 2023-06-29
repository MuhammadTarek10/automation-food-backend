export class Validator {
  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  isValidPassword(password) {
    // return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);
    return password.length >= 8; // && /[A-Z]/.test(password);
  }

  isValidPhone(phone) {
    return /^\d{10}$/.test(phone);
  }

  isValidRole(role) {
    return /^(admin|user)$/.test(role);
  }

  isValidUserTypeCode(userTypeCode) {
    return /^(admin|user)$/.test(userTypeCode);
  }

  isValidUsername(username) {
    return /^[a-zA-Z0-9]{5,}$/.test(username);
  }

  isValidId(id) {
    return /^\d+$/.test(id);
  }

  isValidUser(user) {
    return (
      user &&
      this.isValidEmail(user.email) &&
      this.isValidPassword(user.password)
    );
  }

  isValidName(name) {
    return /^[a-zA-Z ]+$/.test(name);
  }

  isValidPrice(price) {
    return /^\d+$/.test(price);
  }

  isValidFood(food) {
    return food && this.isValidName(food.name) && this.isValidPrice(food.price);
  }

  isValidCode(code) {
    return /^[a-zA-Z0-9]{3,}$/.test(code);
  }

  isValidRoom(room) {
    return room && this.isValidName(room.name) && this.isValidCode(room.code);
  }
}
