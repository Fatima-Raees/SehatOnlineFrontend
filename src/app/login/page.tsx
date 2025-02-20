"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log("Logging in with", { email, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-sm p-6 bg-white shadow-md rounded-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">Login</Button>
          </form>
          <p className="mt-2 text-center text-sm text-gray-600">
            <a href="#" className="text-blue-500 hover:underline">Forgot password?</a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
