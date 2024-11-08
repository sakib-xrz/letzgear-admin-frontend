/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import removeAccessToken from "@/actions/removeAccessToken";
import { logout, removeUserInfo } from "@/utils/auth";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    const logOut = async () => {
      await logout();
      removeUserInfo();
      await removeAccessToken();
      router.push("/login");
    };

    logOut();
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 size={32} className="animate-spin text-primary" />
    </div>
  );
}
