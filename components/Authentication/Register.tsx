"use client";

import { useState } from "react";
import { useAuth } from "../Proveiders/AuthProvider";
import Link from "next/link";
import { useAtom } from "jotai";
import { authPageStateAtom } from "@/store/pageState";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authPageState, setAuthPageState] = useAtom(authPageStateAtom);

  const { registerWithEmailPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    if (!name) {
      setError("Name is required");
      return;
    }

    if (!phone) {
      setError("Phone number is required");
      return;
    }

    setLoading(true);
    setError(null);

    const { error } = await registerWithEmailPassword(
      email,
      password,
      name,
      phone
    );

    setLoading(false);

    if (error) {
      setError(error.message);
    }
    // Redirect is handled in the context
  };

  return (
    <div className=" flex flex-col items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white shadow rounded-xl">
        <h1 className="text-xl font-semibold mb-4 text-center">
          Create Account
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />

          <input
            type="tel"
            placeholder="Phone Number (e.g. +919876543210)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          <p>
            Already have an account?{" "}
            <button
              onClick={() => setAuthPageState("login")}
              className="text-green-700 hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
