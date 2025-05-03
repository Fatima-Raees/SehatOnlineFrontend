'use client';

import { useState, useEffect } from "react";
import { verifyOTP, sendOTP, signupUser } from "@/APIServices/users/usersAPI";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function OTPVerification() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

 
  const email = Cookies.get("userEmail") || "";

  useEffect(() => {
    if (!email) {
      setError("No email found. Please register first.");
    }
  }, [email]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
      setError("");
    } else {
      setError("OTP must be a 6-digit number");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError("OTP must be 6 digits");
      return;
    }

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await verifyOTP(email, otp);
      if (response.success) {
        const flow = Cookies.get("otpFlow");
        const userRole = Cookies.get("role");
        if(flow === "signup"){
          const tempUserData = Cookies.get("tempUserData");
          if (tempUserData) {
            const parsedData = JSON.parse(tempUserData);
            await signupUser(parsedData); 
            Cookies.remove("tempUserData");
            alert("Registration successful!");
            router.push("/login"); // Redirect to login page after successful signup
        }
        
      } else if (flow === "login") {
        
        if (userRole === "doctor") {
          window.location.href = "/Doctor/dashboard";
        } else if (userRole === "admin") {
          window.location.href = "/Admin/dashboard";
        } else if (userRole === "patient") {
          window.location.href = "/Patient/dashboard";
        }
      }
        
       
      } else {
        setError(response.message || "Verification failed");
      }
    } 
    catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await sendOTP(email);
      setMessage("OTP resent successfully.");
    } catch (err) {
      setError("Failed to resend OTP. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold text-center">OTP Verification</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="text"
            value={otp}
            onChange={handleChange}
            maxLength={6}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg tracking-widest"
            placeholder="Enter OTP"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
        <button
          onClick={handleResend}
          className="w-full mt-3 text-blue-600 hover:underline"
        >
          Resend OTP
        </button>
        {message && <p className="text-green-500 text-sm mt-2">{message}</p>}
      </div>
    </div>
  );
}
