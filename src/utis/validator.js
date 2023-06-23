exports.Validator = class Validator {
    isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  
    isValidPassword(password) {
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);
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
        this.isValidId(user.id) &&
        this.isValidUsername(user.username) &&
        this.isValidPassword(user.password) &&
        this.isValidEmail(user.email) &&
        this.isValidRole(user.role) &&
        this.isValidPhone(user.phone) &&
        this.isValidUserTypeCode(user.userTypeCode)
      );
    }
  };