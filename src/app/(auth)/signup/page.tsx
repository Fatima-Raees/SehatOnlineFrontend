"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

export default function SignupPage() {
  // const [isDoctor, setIsDoctor] = useState(false);
  // const [formData, setFormData] = useState({
  //   name: "",
  //   cnic: "",
  //   phone: "",
  //   email: "",
  //   password: "",
  // });

  const [isDoctor, setIsDoctor] = useState(false);
const [formData, setFormData] = useState({
  name: "",
  cnic: "",
  phone: "",
  email: "",
  password: "",
  registrationNumber: "", // New field for doctors
  specialization: "", // New field for specialization dropdown
});
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log("Form submitted", formData, isDoctor ? "Doctor" : "Patient");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r">
      <div className="relative w-[768px] min-h-[640px] bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Patient Sign Up Form */}
        <form
          onSubmit={handleSubmit}
          className={`absolute top-0 left-0 h-full w-1/2 p-10 flex flex-col items-center justify-center transition-all duration-500 ${
            isDoctor ? "pointer-events-none -translate-x-full opacity-0" : "pointer-events-auto opacity-100"
          }`}
        >
          <h1 className="text-2xl font-semibold text-[#0A192F]">Patient Sign Up</h1>
          <a href="#" className="p-2 border rounded-lg w-48 flex items-center justify-center space-x-2 hover:bg-gray-100 transition mt-3">
            <FontAwesomeIcon icon={faGoogle} className="text-xl text-red-500" />
            <span className="text-sm font-medium">Continue with Google</span>
          </a>
        
          <span className="text-sm text-gray-600 mt-2">or use your email to register</span>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" required />
          <input type="text" name="cnic" placeholder="CNIC" value={formData.cnic} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" required />
          <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" required />
          <button type="submit" className="mt-4 bg-[#0077B6] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:bg-[#005F91] hover:shadow-lg">Sign Up</button>
          <Link href="/login" className="text-sm text-[#2563EB] mt-2">Already have an account? Login</Link>
        </form>

        {/* Doctor Sign Up Form */}
        <form
          onSubmit={handleSubmit}
          className={`absolute top-0 left-0 h-full w-1/2 p-10 flex flex-col items-center justify-center transition-all duration-500 ${
            isDoctor ? "pointer-events-auto translate-x-full opacity-100 z-10" : "pointer-events-none opacity-0"
          }`}
        >
          <h1 className="text-2xl font-semibold text-[#0A192F]">Doctor Sign Up</h1>

          <a href="#" className="p-2 border rounded-lg w-48 flex items-center justify-center space-x-2 hover:bg-gray-100 transition mt-3">
            <FontAwesomeIcon icon={faGoogle} className="text-xl text-red-500" />
            <span className="text-sm font-medium">Continue with Google</span>
          </a>

          <span className="text-sm text-gray-600 mt-2">or use your email to register</span>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" required />
          <input type="text" name="cnic" placeholder="CNIC" value={formData.cnic} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" required />
          <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" required />
          
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

  {/* Specialization Dropdown */}
  <select 
    name="specialization" 
    value={formData.specialization} 
    onChange={handleChange} 
    className="w-full mt-3 p-2 rounded-lg bg-gray-100 border"
    required
  >
    <option value="" disabled>Select Specialization</option>
    <option value="General Physician">General Physician</option>
    <option value="Cardiologist">Cardiologist</option>
    <option value="Dermatologist">Dermatologist</option>
    <option value="Neurologist">Neurologist</option>
    <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
    <option value="Psychiatrist">Psychiatrist</option>
    <option value="Pediatrician">Pediatrician</option>
    <option value="Radiologist">Radiologist</option>
    <option value="Gynecologist">Gynecologist</option>
  </select>
          <button 
  type="submit" 
  className="mt-4 bg-[#0077B6] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:bg-[#005F91] hover:shadow-lg"
>
  Sign Up
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


