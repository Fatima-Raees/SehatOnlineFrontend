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
//         <div
//           className={`absolute top-0 left-0 h-full w-1/2 p-10 flex flex-col items-center justify-center transition-transform duration-500 ${
//             isSignUp ? "translate-x-full opacity-0" : ""
//           }`}
//         >
//           <h1 className="text-2xl font-semibold">Sign In</h1>
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

//           <span className="text-sm">or use your email password</span>
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full mt-3 p-2 rounded-lg bg-gray-100"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full mt-3 p-2 rounded-lg bg-gray-100"
//           />
//           <a href="#" className="text-sm text-blue-500 mt-2">
//             Forget Your Password?
//           </a>
//           <button className="mt-4 bg-purple-700 text-white px-6 py-2 rounded-lg">
//             Sign In
//           </button>
//         </div>

//         <div
//           className={`absolute top-0 left-0 h-full w-1/2 p-10 flex flex-col items-center justify-center transition-transform duration-500 opacity-0 ${
//             isSignUp ? "translate-x-full opacity-100 z-10" : ""
//           }`}
//         >
//           <h1 className="text-2xl font-semibold">Create Account</h1>
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

//           <span className="text-sm">or use your email for registration</span>
//           <input
//             type="text"
//             placeholder="Name"
//             className="w-full mt-3 p-2 rounded-lg bg-gray-100"
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full mt-3 p-2 rounded-lg bg-gray-100"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full mt-3 p-2 rounded-lg bg-gray-100"
//           />
//           <button className="mt-4 bg-purple-700 text-white px-6 py-2 rounded-lg">
//             Sign Up
//           </button>
//         </div>

//         <div className="absolute top-0 left-1/2 h-full w-1/2 bg-purple-700 text-white flex flex-col items-center justify-center transition-transform duration-500 ${isSignUp ? '-translate-x-full' : ''}">
//           <h1 className="text-2xl font-semibold">
//             {isSignUp ? "Welcome Back!" : "Hello, Friend!"}
//           </h1>
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
// import Link from "next/link";

// export default function LoginPage() {
//   // false = Patient Login; true = Doctor Login
//   const [isDoctor, setIsDoctor] = useState(false);

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-200 to-blue-200">
//       <div className="relative w-[768px] min-h-[480px] bg-white rounded-2xl shadow-lg overflow-hidden">
//         {/* Patient Login Form */}
//         <div
//           className={`absolute top-0 left-0 h-full w-1/2 p-10 flex flex-col items-center justify-center transition-all duration-500 ${
//             isDoctor ? "-translate-x-full opacity-0" : "opacity-100"
//           }`}
//         >
//           <h1 className="text-2xl font-semibold">Patient Login</h1>
//           <div className="flex space-x-3 my-3">
            
//             <a href="#" className="p-2 border rounded-lg w-48 flex items-center justify-center space-x-2 hover:bg-gray-100 transition">
//   <FontAwesomeIcon icon={faGoogle} className="text-xl text-red-500" />
//   <span className="text-sm font-medium">Continue with Google</span>
// </a>

//           </div>
//           <span className="text-sm">or use your email for login</span>
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full mt-3 p-2 rounded-lg bg-gray-100 border"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full mt-3 p-2 rounded-lg bg-gray-100 border"
//           />
//           <Link href="#" className="text-sm text-blue-500 mt-2">
//             Forgot Your Password?
//           </Link>
//           <button className="mt-4 bg-purple-700 text-white px-6 py-2 rounded-lg">
//             Sign In
//           </button>
//           <Link href="/signup" className="text-sm text-blue-500 mt-2">
//   Don't have an account? Sign Up
// </Link>
//         </div>

//         {/* Doctor Login Form */}
//         <div
//           className={`absolute top-0 left-0 h-full w-1/2 p-10 flex flex-col items-center justify-center transition-all duration-500 ${
//             isDoctor ? "translate-x-full opacity-100 z-10" : "opacity-0"
//           }`}
//         >
//           <h1 className="text-2xl font-semibold">Doctor Login</h1>
//           <div className="flex space-x-3 my-3">
           
//              <a href="#" className="p-2 border rounded-lg w-48 flex items-center justify-center space-x-2 hover:bg-gray-100 transition">
//   <FontAwesomeIcon icon={faGoogle} className="text-xl text-red-500" />
//   <span className="text-sm font-medium">Continue with Google</span>
// </a>


//           </div>
//           <span className="text-sm">or use your email for login</span>
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full mt-3 p-2 rounded-lg bg-gray-100 border"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full mt-3 p-2 rounded-lg bg-gray-100 border"
//           />
//           <Link href="/forgot-password" className="text-sm text-blue-500 mt-2">
//             Forgot Your Password?
//           </Link>
//           <button className="mt-4 bg-purple-700 text-white px-6 py-2 rounded-lg">
//             Sign In
//           </button>
//           <Link href="/signup" className="text-sm text-blue-500 mt-2">
//   Don't have an account? Sign Up
// </Link>

