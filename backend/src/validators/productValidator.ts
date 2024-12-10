export const validateProductInput = {
  name: (name?: string) => {
    if (!name || name.trim().length < 3) {
      return "Name must be at least 3 characters long";
    }
    return null;
  },
  description: (description?: string) => {
    if (!description) {
      return "Description is required";
    }
    return null;
  },
  price: (price?: string | number) => {
    const priceNum = typeof price === "string" ? parseFloat(price) : price;
    if (isNaN(priceNum!) || priceNum! <= 0) {
      return "Price must be a positive number";
    }
    return null;
  },
};
