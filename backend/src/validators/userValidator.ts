export const validateUserInput = {
  name: (name: string) => {
    if (!/^[a-zA-Z\s]*$/.test(name)) {
      return "Name can only contain letters and spaces";
    }
    if (name.length < 3 || name.length > 50) {
      return "Name must be between 3 and 50 characters";
    }
    return null;
  },
  email: (email: string) => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      return "Email format is invalid";
    }
    return null;
  },
  gender: (gender: string) => {
    if (!["male", "female"].includes(gender)) {
      return "Gender must be either 'male' or 'female'";
    }
    return null;
  },
  password: (password: string) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }
    return null;
  },
};
