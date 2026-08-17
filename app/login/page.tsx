"use client";

import { useRouter } from "next/navigation";
import GuestLogin from "@/components/auth/GuestLogin";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    localStorage.setItem("ablespace-auth", "guest");
    router.push("/");
  };

  return <GuestLogin onLogin={handleLogin} />;
}