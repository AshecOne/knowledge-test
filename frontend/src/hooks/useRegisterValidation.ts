import { RegisterCredentials } from "@/types";

export function useRegisterValidation() {
  const validateForm = (data: RegisterCredentials) => {
    const newErrors: { [key: string]: string } = {};

    if (!data.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[a-zA-Z\s]*$/.test(data.name)) {
      newErrors.name = "Name can only contain letters and spaces";
    } else if (data.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters long";
    } else if (data.name.length > 50) {
      newErrors.name = "Name cannot exceed 50 characters";
    }

    if (!data.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Email format is invalid";
    }

    if (!data.password) {
      newErrors.password = "Password is required";
    } else if (data.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    return {
      errors: newErrors,
      isValid: Object.keys(newErrors).length === 0,
    };
  };

  return validateForm;
}
