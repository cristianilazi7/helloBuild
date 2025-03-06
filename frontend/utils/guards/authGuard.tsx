"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { useRouter } from "next/navigation";
import { RootState } from "@/app/store/store";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.push("/");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated) {
    return <p>Unauthorized</p>;
  }

  return <>{children}</>;
};

export default AuthGuard;
