import { NavLink } from "./NavLink";
import Link from "next/link";

interface MobileMenuProps {
  isOpen: boolean;
  navigation: Array<{ name: string; href: string }>;
  currentPath: string;
  user: any;
  onLogout: () => void;
}

export const MobileMenu = ({
  isOpen,
  navigation,
  currentPath,
  user,
  onLogout,
}: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="sm:hidden">
      <div className="pt-2 pb-3 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            href={item.href}
            isActive={currentPath === item.href}
            isMobile
          >
            {item.name}
          </NavLink>
        ))}
        {user ? (
          <button
            onClick={onLogout}
            className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              href="/login"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
