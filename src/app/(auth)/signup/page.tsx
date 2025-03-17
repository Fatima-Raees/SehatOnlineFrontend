// "use client";

// import { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faGoogle,
//   faFacebookF,
//   faGithub,
//   faLinkedinIn,
// } from "@fortawesome/free-brands-svg-icons";

// export default function SignupPage() {
//   const [isSignUp, setIsSignUp] = useState(false);

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-200 to-blue-200">
//       <div className="relative w-[768px] min-h-[480px] bg-white rounded-2xl shadow-lg overflow-hidden">
//         {/* Sign In Form */}
//         <div
//           className={`absolute top-0 left-0 h-full w-1/2 p-10 flex flex-col items-center justify-center transition-all duration-500 ${
//             isSignUp ? "-translate-x-full opacity-0" : "opacity-100"
//           }`}
//         >
//           <h1 className="text-2xl font-semibold">Sign In</h1>
//           <div className="flex space-x-3 my-3">
//             <a href="#" className="p-2 border rounded-lg">
//               <FontAwesomeIcon icon={faGoogle} className="text-xl text-red-500" />
//             </a>
//             <a href="#" className="p-2 border rounded-lg">
//               <FontAwesomeIcon icon={faFacebookF} className="text-xl text-blue-600" />
//             </a>
//             <a href="#" className="p-2 border rounded-lg">
//               <FontAwesomeIcon icon={faGithub} className="text-xl text-gray-800" />
//             </a>
//             <a href="#" className="p-2 border rounded-lg">
//               <FontAwesomeIcon icon={faLinkedinIn} className="text-xl text-blue-700" />
//             </a>
//           </div>
//           <span className="text-sm">or use your email password</span>
//           <input type="email" placeholder="Email" className="w-full mt-3 p-2 rounded-lg bg-gray-100" />
//           <input type="password" placeholder="Password" className="w-full mt-3 p-2 rounded-lg bg-gray-100" />
//           <a href="#" className="text-sm text-blue-500 mt-2">Forget Your Password?</a>
//           <button className="mt-4 bg-purple-700 text-white px-6 py-2 rounded-lg">Sign In</button>
//         </div>

//         {/* Sign Up Form */}
//         <div
//           className={`absolute top-0 left-0 h-full w-1/2 p-10 flex flex-col items-center justify-center transition-all duration-500 ${
//             isSignUp ? "translate-x-full opacity-100 z-10" : "opacity-0"
//           }`}
//         >
//           <h1 className="text-2xl font-semibold">Create Account</h1>
//           <div className="flex space-x-3 my-3">
//             <a href="#" className="p-2 border rounded-lg">
//               <FontAwesomeIcon icon={faGoogle} className="text-xl text-red-500" />
//             </a>
//             <a href="#" className="p-2 border rounded-lg">
//               <FontAwesomeIcon icon={faFacebookF} className="text-xl text-blue-600" />
//             </a>
//             <a href="#" className="p-2 border rounded-lg">
//               <FontAwesomeIcon icon={faGithub} className="text-xl text-gray-800" />
//             </a>
//             <a href="#" className="p-2 border rounded-lg">
//               <FontAwesomeIcon icon={faLinkedinIn} className="text-xl text-blue-700" />
//             </a>
//           </div>
//           <span className="text-sm">or use your email for registration</span>
//           <input type="text" placeholder="Name" className="w-full mt-3 p-2 rounded-lg bg-gray-100" />
//           <input type="email" placeholder="Email" className="w-full mt-3 p-2 rounded-lg bg-gray-100" />
//           <input type="password" placeholder="Password" className="w-full mt-3 p-2 rounded-lg bg-gray-100" />
//           <button className="mt-4 bg-purple-700 text-white px-6 py-2 rounded-lg">Sign Up</button>
//         </div>

