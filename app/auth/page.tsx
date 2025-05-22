'use client'
import LoginPage from "@/components/Authentication/Login";
import RegisterPage from "@/components/Authentication/Register";
import { authPageStateAtom } from "@/store/pageState";
import { useAtom } from "jotai";
import React from "react";

function page() {
  const [pageState, setPageState] = useAtom(authPageStateAtom);
  return <>{pageState === "signup" ? <RegisterPage /> : <LoginPage />}</>;
}

export default page;
