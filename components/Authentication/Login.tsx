"use client";

import { useState } from "react";
import { useAuth } from "../Proveiders/AuthProvider";
import Link from "next/link";
import { authPageStateAtom } from "@/store/pageState";
import { useAtom } from "jotai";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authPageState, setAuthPageState] = useAtom(authPageStateAtom);
  const { signInWithEmailPassword } = useAuth();

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

    setLoading(true);
    setError(null);

    const { error } = await signInWithEmailPassword(email, password);

    setLoading(false);

    if (error) {
      setError(error.message);
    }
    // Redirect is handled in the context
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow rounded-xl">
        <h1 className="text-xl font-semibold mb-4 text-center">Login</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            className="w-full bg-text-green hover:bg-green-700 text-white py-2 rounded"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          <p>
            Don't have an account?{" "}
            <button
              onClick={() => setAuthPageState("signup")}
              className="text-text-green hover:underline"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