//         {/* Purple Panel with Toggle */}
//         <div
//           className={`absolute top-0 left-1/2 h-full w-1/2 bg-purple-700 text-white flex flex-col items-center justify-center transition-all duration-500 ${
//             isSignUp ? "-translate-x-full" : ""
//           }`}
//         >
//           <h1 className="text-2xl font-semibold">{isSignUp ? "Welcome Back!" : "Hello, Friend!"}</h1>
//           <p className="text-center px-6 mt-2">
//             {isSignUp
//               ? "Enter your personal details to use all site features"
//               : "Register with your personal details to use all site features"}
//           </p>
//           <button
//             onClick={() => setIsSignUp(!isSignUp)}
//             className="mt-4 border-white border px-6 py-2 rounded-lg"
//           >
//             {isSignUp ? "Sign In" : "Sign Up"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }






// "use client";

// import { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faGoogle,
//   faFacebookF,
//   faGithub,
//   faLinkedinIn,
// } from "@fortawesome/free-brands-svg-icons";

// export default function SignupPage() {
//   // false = Patient Sign Up; true = Doctor Sign Up
//   const [isDoctor, setIsDoctor] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     cnic: "",
//     phone: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e: { target: { name: any; value: any; }; }) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e: { preventDefault: () => void; }) => {
//     e.preventDefault();
//     console.log("Form submitted", formData, isDoctor ? "Doctor" : "Patient");
//     // Add your form submission logic here
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-200 to-blue-200">
//       <div className="relative w-[768px] min-h-[480px] bg-white rounded-2xl shadow-lg overflow-hidden">
//         {/* Patient Sign Up Form */}
//         <form
//           onSubmit={handleSubmit}
//           className={`absolute top-0 left-0 h-full w-1/2 p-10 flex flex-col items-center justify-center transition-all duration-500 ${
//             isDoctor ? "-translate-x-full opacity-0" : "opacity-100"
//           }`}
//         >
//           <h1 className="text-2xl font-semibold">Patient Sign Up</h1>
//           <div className="flex space-x-3 my-3">
//             <a href="#" className="p-2 border rounded-lg">
//               <FontAwesomeIcon
//                 icon={faGoogle}
//                 className="text-xl text-red-500"
//               />
//             </a>
//             <a href="#" className="p-2 border rounded-lg">
//               <FontAwesomeIcon
//                 icon={faFacebookF}
//                 className="text-xl text-blue-600"
//               />
//             </a>
//             <a href="#" className="p-2 border rounded-lg">
//               <FontAwesomeIcon
//                 icon={faGithub}
//                 className="text-xl text-gray-800"
//               />
//             </a>
//             <a href="#" className="p-2 border rounded-lg">
//               <FontAwesomeIcon
//                 icon={faLinkedinIn}
//                 className="text-xl text-blue-700"
//               />
//             </a>
//           </div>
//           <span className="text-sm">or use your email to register</span>
//           <input
//             type="text"
//             name="name"
//             placeholder="Name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full mt-3 p-2 rounded-lg bg-gray-100 border"
//             required
//           />
//           <input
//             type="text"
//             name="cnic"
//             placeholder="CNIC"
//             value={formData.cnic}
//             onChange={handleChange}
//             className="w-full mt-3 p-2 rounded-lg bg-gray-100 border"
//             required
//           />
//           <input
//             type="text"
//             name="phone"
//             placeholder="Phone Number"
//             value={formData.phone}
//             onChange={handleChange}
//             className="w-full mt-3 p-2 rounded-lg bg-gray-100 border"
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full mt-3 p-2 rounded-lg bg-gray-100 border"
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full mt-3 p-2 rounded-lg bg-gray-100 border"
//             required
//           />
//           <button
//             type="submit"
//             className="mt-4 bg-purple-700 text-white px-6 py-2 rounded-lg"
//           >
//             Sign Up
//           </button>
//           <a href="#" className="text-sm text-blue-500 mt-2">
//             Already have an account? Login
//           </a>
//         </form>

//         {/* Doctor Sign Up Form */}
//         <form
//           onSubmit={handleSubmit}
//           className={`absolute top-0 left-0 h-full w-1/2 p-10 flex flex-col items-center justify-center transition-all duration-500 ${
//             isDoctor ? "translate-x-full opacity-100 z-10" : "opacity-0"
//           }`}
//         >
//           <h1 className="text-2xl font-semibold">Doctor Sign Up</h1>
//           <div className="flex space-x-3 my-3">
//             <a href="#" className="p-2 border rounded-lg">
//               <FontAwesomeIcon
//                 icon={faGoogle}
//                 className="text-xl text-red-500"
//               />
//             </a>
//             <a href="#" className="p-2 border rounded-lg">
//               <FontAwesomeIcon
//                 icon={faFacebookF}
//                 className="text-xl text-blue-600"
//               />
//             </a>
//             <a href="#" className="p-2 border rounded-lg">
//               <FontAwesomeIcon
//                 icon={faGithub}
//                 className="text-xl text-gray-800"
//               />
//             </a>
//             <a href="#" className="p-2 border rounded-lg">
//               <FontAwesomeIcon
//                 icon={faLinkedinIn}
//                 className="text-xl text-blue-700"
//               />
//             </a>
//           </div>
//           <span className="text-sm">or use your email to register</span>
//           <input
//             type="text"
//             name="name"
//             placeholder="Name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full mt-3 p-2 rounded-lg bg-gray-100 border"
//             required
//           />
//           <input
//             type="text"
//             name="cnic"
//             placeholder="CNIC"
//             value={formData.cnic}
//             onChange={handleChange}
//             className="w-full mt-3 p-2 rounded-lg bg-gray-100 border"
//             required
//           />
//           <input
//             type="text"
//             name="phone"
//             placeholder="Phone Number"
//             value={formData.phone}
//             onChange={handleChange}
//             className="w-full mt-3 p-2 rounded-lg bg-gray-100 border"
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full mt-3 p-2 rounded-lg bg-gray-100 border"
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full mt-3 p-2 rounded-lg bg-gray-100 border"
//             required
//           />
//           <button
//             type="submit"
//             className="mt-4 bg-purple-700 text-white px-6 py-2 rounded-lg"
//           >
//             Sign Up
//           </button>
//           <a href="#" className="text-sm text-blue-500 mt-2">
//             Already have an account? Login
//           </a>
//         </form>

//         {/* Purple Panel with Toggle */}
//         <div
//           className={`absolute top-0 left-1/2 h-full w-1/2 bg-purple-700 text-white flex flex-col items-center justify-center transition-all duration-500 ${
//             isDoctor ? "-translate-x-full" : ""
//           }`}
//         >
//           {isDoctor ? (
//             <>
//               <h1 className="text-2xl font-semibold">
//                 Looking for Patient Sign Up?
//               </h1>
//               <p className="text-center px-6 mt-2">
//                 Register as a patient to access our healthcare services.
//               </p>
//               <button
//                 onClick={() => setIsDoctor(false)}
//                 className="mt-4 border-white border px-6 py-2 rounded-lg"
//               >
//                 Patient Sign Up
//               </button>
//             </>
//           ) : (
//             <>
//               <h1 className="text-2xl font-semibold">
//                 Looking for Doctor Sign Up?
//               </h1>
//               <p className="text-center px-6 mt-2">
//                 Register as a doctor to provide quality medical services.
//               </p>
//               <button
//                 onClick={() => setIsDoctor(true)}
//                 className="mt-4 border-white border px-6 py-2 rounded-lg"
//               >
//                 Doctor Sign Up
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }




// "use client";

// import { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faGoogle,
//   faFacebookF,
//   faGithub,
//   faLinkedinIn,
// } from "@fortawesome/free-brands-svg-icons";
// import Link from "next/link";

