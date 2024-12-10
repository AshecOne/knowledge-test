"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { register } from "@/redux/thunks/authThunks";
import { AppDispatch, RootState } from "@/redux/store";
import { RegisterCredentials } from "@/types";
import { FormField } from "@/components/common/FormField";
import { useRegisterValidation } from "@/hooks/useRegisterValidation";
import Link from "next/link";
import { showToast } from "@/utils/toast";

export default function RegisterForm() {
  const [credentials, setCredentials] = useState<RegisterCredentials>({
    name: "",
    email: "",
    password: "",
    gender: "male",
  });

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading } = useSelector((state: RootState) => state.auth);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const validateForm = useRegisterValidation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateForm(credentials);
    setErrors(validation.errors);

    if (!validation.isValid) return;

    try {
      const result = await dispatch(register(credentials)).unwrap();
      if (result) {
        showToast.success("Registration successful! Please login to continue.");
        router.push("/login");
      }
    } catch (err) {
      showToast.error((err as Error).message || "Registration failed");
    }
  };

  const handleInputChange =
    (field: keyof RegisterCredentials) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCredentials({ ...credentials, [field]: e.target.value });
      if (errors[field]) {
        setErrors({ ...errors, [field]: "" });
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              href="/login"
              className="text-indigo-600 hover:text-indigo-500"
            >
              sign in to your account
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <FormField
              label="Name"
              type="text"
              id="name"
              value={credentials.name}
              onChange={handleInputChange("name")}
              error={errors.name}
              disabled={loading}
              placeholder="Full name"
            />

            <FormField
              label="Email"
              type="email"
              id="email"
              value={credentials.email}
              onChange={handleInputChange("email")}
              error={errors.email}
              disabled={loading}
              placeholder="Email address"
            />

            <FormField
              label="Password"
              type="password"
              id="password"
              value={credentials.password}
              onChange={handleInputChange("password")}
              error={errors.password}
              disabled={loading}
              placeholder="Password"
            />

            <div>
              <label className="text-sm font-medium text-gray-700">
                Gender
              </label>
              <div className="mt-2 space-x-4">
                {["male", "female"].map((gender) => (
                  <label key={gender} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value={gender}
                      checked={credentials.gender === gender}
                      onChange={() =>
                        setCredentials({
                          ...credentials,
                          gender: gender as "male" | "female",
                        })
                      }
                      className="form-radio h-4 w-4 text-indigo-600"
                      disabled={loading}
                    />
                    <span className="ml-2 capitalize">{gender}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
