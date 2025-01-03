import { Menu, X } from "lucide-react";

interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const MobileMenuButton = ({
  isOpen,
  onClick,
}: MobileMenuButtonProps) => (
  <div className="-mr-2 flex items-center sm:hidden">
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
    >
      {isOpen ? (
        <X className="block h-6 w-6" />
      ) : (
        <Menu className="block h-6 w-6" />
      )}
    </button>
  </div>
);
