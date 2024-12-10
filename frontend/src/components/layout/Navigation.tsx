"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { usePathname, useRouter } from "next/navigation";
import { logout, initializeAuth } from "@/redux/thunks/authThunks";
import LoadingSpinner from "../common/LoadingSpinner";
import { showToast } from "@/utils/toast";
import { BASE_NAVIGATION, AUTH_NAVIGATION } from "@/utils/constant";
import { NavBrand } from "./NavBrand";
import { DesktopMenu } from "./DesktopMenu";
import { DesktopAuthButtons } from "./DesktopAuthButtons";
import { MobileMenuButton } from "./MobileMenuButton";
import { MobileMenu } from "./MobileMenu";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, initialized } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (!initialized) {
      dispatch(initializeAuth());
    }
  }, [dispatch, initialized]);

  const handleLogout = async () => {
    await dispatch(logout());
    showToast.info("Logged out successfully");
    router.push("/login");
  };

  if (!initialized) {
    return <LoadingSpinner />;
  }

  const navigation = [...BASE_NAVIGATION, ...(user ? AUTH_NAVIGATION : [])];

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <NavBrand />
            <DesktopMenu navigation={navigation} currentPath={pathname} />
          </div>

          <DesktopAuthButtons
            user={user}
            loading={loading}
            onLogout={handleLogout}
          />

          <MobileMenuButton
            isOpen={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        </div>

        <MobileMenu
          isOpen={isMenuOpen}
          navigation={navigation}
          currentPath={pathname}
          user={user}
          onLogout={handleLogout}
        />
      </div>
    </nav>
  );
}