// export default function SignupPage() {
//   // false = Patient Sign Up; true = Doctor Sign Up
//   const [isDoctor, setIsDoctor] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     cnic: "",
//     phone: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e: { target: { name: any; value: any; }; }) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e: { preventDefault: () => void; }) => {
//     e.preventDefault();
//     console.log("Form submitted", formData, isDoctor ? "Doctor" : "Patient");
//     // Add your submission logic here
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-200 to-blue-200">
//       <div className="relative w-[768px] min-h-[560px] bg-white rounded-2xl shadow-lg overflow-hidden">
//         {/* Patient Sign Up Form */}
//         <form
//           onSubmit={handleSubmit}
//           className={`absolute top-0 left-0 h-full w-1/2 p-10 flex flex-col items-center justify-center transition-all duration-500 ${
//             isDoctor
//               ? "pointer-events-none -translate-x-full opacity-0"
//               : "pointer-events-auto opacity-100"
//           }`}
//         >
//           <h1 className="text-2xl font-semibold">Patient Sign Up</h1>
//           <div className="flex space-x-3 my-3">
        
//             <a href="#" className="p-2 border rounded-lg w-48 flex items-center justify-center space-x-2 hover:bg-gray-100 transition">
//   <FontAwesomeIcon icon={faGoogle} className="text-xl text-red-500" />
//   <span className="text-sm font-medium">Continue with Google</span>
// </a>

//           </div>
//           <span className="text-sm">or use your email to register</span>
//           <input
//             type="text"
//             name="name"
//             placeholder="Name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full mt-3 p-2 rounded-lg bg-gray-100 border"
//             required
//           />
//           <input
//             type="text"
//             name="cnic"
//             placeholder="CNIC"
//             value={formData.cnic}
//             onChange={handleChange}
//             className="w-full mt-3 p-2 rounded-lg bg-gray-100 border"
//             required
//           />
//           <input
//             type="text"
//             name="phone"
//             placeholder="Phone Number"
//             value={formData.phone}
//             onChange={handleChange}
//             className="w-full mt-3 p-2 rounded-lg bg-gray-100 border"
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full mt-3 p-2 rounded-lg bg-gray-100 border"
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full mt-3 p-2 rounded-lg bg-gray-100 border"
//             required
//           />
//           <button
//             type="submit"
//             className="mt-4 bg-[#b12657] text-white px-6 py-2 rounded-lg"
//           >
//             Sign Up
//           </button>
//           <Link href="/login" className="text-sm text-blue-500 mt-2">
//             Already have an account? Login
//           </Link>
//         </form>

//         {/* Doctor Sign Up Form */}
//         <form
//           onSubmit={handleSubmit}
//           className={`absolute top-0 left-0 h-full w-1/2 p-10 flex flex-col items-center justify-center transition-all duration-500 ${
//             isDoctor
//               ? "pointer-events-auto translate-x-full opacity-100 z-10"
//               : "pointer-events-none opacity-0"
//           }`}
//         >
//           <h1 className="text-2xl font-semibold">Doctor Sign Up</h1>
//           <div className="flex space-x-3 my-3">
            
//             <a href="#" className="p-2 border rounded-lg w-48 flex items-center justify-center space-x-2 hover:bg-gray-100 transition">
//   <FontAwesomeIcon icon={faGoogle} className="text-xl text-red-500" />
//   <span className="text-sm font-medium">Continue with Google</span>
// </a>

