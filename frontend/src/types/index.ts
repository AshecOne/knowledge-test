// Auth related types
export interface User {
  id?: string;
  name: string;
  email: string;
  gender: Gender;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
}

export type Gender = "male" | "female";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
  gender: Gender;
}

// Form related types
export interface FormData {
  name: string;
  email: string;
  gender: Gender;
}

export interface FormFieldProps {
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
}

export interface EditProfileFormProps {
  onClose: () => void;
}

// Product related types
export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  userId?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  selectedProduct: Product | null;
}