//         </div>

//         {/* Purple Panel with Toggle */}
//         <div
//           className={`absolute top-0 left-1/2 h-full w-1/2 bg-purple-700 text-white flex flex-col items-center justify-center transition-all duration-500 ${
//             isDoctor ? "-translate-x-full" : ""
//           }`}
//         >
//           {isDoctor ? (
//             <>
//               <h1 className="text-2xl font-semibold">Patient Login</h1>
//               <p className="text-center px-6 mt-2">
//                 Login as a patient to access our services.
//               </p>
//               <button
//                 onClick={() => setIsDoctor(false)}
//                 className="mt-4 border-white border px-6 py-2 rounded-lg"
//               >
//                 Patient Login
//               </button>
//             </>
//           ) : (
//             <>
//               <h1 className="text-2xl font-semibold">Doctor Login</h1>
//               <p className="text-center px-6 mt-2">
//                 Login as a doctor to manage your patients.
//               </p>
//               <button
//                 onClick={() => setIsDoctor(true)}
//                 className="mt-4 border-white border px-6 py-2 rounded-lg"
//               >
//                 Doctor Login
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

export default function LoginPage() {
  const [isDoctor, setIsDoctor] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="relative w-[768px] min-h-[480px] bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Patient Login Form */}
        <div className={`absolute top-0 left-0 h-full w-1/2 p-10 flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${isDoctor ? "opacity-0 -translate-x-full pointer-events-none" : "opacity-100 translate-x-0 pointer-events-auto"}`}>

          <h1 className="text-2xl font-semibold text-[#0A192F]">Patient Login</h1>
          <a href="#" className="p-2 border rounded-lg w-48 flex items-center justify-center space-x-2 hover:bg-gray-100 transition mt-3">
            <FontAwesomeIcon icon={faGoogle} className="text-xl text-red-500" />
            <span className="text-sm font-medium">Continue with Google</span>
          </a>
          <span className="text-sm text-gray-600 mt-2">or use your email to login</span>
          <input type="email" placeholder="Email" className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" />
          <input type="password" placeholder="Password" className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" />
          <Link href="#" className="text-sm text-[#2563EB] mt-2">Forgot Your Password?</Link>
          <button className="mt-4 bg-[#EAB308] text-white px-6 py-2 rounded-lg hover:bg-[#D19B07]">Sign In</button>
          <Link href="/signup" className="text-sm text-[#2563EB] mt-2">Don't have an account? Sign Up</Link>
        </div>

        {/* Doctor Login Form */}
        <div className={`absolute top-0 right-0 h-full w-1/2 p-10 flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${isDoctor ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-0 translate-x-full pointer-events-none"}`}>

          <h1 className="text-2xl font-semibold text-[#0A192F]">Doctor Login</h1>
          <a href="#" className="p-2 border rounded-lg w-48 flex items-center justify-center space-x-2 hover:bg-gray-100 transition mt-3">
            <FontAwesomeIcon icon={faGoogle} className="text-xl text-red-500" />
            <span className="text-sm font-medium">Continue with Google</span>
          </a>
          <span className="text-sm text-gray-600 mt-2">or use your email to login</span>
          <input type="email" placeholder="Email" className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" />
          <input type="password" placeholder="Password" className="w-full mt-3 p-2 rounded-lg bg-gray-100 border" />
          <Link href="#" className="text-sm text-[#2563EB] mt-2">Forgot Your Password?</Link>
          <button className="mt-4 bg-[#EAB308] text-white px-6 py-2 rounded-lg hover:bg-[#D19B07]">Sign In</button>
          <Link href="/signup" className="text-sm text-[#2563EB] mt-2">Don't have an account? Sign Up</Link>
        </div>

        {/* Golden Panel with Toggle */}
        <div className={`absolute top-0 left-1/2 h-full w-1/2 bg-[#0A192F] text-white flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${isDoctor ? "-translate-x-full" : "translate-x-0"}`}>
          {isDoctor ? (
            <>
              <h1 className="text-2xl font-semibold">Looking for Patient Login?</h1>
              <p className="text-center px-6 mt-2">Login as a patient to access healthcare services.</p>
              <button onClick={() => setIsDoctor(false)} className="mt-4 border-white border px-6 py-2 rounded-lg bg-[#EAB308] hover:bg-[#D19B07]">Patient Login</button>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-semibold">Looking for Doctor Login?</h1>
              <p className="text-center px-6 mt-2">Login as a doctor to manage your patients.</p>
              <button onClick={() => setIsDoctor(true)} className="mt-4 border-white border px-6 py-2 rounded-lg bg-[#EAB308] hover:bg-[#D19B07]">Doctor Login</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
