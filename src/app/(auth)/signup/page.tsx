"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { checkDuplicate, getAllDoctorSpecializations, sendOTP } from "../../../APIServices/users/usersAPI";
import Link from "next/link";
import Cookies from 'js-cookie';
export default function SignupPage() {
  const router = useRouter();
  const [isDoctor, setIsDoctor] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    CNIC: "",
    phone: "",
    email: "",
    password: "",
    registrationNumber: "",
    specialization: "",
    role: "",
    AuthMethod: "local",
  });

  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const [loading, setLoading] = useState(false);
  const [specializations, setSpecializations] = useState<{ lookupID: number; value: string }[]>([]);

  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const response = await getAllDoctorSpecializations();
        if (!response || !Array.isArray(response.data)) {
          throw new Error("Invalid API response: Expected an array inside response.data.");
        }
        const formatted = response.data.map((spec: any) => ({
          lookupID: spec.lookupID,
          value: spec.value,
        }));
        setSpecializations(formatted);
      } catch (error) {
        console.error("Failed to fetch specializations:", error);
      }
    };
    fetchSpecializations();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string[] } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cnicRegex = /^\d{5}\d{7}\d{1}$/;
    const phoneRegex = /^03\d{9}$/;

    if (!formData.name) newErrors.name = ["Name is required."];
    if (!formData.CNIC || !cnicRegex.test(formData.CNIC)) newErrors.CNIC = ["Enter a valid CNIC (e.g., 12345-6789012-3)."];
    if (!formData.phone || !phoneRegex.test(formData.phone)) newErrors.phone = ["Enter a valid phone number (e.g., 03XXXXXXXXX)."];
    if (!formData.email || !emailRegex.test(formData.email)) newErrors.email = ["Enter a valid email."];
    if (!formData.password || formData.password.length < 6) newErrors.password = ["Password must be at least 6 characters long."];

    if (isDoctor) {
      if (!formData.registrationNumber) newErrors.registrationNumber = ["Registration number is required."];
      if (!formData.specialization) newErrors.specialization = ["Select a specialization."];
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setErrors({});
    if (!validateForm()) return;
  
    setLoading(true);
    const updatedFormData = { ...formData, role: isDoctor ? "Doctor" : "Patient" };
  
    try {
      
      const duplicateResponse = await checkDuplicate(updatedFormData.email, updatedFormData.CNIC);
  
      if (!duplicateResponse.success) {
        setErrors(duplicateResponse.errors || {});
        setLoading(false);
        return;
      }

      Cookies.set("tempUserData", JSON.stringify(updatedFormData));
      Cookies.set("userEmail", updatedFormData.email);
  
      
      await sendOTP(updatedFormData.email);
      alert("OTP has been sent");
      router.push("/ConfirmationCode");
  
    } catch (error: any) {
      console.error("Error in handleSubmit:", error);
      setErrors(error.errors || {});
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r">
      <div className="relative w-[768px] min-h-[640px] bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* Patient Sign Up Form */}
        <form
          onSubmit={handleSubmit}
          className={`absolute top-0 left-0 h-full w-1/2 p-10 flex flex-col items-center justify-center transition-all duration-500 ${isDoctor ? "pointer-events-none -translate-x-full opacity-0" : "pointer-events-auto opacity-100"}`}
        >
          <h1 className="text-2xl font-semibold text-[#0A192F]">Patient Sign Up</h1>

          <a href="#" className="p-2 border rounded-lg w-48 flex items-center justify-center space-x-2 hover:bg-gray-100 transition mt-3">
            <FontAwesomeIcon icon={faGoogle} className="text-xl text-red-500" />
            <span className="text-sm font-medium">Continue with Google</span>
          </a>

          <span className="text-sm text-gray-600 mt-2">or use your email to register</span>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" />
          {errors.name && <p className="text-red-500">{errors.name[0]}</p>}

          <input type="text" name="CNIC" placeholder="CNIC (e.g., 12345-6789012-3)" value={formData.CNIC} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" />
          {errors.CNIC && <p className="text-red-500">{errors.CNIC[0]}</p>}

          <input type="text" name="phone" placeholder="Phone Number (e.g., 03XXXXXXXXX)" value={formData.phone} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" />
          {errors.phone && <p className="text-red-500">{errors.phone[0]}</p>}

          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" />
          {errors.email && <p className="text-red-500">{errors.email[0]}</p>}

          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" />
          {errors.password && <p className="text-red-500">{errors.password[0]}</p>}

          <button type="submit" className="mt-4 bg-[#0077B6] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:bg-[#005F91]" disabled={loading}>
            {loading ? "Registering..." : "Sign Up"}
          </button>
          <Link href="/login" className="text-sm text-[#2563EB] mt-2">Already have an account? Login</Link>
        </form>

        {/* Doctor Sign Up Form */}
        <form
          onSubmit={handleSubmit}
          className={`absolute top-0 left-0 h-full w-1/2 p-10 flex flex-col items-center justify-center transition-all duration-500 ${isDoctor ? "pointer-events-auto translate-x-full opacity-100 z-10" : "pointer-events-none opacity-0"}`}
        >
          <h1 className="text-2xl font-semibold text-[#0A192F]">Doctor Sign Up</h1>

          <a href="#" className="p-2 border rounded-lg w-48 flex items-center justify-center space-x-2 hover:bg-gray-100 transition mt-3">
            <FontAwesomeIcon icon={faGoogle} className="text-xl text-red-500" />
            <span className="text-sm font-medium">Continue with Google</span>
          </a>

          <span className="text-sm text-gray-600 mt-2">or use your email to register</span>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" />
          {errors.name && <p className="text-red-500">{errors.name[0]}</p>}

          <input type="text" name="CNIC" placeholder="CNIC" value={formData.CNIC} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" />
          {errors.CNIC && <p className="text-red-500">{errors.CNIC[0]}</p>}

          <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" />
          {errors.phone && <p className="text-red-500">{errors.phone[0]}</p>}

          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" />
          {errors.email && <p className="text-red-500">{errors.email[0]}</p>}

          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" />
          {errors.password && <p className="text-red-500">{errors.password[0]}</p>}

          <input type="text" name="registrationNumber" placeholder="Medical Registration Number" value={formData.registrationNumber} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" />
          {errors.registrationNumber && <p className="text-red-500">{errors.registrationNumber[0]}</p>}

          <select name="specialization" value={formData.specialization} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border">
            <option value="" disabled>Select Specialization</option>
            {specializations.map((spec) => (
              <option key={spec.lookupID} value={spec.lookupID}>{spec.value}</option>
            ))}
          </select>
          {errors.specialization && <p className="text-red-500">{errors.specialization[0]}</p>}

          <button type="submit" className="mt-4 bg-[#0077B6] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:bg-[#005F91]" disabled={loading}>
            {loading ? "Registering..." : "Sign Up"}
          </button>
          <Link href="/login" className="text-sm text-[#2563EB] mt-2">Already have an account? Login</Link>
        </form>

        {/* Side Panel */}
        <div className={`absolute top-0 left-1/2 h-full w-1/2 bg-[#023E8A] text-white flex flex-col items-center justify-center transition-all duration-500 ${isDoctor ? "-translate-x-full" : ""}`}>
          {isDoctor ? (
            <>
              <h1 className="text-2xl font-semibold">Looking for Patient Sign Up?</h1>
              <p className="text-center px-6 mt-2">Register as a patient to access our healthcare services.</p>
              <button onClick={() => setIsDoctor(false)} className="mt-4 border-white border px-6 py-2 rounded-lg transition hover:bg-[#0077B6]">Patient Sign Up</button>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-semibold">Looking for Doctor Sign Up?</h1>
              <p className="text-center px-6 mt-2">Register as a doctor to provide quality medical services.</p>
              <button onClick={() => setIsDoctor(true)} className="mt-4 border-white border px-6 py-2 rounded-lg transition hover:bg-[#0077B6]">Doctor Sign Up</button>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
