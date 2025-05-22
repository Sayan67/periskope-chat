'use client'
import React from "react";
import { useAuth } from "../Proveiders/AuthProvider";

function Header() {
  const { signOut, isLoading } = useAuth();
  return (
    <div className="w-full h-[60px] bg-white border-b border-gray-200 flex items-center justify-between px-4 top-0 left-0">
      Header
      <button
        onClick={signOut}
        disabled={isLoading}
        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded cursor-pointer"
      >
        Log out
      </button>
    </div>
  );
}

export default Header;