//           </div>
//           <span className="text-sm">or use your email to register</span>
//           <input
//             type="text"
//             name="name"
//             placeholder="Name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full mt-3 p-2 rounded-lg bg-gray-100 border"
//             required
//           />
//           <input
//             type="text"
//             name="cnic"
//             placeholder="CNIC"
//             value={formData.cnic}
//             onChange={handleChange}
//             className="w-full mt-3 p-2 rounded-lg bg-gray-100 border"
//             required
//           />
//           <input
//             type="text"
//             name="phone"
//             placeholder="Phone Number"
//             value={formData.phone}
//             onChange={handleChange}
//             className="w-full mt-3 p-2 rounded-lg bg-gray-100 border"
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full mt-3 p-2 rounded-lg bg-gray-100 border"
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full mt-3 p-2 rounded-lg bg-gray-100 border"
//             required
//           />
//           <button
//             type="submit"
//             className="mt-4 bg-[#b12657] text-white px-6 py-2 rounded-lg"
//           >
//             Sign Up
//           </button>
//           <Link href="/login" className="text-sm text-blue-500 mt-2">
//             Already have an account? Login
//           </Link>
//         </form>

//         {/* Purple Panel with Toggle  bg-[#867dbb]*/}
//         <div
//           className={`absolute top-0 left-1/2 h-full w-1/2  bg-[#4e6ab2] text-white flex flex-col items-center justify-center transition-all duration-500 ${
//             isDoctor ? "-translate-x-full" : ""
//           }`}
//         >
//           {isDoctor ? (
//             <>
//               <h1 className="text-2xl font-semibold">
//                 Looking for Patient Sign Up?
//               </h1>
//               <p className="text-center px-6 mt-2">
//                 Register as a patient to access our healthcare services.
//               </p>
//               <button
//                 onClick={() => setIsDoctor(false)}
//                 className="mt-4 border-white border px-6 py-2 rounded-lg bg-[#b12657]"
//               >
//                 Patient Sign Up
//               </button>
//             </>
//           ) : (
//             <>
//               <h1 className="text-2xl font-semibold">
//                 Looking for Doctor Sign Up?
//               </h1>
//               <p className="text-center px-6 mt-2">
//                 Register as a doctor to provide quality medical services.
//               </p>
//               <button
//                 onClick={() => setIsDoctor(true)}
//                 className="mt-4 border-white border px-6 py-2 rounded-lg bg-[#b12657]"
//               >
//                 Doctor Sign Up
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

