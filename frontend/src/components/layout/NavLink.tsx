"use client";
import Link from "next/link";

interface NavLinkProps {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
  isMobile?: boolean;
}

export const NavLink = ({
  href,
  isActive,
  children,
  isMobile = false,
}: NavLinkProps) => {
  const baseStyles = isMobile
    ? "block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
    : "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium";

  const activeStyles = isMobile
    ? "bg-indigo-50 border-indigo-500 text-indigo-700"
    : "border-indigo-500 text-gray-900";

  const inactiveStyles = isMobile
    ? "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700";

  return (
    <Link
      href={href}
      className={`${baseStyles} ${isActive ? activeStyles : inactiveStyles}`}
    >
      {children}
    </Link>
  );
};