"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getProfile } from "@/redux/thunks/authThunks";
import { useAuth } from "@/hooks/useAuth";
import EditProfileForm from "@/components/profile/EditProfileForm";
import CenteredSpinner from "@/components/common/CenteredSpinner";
import { PageContainer } from "@/components/layout/PageContainer";

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user, token, loading, error } = useSelector(
    (state: RootState) => state.auth
  );
  const [showEditModal, setShowEditModal] = useState(false);
  const { isAuthenticated, isInitialized } = useAuth();
  const pageTitle = "Profile Information";
  const pageDescription = "Personal details and account information.";

  useEffect(() => {
    if (token) {
      dispatch(getProfile(token));
    }
  }, [dispatch, token]);

  if (!isInitialized) {
    return <CenteredSpinner />;
  }

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return <CenteredSpinner />;
  }

  if (!user) {
    return null;
  }

  return (
    <PageContainer title={pageTitle} description={pageDescription}>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Personal Profile
              </h3>
            </div>
            <button
              onClick={() => setShowEditModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {showEditModal && (
          <EditProfileForm onClose={() => setShowEditModal(false)} />
        )}
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.name}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Email address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.email}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Gender</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-700">{error}</div>
        </div>
      )}

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => router.push("/products")}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          View My Products
        </button>

        <button
          onClick={() => router.push("/products/create")}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Add New Product
        </button>
      </div>
    </PageContainer>
  );
}
