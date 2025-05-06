"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { loginUser ,sendOTP} from "../../../APIServices/users/usersAPI";
import Cookies from "js-cookie";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  sub: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
}

export default function LoginPage() {
  const [isDoctor, setIsDoctor] = useState(false);
  const [email, setEmail] = useState("");
  // Removed unused router
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isValidTokenStructure = (decodedToken: CustomJwtPayload): boolean => {
    return (
      decodedToken &&
      typeof decodedToken === "object" &&
      "sub" in decodedToken &&
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role" in decodedToken
    );
  };

  const handleLogin = async () => {
    try {
      setError("");

      const response = await loginUser(email, password);
      console.log(response);

      if (!response.success) {
        setError(response.data?.message || "Login failed. Please try again.");
        return;
      }

      const token = response.data.token || response.data?.token;
      if (!token) throw new Error("Token not found");

      const decodedToken = jwtDecode<CustomJwtPayload>(token);
      console.log("Decoded JWT:", decodedToken);

      if (!isValidTokenStructure(decodedToken)) throw new Error("Invalid token structure");

      const PersonID = decodedToken.sub;
      const userRole = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      console.log(PersonID, userRole);

      const expirationTime = new Date(new Date().getTime() + 60 * 60 * 1000); // 60 minutes from now
      Cookies.set("token", token, { expires: expirationTime });
      Cookies.set("role", userRole, { expires: expirationTime });
      Cookies.set("PersonID", PersonID, { expires: expirationTime });
      Cookies.set("loggedIn", "true", { expires: expirationTime });
      alert("Login successful!");

      const roleRedirects: Record<string, string> = {
        Doctor: "/Doctor/dashboard",
        Admin: "/Admin/dashboard",
        Patient: "/",
      };
      console.log(userRole);
      window.location.href = roleRedirects[userRole] || "/";
    } catch (err) {
      console.error(err);
      setError("Invalid email or password.");
    }
  };
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative w-[768px] min-h-[480px] bg-white rounded-2xl shadow-lg overflow-hidden">

          {/* Patient Login Form */}
          <div className={`absolute top-0 left-0 h-full w-1/2 p-10 flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${isDoctor ? "opacity-0 -translate-x-full pointer-events-none" : "opacity-100 translate-x-0 pointer-events-auto"}`}>
            <h1 className="text-2xl font-semibold text-[#0A192F]">Patient Login</h1>
            {/* <a href="#" className="p-2 border rounded-lg w-48 flex items-center justify-center space-x-2 hover:bg-gray-100 transition mt-3">
              <FontAwesomeIcon icon={faGoogle} className="text-xl text-red-500" />
              <span className="text-sm font-medium">Continue with Google</span>
            </a> */}
            <span className="text-sm text-gray-600 mt-2">or use your email to login</span>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {/* <Link href="/forgot-password" className="text-sm text-[#2563EB] mt-2">Forgot Your Password?</Link> */}
            <button onClick={handleLogin} className="mt-4 bg-[#0077B6] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:bg-[#005F91] hover:shadow-lg">Sign In</button>
            <Link href="/signup" className="text-sm text-[#2563EB] mt-2">Don't have an account? Sign Up</Link>
          </div>

          {/* Doctor Login Form */}
          <div className={`absolute top-0 right-0 h-full w-1/2 p-10 flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${isDoctor ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-0 translate-x-full pointer-events-none"}`}>
            <h1 className="text-2xl font-semibold text-[#0A192F]">Doctor Login</h1>
            {/* <a href="#" className="p-2 border rounded-lg w-48 flex items-center justify-center space-x-2 hover:bg-gray-100 transition mt-3">
              <FontAwesomeIcon icon={faGoogle} className="text-xl text-red-500" />
              <span className="text-sm font-medium">Continue with Google</span>
            </a> */}
            <span className="text-sm text-gray-600 mt-2">or use your email to login</span>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {/* <Link href="/forgot-password" className="text-sm text-[#2563EB] mt-2">Forgot Your Password?</Link> */}
            <button onClick={handleLogin} className="mt-4 bg-[#0077B6] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:bg-[#005F91] hover:shadow-lg">Sign In</button>
            <Link href="/signup" className="text-sm text-[#2563EB] mt-2">Don't have an account? Sign Up</Link>
          </div>

          {/* Toggle Panel */}
          <div className={`absolute top-0 left-1/2 h-full w-1/2 bg-[#023E8A] text-white flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${isDoctor ? "-translate-x-full" : "translate-x-0"}`}>
            {isDoctor ? (
              <>
                <h1 className="text-2xl font-semibold">Looking for Patient Login?</h1>
                <p className="text-center px-6 mt-2">Login as a patient to access healthcare services.</p>
                <button onClick={() => setIsDoctor(false)} className="mt-4 border-white border px-6 py-2 rounded-lg transition-all duration-300 hover:bg-[#0077B6] hover:text-white hover:border-[#0077B6]">Patient Login</button>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-semibold">Looking for Doctor Login?</h1>
                <p className="text-center px-6 mt-2">Login as a doctor to manage your patients.</p>
                <button onClick={() => setIsDoctor(true)} className="mt-4 border-white border px-6 py-2 rounded-lg transition-all duration-300 hover:bg-[#0077B6] hover:text-white hover:border-[#0077B6]">Doctor Login</button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }