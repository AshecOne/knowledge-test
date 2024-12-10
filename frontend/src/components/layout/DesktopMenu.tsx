import { NavLink } from "./NavLink";

interface DesktopMenuProps {
  navigation: Array<{ name: string; href: string }>;
  currentPath: string;
}

export const DesktopMenu = ({ navigation, currentPath }: DesktopMenuProps) => (
  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
    {navigation.map((item) => (
      <NavLink
        key={item.name}
        href={item.href}
        isActive={currentPath === item.href}
      >
        {item.name}
      </NavLink>
    ))}
  </div>
);
