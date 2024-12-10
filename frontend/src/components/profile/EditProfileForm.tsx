"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { updateProfile } from "@/redux/thunks/authThunks";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { showToast } from "@/utils/toast";
import { Gender, FormData, EditProfileFormProps } from "@/types";
import { useProfileValidation } from "@/hooks/useProfileValidation";
import { FormField } from "@/components/common/FormField";

export default function EditProfileForm({ onClose }: EditProfileFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [formData, setFormData] = useState<FormData>({
    name: user?.name || "",
    email: user?.email || "",
    gender: (user?.gender as Gender) || "male",
  });

  const handleGenderChange = (gender: Gender) => {
    setFormData({ ...formData, gender });
  };

  const validateForm = useProfileValidation(formData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateForm();
    setErrors(validation.errors);

    if (!validation.isValid) {
      return;
    }

    try {
      const result = await dispatch(updateProfile(formData)).unwrap();
      if (result) {
        showToast.success("Profile updated successfully!");
        onClose();
      }
    } catch (err) {
      showToast.error((err as Error).message || "Failed to update profile");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Edit Profile
          </h3>
          {errors.global && (
            <div className="mb-4 bg-red-50 p-4 rounded-md">
              <p className="text-sm text-red-700">{errors.global}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField
              label="Name"
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              error={errors.name}
            />
            <FormField
              label="Email"
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              error={errors.email}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <div className="mt-2 space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={() => handleGenderChange("male")}
                    className="form-radio h-4 w-4 text-indigo-600"
                  />
                  <span className="ml-2">Male</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={() => handleGenderChange("female")}
                    className="form-radio h-4 w-4 text-indigo-600"
                  />
                  <span className="ml-2">Female</span>
                </label>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    <LoadingSpinner />
                    <span className="ml-2">Updating...</span>
                  </div>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
