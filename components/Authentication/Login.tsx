'use client';

import { useState } from "react";
import { useAuth } from "../Proveiders/AuthProvider";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { signInWithOtp, verifyOtp } = useAuth();

  const handleSendOtp = async () => {
    setLoading(true);
    setError(null);
    
    const { error } = await signInWithOtp(phone);
    
    setLoading(false);
    
    if (error) {
      setError(error.message);
    } else {
      setStep("otp");
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    setError(null);
    
    const { error } = await verifyOtp(phone, otp);
    
    setLoading(false);
    
    if (error) {
      setError(error.message);
    }
    // Redirect is handled in the context
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow rounded-xl">
        <h1 className="text-xl font-semibold mb-4 text-center">
          Login with Phone
        </h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {step === "phone" ? (
          <>
            <input
              type="tel"
              placeholder="Enter phone (e.g. +919876543210)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <button
              onClick={() => setStep("phone")}
              className="w-full mt-2 text-blue-500 py-2"
            >
              Back to phone entry
            </button>
          </>
        )}
      </div>
    </div>
  );
}