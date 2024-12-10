import Link from "next/link";
import LoadingSpinner from "../common/LoadingSpinner";

interface DesktopAuthButtonsProps {
  user: any;
  loading: boolean;
  onLogout: () => void;
}

export const DesktopAuthButtons = ({
  user,
  loading,
  onLogout,
}: DesktopAuthButtonsProps) => (
  <div className="hidden sm:ml-6 sm:flex sm:items-center">
    {loading ? (
      <LoadingSpinner />
    ) : user ? (
      <button
        onClick={onLogout}
        className="ml-8 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Logout
      </button>
    ) : (
      <div className="space-x-4">
        <Link
          href="/login"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Register
        </Link>
      </div>
    )}
  </div>
);
