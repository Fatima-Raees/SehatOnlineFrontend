
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { checkDuplicate, getAllDoctorSpecializations, sendOTP, validateRegistration } from "../../../APIServices/users/usersAPI";
import Link from "next/link";
import Cookies from "js-cookie";

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
  const [globalError, setGlobalError] = useState<string | null>(null); // New state for global errors
  const [loading, setLoading] = useState(false);
  const [validatingReg, setValidatingReg] = useState(false);
  const [regValidated, setRegValidated] = useState(false);
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
        setGlobalError("Failed to load specializations. Please try again.");
      }
    };
    fetchSpecializations();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear field-specific errors when user starts typing
    setErrors((prev) => ({ ...prev, [name]: [] }));
    // Reset registration validation for doctors
    if (name === "registrationNumber" || name === "name") {
      setRegValidated(false);
    }
  };

  const validateRegistrationNumber = async () => {
    if (!formData.registrationNumber || !formData.name) {
      setErrors((prev) => ({
        ...prev,
        registrationNumber: ["Registration number and name are required for verification."],
      }));
      return;
    }

    setValidatingReg(true);
    setErrors((prev) => ({ ...prev, registrationNumber: [] }));

    try {
      const result = await validateRegistration(formData.registrationNumber, formData.name);
      if (!result.success) {
        setErrors((prev) => ({
          ...prev,
          registrationNumber: [result.message],
        }));
        setRegValidated(false);
      } else {
        setRegValidated(result.data?.isValid ?? false);
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        registrationNumber: ["Failed to validate registration number."],
      }));
    } finally {
      setValidatingReg(false);
    }
  };

  useEffect(() => {
    if (isDoctor && formData.registrationNumber && formData.name) {
      const handler = setTimeout(() => {
        validateRegistrationNumber();
      }, 1000);
      return () => clearTimeout(handler);
    }
  }, [formData.registrationNumber, formData.name, isDoctor]);

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
      else if (!regValidated) newErrors.registrationNumber = ["Registration number must be verified."];
      if (!formData.specialization) newErrors.specialization = ["Select a specialization."];
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setGlobalError(null);

    if (isDoctor && !regValidated) {
      setErrors({
        registrationNumber: ["Registration number must be verified before submission."],
      });
      return;
    }

    if (!validateForm()) return;

    setLoading(true);
    const updatedFormData = { ...formData, role: isDoctor ? "Doctor" : "Patient" };

    try {
      const duplicateResponse = await checkDuplicate(updatedFormData.email, updatedFormData.CNIC);
      if (!duplicateResponse.success) {
        if (duplicateResponse.errors) {
          setErrors(duplicateResponse.errors);
        } else {
          setGlobalError(duplicateResponse.message || "Registration failed due to duplicate email or CNIC.");
        }
        return;
      }

      Cookies.set("tempUserData", JSON.stringify(updatedFormData));
      Cookies.set("userEmail", updatedFormData.email);
      Cookies.set("otpFlow", "signup");

      const otpResponse = await sendOTP(updatedFormData.email);
      if (!otpResponse.success) {
        setGlobalError(otpResponse.message || "Failed to send OTP. Please try again.");
        return;
      }

      alert("OTP has been sent");
      router.push("/ConfirmationCode");
    } catch (error: any) {
      setGlobalError(error.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleManualVerification = () => {
    validateRegistrationNumber();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-gray-100">
      <div className="relative w-[768px] min-h-[640px] bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Global Error Banner */}
        {globalError && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 flex justify-between items-center">
            <p>{globalError}</p>
            <button onClick={() => setGlobalError(null)}>
              <FontAwesomeIcon icon={faGoogle} className="text-red-700" />
            </button>
          </div>
        )}

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

          <div className="w-full mt-3">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-2 rounded-lg bg-gray-100 border ${errors.name?.length ? "border-red-500" : ""}`}
              disabled={loading}
            />
            {errors.name && errors.name.map((error, index) => (
              <p key={index} className="text-red-500 text-sm mt-1">{error}</p>
            ))}
          </div>

          <div className="w-full mt-3">
            <input
              type="text"
              name="CNIC"
              placeholder="CNIC (e.g., 12345-6789012-3)"
              value={formData.CNIC}
              onChange={handleChange}
              className={`w-full p-2 rounded-lg bg-gray-100 border ${errors.CNIC?.length ? "border-red-500" : ""}`}
              disabled={loading}
            />
            {errors.CNIC && errors.CNIC.map((error, index) => (
              <p key={index} className="text-red-500 text-sm mt-1">{error}</p>
            ))}
          </div>

          <div className="w-full mt-3">
            <input
              type="text"
              name="phone"
              placeholder="Phone Number (e.g., 03XXXXXXXXX)"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full p-2 rounded-lg bg-gray-100 border ${errors.phone?.length ? "border-red-500" : ""}`}
              disabled={loading}
            />
            {errors.phone && errors.phone.map((error, index) => (
              <p key={index} className="text-red-500 text-sm mt-1">{error}</p>
            ))}
          </div>

          <div className="w-full mt-3">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2 rounded-lg bg-gray-100 border ${errors.email?.length ? "border-red-500" : ""}`}
              disabled={loading}
            />
            {errors.email && errors.email.map((error, index) => (
              <p key={index} className="text-red-500 text-sm mt-1">{error}</p>
            ))}
          </div>

          <div className="w-full mt-3">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full p-2 rounded-lg bg-gray-100 border ${errors.password?.length ? "border-red-500" : ""}`}
              disabled={loading}
            />
            {errors.password && errors.password.map((error, index) => (
              <p key={index} className="text-red-500 text-sm mt-1">{error}</p>
            ))}
          </div>

          <button
            type="submit"
            className="mt-4 bg-[#0077B6] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:bg-[#005F91] disabled:bg-gray-400"
            disabled={loading}
          >
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

          <div className="w-full mt-3">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-2 rounded-lg bg-gray-100 border ${errors.name?.length ? "border-red-500" : ""}`}
              disabled={loading}
            />
            {errors.name && errors.name.map((error, index) => (
              <p key={index} className="text-red-500 text-sm mt-1">{error}</p>
            ))}
          </div>

          <div className="w-full mt-3">
            <input
              type="text"
              name="CNIC"
              placeholder="CNIC"
              value={formData.CNIC}
              onChange={handleChange}
              className={`w-full p-2 rounded-lg bg-gray-100 border ${errors.CNIC?.length ? "border-red-500" : ""}`}
              disabled={loading}
            />
            {errors.CNIC && errors.CNIC.map((error, index) => (
              <p key={index} className="text-red-500 text-sm mt-1">{error}</p>
            ))}
          </div>

          <div className="w-full mt-3">
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full p-2 rounded-lg bg-gray-100 border ${errors.phone?.length ? "border-red-500" : ""}`}
              disabled={loading}
            />
            {errors.phone && errors.phone.map((error, index) => (
              <p key={index} className="text-red-500 text-sm mt-1">{error}</p>
            ))}
          </div>

          <div className="w-full mt-3">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2 rounded-lg bg-gray-100 border ${errors.email?.length ? "border-red-500" : ""}`}
              disabled={loading}
            />
            {errors.email && errors.email.map((error, index) => (
              <p key={index} className="text-red-500 text-sm mt-1">{error}</p>
            ))}
          </div>

          <div className="w-full mt-3">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full p-2 rounded-lg bg-gray-100 border ${errors.password?.length ? "border-red-500" : ""}`}
              disabled={loading}
            />
            {errors.password && errors.password.map((error, index) => (
              <p key={index} className="text-red-500 text-sm mt-1">{error}</p>
            ))}
          </div>

          <div className="w-full mt-3 relative">
            <input
              type="text"
              name="registrationNumber"
              placeholder="Medical Registration Number"
              value={formData.registrationNumber}
              onChange={handleChange}
              className={`w-full p-2 rounded-lg bg-gray-100 border ${errors.registrationNumber?.length ? "border-red-500" : regValidated ? "border-green-500" : ""}`}
              disabled={loading}
            />
            {validatingReg && (
              <div className="absolute right-3 top-2 text-blue-500">Validating...</div>
            )}
            {regValidated && (
              <div className="absolute right-3 top-2 text-green-500">✓ Verified</div>
            )}
            {errors.registrationNumber && errors.registrationNumber.map((error, index) => (
              <p key={index} className="text-red-500 text-sm mt-1">{error}</p>
            ))}
            <button
              type="button"
              onClick={handleManualVerification}
              className="mt-1 text-sm text-blue-500 hover:text-blue-700 disabled:text-gray-400"
              disabled={!formData.registrationNumber || !formData.name || loading}
            >
              Verify Registration
            </button>
          </div>

          <div className="w-full mt-3">
            <select
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className={`w-full p-2 rounded-lg bg-gray-100 border ${errors.specialization?.length ? "border-red-500" : ""}`}
              disabled={loading}
            >
              <option value="" disabled>Select Specialization</option>
              {specializations.map((spec) => (
                <option key={spec.lookupID} value={spec.lookupID}>{spec.value}</option>
              ))}
            </select>
            {errors.specialization && errors.specialization.map((error, index) => (
              <p key={index} className="text-red-500 text-sm mt-1">{error}</p>
            ))}
          </div>

          <button
            type="submit"
            className="mt-4 bg-[#0077B6] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:bg-[#005F91] disabled:bg-gray-400"
            disabled={loading || (isDoctor && !regValidated)}
          >
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
              <button
                onClick={() => setIsDoctor(false)}
                className="mt-4 border-white border px-6 py-2 rounded-lg transition hover:bg-[#0077B6]"
                disabled={loading}
              >
                Patient Sign Up
              </button>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-semibold">Looking for Doctor Sign Up?</h1>
              <p className="text-center px-6 mt-2">Register as a doctor to provide quality medical services.</p>
              <button
                onClick={() => setIsDoctor(true)}
                className="mt-4 border-white border px-6 py-2 rounded-lg transition hover:bg-[#0077B6]"
                disabled={loading}
              >
                Doctor Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
