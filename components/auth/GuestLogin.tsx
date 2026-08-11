"use client";

import { useState } from "react";

type GuestLoginProps = {
  onLogin?: () => void;
};

export default function GuestLogin({ onLogin }: GuestLoginProps) {
  const [loading, setLoading] = useState(false);

  const handleGuestLogin = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      onLogin?.();
    }, 500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fafafa] px-4">
      <div className="w-full max-w-[400px] rounded-xl border border-[#e5e5e5] bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#171717] text-sm font-semibold text-white">
            A
          </div>

          <h1 className="text-xl font-semibold text-[#171717]">
            Welcome to AbleSpace
          </h1>

          <p className="mt-2 text-sm text-[#777777]">
            Sign in to continue to your workspace
          </p>
        </div>

        <button
          type="button"
          onClick={handleGuestLogin}
          disabled={loading}
          className="w-full rounded-md bg-[#171717] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#333333] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Continue as Guest"}
        </button>
      </div>
    </div>
  );
}