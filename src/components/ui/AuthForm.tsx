"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface AuthFormProps {
  role: "doctor" | "patient"; // Role comes from the route
  type: "login" | "signup"; // Type of form
}

export default function AuthForm({ role, type }: AuthFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cnic, setCnic] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (type === "signup" && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log(`${type} for ${role}:`, { name, email, cnic, phone, password });

    // Send data to backend
  };

  const handleGoogleAuth = () => {
    console.log(`Google ${type} for ${role}`);
    // Call Google authentication API
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-sm p-6 bg-white shadow-md rounded-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold">
            {type === "signup" ? "Sign Up" : "Login"} as {role === "doctor" ? "Doctor" : "Patient"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {type === "signup" && (
              <>
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="cnic">CNIC</Label>
                  <Input id="cnic" type="text" value={cnic} onChange={(e) => setCnic(e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
              </>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {type === "signup" && (
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              </div>
            )}

            <Button type="submit" className="w-full">
              {type === "signup" ? "Sign Up" : "Login"}
            </Button>

            {/* Google Authentication Button */}
            <Button onClick={handleGoogleAuth} className="w-full bg-red-500 hover:bg-red-600 text-white">
              {type === "signup" ? "Sign Up with Google" : "Login with Google"}
            </Button>

            {/* Forgot Password Link (only on login) */}
            {type === "login" && (
              <div className="text-center mt-3">
                <Link href={`/forgot-password?role=${role}`} className="text-blue-600 hover:underline">
                  Forgot Password?
                </Link>
              </div>
            )}

            {/* Toggle between Login and Sign-up */}
            <div className="text-center mt-2">
              {type === "login" ? (
                <p>
                  Don't have an account?{" "}
                  <Link href={`/${role}/signup`} className="text-blue-600 hover:underline">
                    Sign Up
                  </Link>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <Link href={`/${role}/login`} className="text-blue-600 hover:underline">
                    Login
                  </Link>
                </p>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