export default function SignupPage() {
  const [isDoctor, setIsDoctor] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    cnic: "",
    phone: "",
    email: "",
    password: "",
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
      <div className="relative w-[768px] min-h-[560px] bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Patient Sign Up Form */}
        <form
          onSubmit={handleSubmit}
          className={`absolute top-0 left-0 h-full w-1/2 p-10 flex flex-col items-center justify-center transition-all duration-500 ${
            isDoctor ? "pointer-events-none -translate-x-full opacity-0" : "pointer-events-auto opacity-100"
          }`}
        >
          <h1 className="text-2xl font-semibold text-[#0A192F]">Patient Sign Up</h1>
          {/* <div className="flex space-x-3 my-3">
            <a href="#" className="p-2 border rounded-lg w-48 flex items-center justify-center space-x-2 hover:bg-gray-100 transition">
              <FontAwesomeIcon icon={faGoogle} className="text-xl text-red-500" />
              <span className="text-sm font-medium">Continue with Google</span>
            </a>
          </div> */}
          <a href="#" className="p-2 border rounded-lg w-48 flex items-center justify-center space-x-2 hover:bg-gray-100 transition mt-3">
            <FontAwesomeIcon icon={faGoogle} className="text-xl text-red-500" />
            <span className="text-sm font-medium">Continue with Google</span>
          </a>
          {/* <span className="text-sm">or use your email to register</span>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" required />
          <input type="text" name="cnic" placeholder="CNIC" value={formData.cnic} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" required />
          <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" required />
          <button type="submit" className="mt-4 bg-[#b12657] text-white px-6 py-2 rounded-lg">Sign Up</button>
          <Link href="/login" className="text-sm text-blue-500 mt-2">Already have an account? Login</Link> */}
          <span className="text-sm text-gray-600 mt-2">or use your email to register</span>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" required />
          <input type="text" name="cnic" placeholder="CNIC" value={formData.cnic} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" required />
          <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" required />
          <button type="submit" className="mt-4 bg-[#EAB308] text-white px-6 py-2 rounded-lg hover:bg-[#D19B07]">Sign Up</button>
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
          {/* <div className="flex space-x-3 my-3">
            <a href="#" className="p-2 border rounded-lg w-48 flex items-center justify-center space-x-2 hover:bg-gray-100 transition">
              <FontAwesomeIcon icon={faGoogle} className="text-xl text-red-500" />
              <span className="text-sm font-medium">Continue with Google</span>
            </a>
          </div> */}
          <a href="#" className="p-2 border rounded-lg w-48 flex items-center justify-center space-x-2 hover:bg-gray-100 transition mt-3">
            <FontAwesomeIcon icon={faGoogle} className="text-xl text-red-500" />
            <span className="text-sm font-medium">Continue with Google</span>
          </a>
          {/* <span className="text-sm">or use your email to register</span>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" required />
          <input type="text" name="cnic" placeholder="CNIC" value={formData.cnic} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" required />
          <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" required />
          <button type="submit" className="mt-4 bg-[#b12657] text-white px-6 py-2 rounded-lg">Sign Up</button>
          <Link href="/login" className="text-sm text-blue-500 mt-2">Already have an account? Login</Link> */}
          <span className="text-sm text-gray-600 mt-2">or use your email to register</span>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" required />
          <input type="text" name="cnic" placeholder="CNIC" value={formData.cnic} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" required />
          <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" required />
          <button type="submit" className="mt-4 bg-[#EAB308] text-white px-6 py-2 rounded-lg hover:bg-[#D19B07]">Sign Up</button>
          <Link href="/login" className="text-sm text-[#2563EB] mt-2">Already have an account? Login</Link>
        </form>

        {/* Toggle Panel */}
        {/* <div className={`absolute top-0 left-1/2 h-full w-1/2 bg-[#4e6ab2] text-white flex flex-col items-center justify-center transition-all duration-500 ${isDoctor ? "-translate-x-full" : ""}`}>
          {isDoctor ? (
            <>
              <h1 className="text-2xl font-semibold">Looking for Patient Sign Up?</h1>
              <p className="text-center px-6 mt-2">Register as a patient to access our healthcare services.</p>
              <button onClick={() => setIsDoctor(false)} className="mt-4 border-white border px-6 py-2 rounded-lg bg-[#b12657]">Patient Sign Up</button>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-semibold">Looking for Doctor Sign Up?</h1>
              <p className="text-center px-6 mt-2">Register as a doctor to provide quality medical services.</p>
              <button onClick={() => setIsDoctor(true)} className="mt-4 border-white border px-6 py-2 rounded-lg bg-[#b12657]">Doctor Sign Up</button>
            </>
          )}
        </div> */}
        <div className={`absolute top-0 left-1/2 h-full w-1/2 bg-[#0A192F] text-white flex flex-col items-center justify-center transition-all duration-500 ${isDoctor ? "-translate-x-full" : ""}`}>
          {isDoctor ? (
            <>
              <h1 className="text-2xl font-semibold">Looking for Patient Sign Up?</h1>
              <p className="text-center px-6 mt-2">Register as a patient to access our healthcare services.</p>
              <button onClick={() => setIsDoctor(false)} className="mt-4 border-white border px-6 py-2 rounded-lg bg-[#EAB308] hover:bg-[#D19B07]">Patient Sign Up</button>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-semibold">Looking for Doctor Sign Up?</h1>
              <p className="text-center px-6 mt-2">Register as a doctor to provide quality medical services.</p>
              <button onClick={() => setIsDoctor(true)} className="mt-4 border-white border px-6 py-2 rounded-lg bg-[#EAB308] hover:bg-[#D19B07]">Doctor Sign Up</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}


