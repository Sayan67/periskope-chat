"use client";
import LoginPage from "@/components/Authentication/Login";
import RegisterPage from "@/components/Authentication/Register";
import { authPageStateAtom } from "@/store/pageState";
import { useAtom } from "jotai";
import Image from "next/image";
import React from "react";

function page() {
  const [pageState, setPageState] = useAtom(authPageStateAtom);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100 p-4">
      <div className="flex items-center mb-8 gap-2">
        <Image
          src={
            "https://media.licdn.com/dms/image/v2/D4E0BAQEi-Cj3qTHuAg/company-logo_200_200/company-logo_200_200/0/1692600818066?e=1753315200&v=beta&t=yn5iRbgwjSbLn6oEveZTug-qafIVv0u3hxgz5slSVxk"
          }
          alt="Logo"
          width={45}
          height={45}
          className="object-contain rounded-full overflow-hidden"
        />
        <h1 className="text-xl font-bold text-green-700">Periskope Chat</h1>
      </div>
      {pageState === "signup" ? <RegisterPage /> : <LoginPage />}
    </div>
  );
}

export default page;
