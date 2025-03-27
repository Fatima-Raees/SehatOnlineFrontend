"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { signupUser, getAllDoctorSpecializations } from "../../../APIServices/users/usersAPI";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  // const [isDoctor, setIsDoctor] = useState(false);
  // const [formData, setFormData] = useState({
  //   name: "",
  //   CNIC: "",
  //   phone: "",
  //   email: "",
  //   password: "",
  // });

  const [isDoctor, setIsDoctor] = useState(false); // Used in UI toggle
  const [formData, setFormData] = useState({
    name: "",
    CNIC: "",
    phone: "",
    email: "",
    password: "",
    registrationNumber: "", // New field for doctors
    specialization: "", // New field for specialization dropdown
    role: "", // New field for role (doctor or patient)
    AuthMethod: "local"
  });
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({}); // Used for form validation
  const [loading, setLoading] = useState(false); // Used to show loading state
  const [specializations, setSpecializations] = useState<{ lookupID: number; value: string }[]>([]);
  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const response = await getAllDoctorSpecializations();
        if (!response || !Array.isArray(response.data)) {
          throw new Error("Invalid API response: Expected an array inside response.data.");
        }

        // Map to required format { lookupID, value }
        const formattedSpecializations = response.data.map((spec: any) => ({
          lookupID: spec.lookupID,
          value: spec.value,
        }));
        console.log("formatted response", formattedSpecializations);
        setSpecializations(formattedSpecializations);
      } catch (error) {
        console.error("Failed to fetch specializations:", error);
      }
    };

    fetchSpecializations();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    // Set the role based on isDoctor
    const updatedFormData = { ...formData, role: isDoctor ? "Doctor" : "Patient" };
    console.log("Form submitted", updatedFormData);
    try {
      await signupUser(formData);
      alert("Registration successful!");
      router.push("/login");
    } catch (error: any) {
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
          className={`absolute top-0 left-0 h-full w-1/2 p-10 flex flex-col items-center justify-center transition-all duration-500 ${isDoctor ? "pointer-events-none -translate-x-full opacity-0" : "pointer-events-auto opacity-100"
            }`}
        >
          <h1 className="text-2xl font-semibold text-[#0A192F]">Patient Sign Up</h1>
          <a href="#" className="p-2 border rounded-lg w-48 flex items-center justify-center space-x-2 hover:bg-gray-100 transition mt-3">
            <FontAwesomeIcon icon={faGoogle} className="text-xl text-red-500" />
            <span className="text-sm font-medium">Continue with Google</span>
          </a>

          <span className="text-sm text-gray-600 mt-2">or use your email to register</span>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" required />
          {errors.name && <p className="text-red-500">{errors.name[0]}</p>}
          <input type="text" name="CNIC" placeholder="CNIC (e.g., 12345-6789012-3)" value={formData.CNIC} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" required />
          {errors.CNIC && <p className="text-red-500">{errors.CNIC[0]}</p>}
          <input type="text" name="phone" placeholder="Phone Number (e.g., 03#########)" value={formData.phone} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" required />
          {errors.phone && <p className="text-red-500">{errors.phone[0]}</p>}
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" required />
          {errors.email && <p className="text-red-500">{errors.email[0]}</p>}
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" required />
          {/* <input type="hidden" name="role" value="Patient" onChange={handleChange} /> */}
          <button type="submit" className="mt-4 bg-[#0077B6] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:bg-[#005F91] hover:shadow-lg" disabled={loading}>{loading ? "Registering..." : "Sign Up"}</button>
          <Link href="/login" className="text-sm text-[#2563EB] mt-2">Already have an account? Login</Link>
        </form>

        {/* Doctor Sign Up Form */}
        <form
          onSubmit={handleSubmit}
          className={`absolute top-0 left-0 h-full w-1/2 p-10 flex flex-col items-center justify-center transition-all duration-500 ${isDoctor ? "pointer-events-auto translate-x-full opacity-100 z-10" : "pointer-events-none opacity-0"
            }`}
        >
          <h1 className="text-2xl font-semibold text-[#0A192F]">Doctor Sign Up</h1>

          <a href="#" className="p-2 border rounded-lg w-48 flex items-center justify-center space-x-2 hover:bg-gray-100 transition mt-3">
            <FontAwesomeIcon icon={faGoogle} className="text-xl text-red-500" />
            <span className="text-sm font-medium">Continue with Google</span>
          </a>

          <span className="text-sm text-gray-600 mt-2">or use your email to register</span>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" required />
          {errors.name && <p className="text-red-500">{errors.name[0]}</p>}
          <input type="text" name="CNIC" placeholder="CNIC" value={formData.CNIC} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" required />
          {errors.CNIC && <p className="text-red-500">{errors.CNIC[0]}</p>}
          <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" required />
          {errors.phone && <p className="text-red-500">{errors.phone[0]}</p>}
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" required />
          {errors.email && <p className="text-red-500">{errors.email[0]}</p>}
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" required />
          {/* <input type="hidden" name="role" value="Doctor" onChange={handleChange} /> */}
          {/* Registration Number */}
          <input
            type="text"
            name="registrationNumber"
            placeholder="Medical Registration Number"
            value={formData.registrationNumber}
            onChange={handleChange}
            className="w-full mt-3 p-2 rounded-lg bg-gray-100 border"
            required
          />
          {errors.registrationNumber && <p className="text-red-500">{errors.registrationNumber[0]}</p>}
          {/* Specialization Dropdown */}
          <select
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            className="w-full mt-3 p-2 rounded-lg bg-gray-100 border"
            required
          >
            <option value="" disabled>Select Specialization</option>
            {specializations.map((spec) => (
              <option key={spec.lookupID} value={spec.lookupID}>
                {spec.value}
              </option>
            ))}
          </select>
          {errors.specialization && <p className="text-red-500">{errors.specialization[0]}</p>}
          <button
            type="submit"
            className="mt-4 bg-[#0077B6] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:bg-[#005F91] hover:shadow-lg"
            disabled={loading}>
            {loading ? "Registering..." : "Sign Up"}
          </button>

          <Link href="/login" className="text-sm text-[#2563EB] mt-2">Already have an account? Login</Link>
        </form>


        <div className={`absolute top-0 left-1/2 h-full w-1/2 bg-[#023E8A] text-white flex flex-col items-center justify-center transition-all duration-500 ${isDoctor ? "-translate-x-full" : ""}`}>
          {isDoctor ? (
            <>
              <h1 className="text-2xl font-semibold">Looking for Patient Sign Up?</h1>
              <p className="text-center px-6 mt-2">Register as a patient to access our healthcare services.</p>
              <button onClick={() => setIsDoctor(false)} className="mt-4 border-white border px-6 py-2 rounded-lg transition-all duration-300 hover:bg-[#0077B6] hover:text-white hover:border-[#0077B6]">Patient Sign Up</button>

            </>
          ) : (
            <>
              <h1 className="text-2xl font-semibold">Looking for Doctor Sign Up?</h1>
              <p className="text-center px-6 mt-2">Register as a doctor to provide quality medical services.</p>
              <button
                onClick={() => setIsDoctor(true)}
                className="mt-4 border-white border px-6 py-2 rounded-lg transition-all duration-300 hover:bg-[#0077B6] hover:text-white hover:border-[#0077B6]"
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