'use client'
import { useAuth } from "@/components/Proveiders/AuthProvider";
import React from "react";

function page() {
  const { signOut,isLoading } = useAuth();
  return (
    <div>
      <button
      onClick={signOut}
      disabled={isLoading}
      className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded cursor-pointer"
      >Log out</button>
    </div>
  );
}

export default page;
