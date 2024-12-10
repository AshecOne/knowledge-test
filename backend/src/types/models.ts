// User model type
export interface UserAttributes {
  id?: number;
  name: string;
  email: string;
  password: string;
  gender: "male" | "female";
}

export interface UserCreationAttributes extends Omit<UserAttributes, "id"> {}

// Product model type
export interface ProductAttributes {
  id?: number;
  name: string;
  description: string;
  price: number;
  image: string | null;
  userId: number;
}