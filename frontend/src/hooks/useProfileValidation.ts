import { FormData } from "@/types";

export function useProfileValidation(formData: FormData) {
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[a-zA-Z\s]*$/.test(formData.name)) {
      newErrors.name = "Name can only contain letters and spaces";
    } else if (formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters long";
    } else if (formData.name.length > 50) {
      newErrors.name = "Name cannot exceed 50 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email format is invalid";
    }

    return {
      errors: newErrors,
      isValid: Object.keys(newErrors).length === 0,
    };
  };

  return validateForm;
}