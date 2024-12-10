"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { initializeAuth } from "@/redux/thunks/authThunks";

export function useAuth() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { token, initialized } = useSelector((state: RootState) => state.auth);

   const getTokenFromStorage = () => {
     if (typeof window === "undefined") return null;

     return (
       localStorage.getItem("token") ||
       document.cookie
         .split("; ")
         .find((row) => row.startsWith("token="))
         ?.split("=")[1] ||
       null
     );
   };

  useEffect(() => {
    if (!initialized) {
      dispatch(initializeAuth());
    }
  }, [initialized, dispatch]);

  useEffect(() => {
    if (initialized && !token && !getTokenFromStorage()) {
      router.replace("/login");
    }
  }, [initialized, token, router]);

  return {
    isAuthenticated: !!token || !!getTokenFromStorage(),
    isInitialized: initialized,
  };
}
