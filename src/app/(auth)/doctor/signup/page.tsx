// import AuthForm from "@/components/ui/AuthForm";

// export default function DoctorSignup() {
//   return <AuthForm role="doctor" type="signup" />;
// }

// import AuthForm from "@/components/ui/AuthForm";

// export default function DoctorSignup() {
//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Left Side - Illustration */}
//       <div className="w-1/2 flex items-center justify-center p-10 bg-blue-50">
//         <img src="/images/SignUpPic.jpg" alt="Doctor Sign Up" className="max-w-full h-auto" />
//       </div>
      
//       {/* Right Side - Form */}
//       <div className="w-1/2 flex items-center justify-center">
//         <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
//           <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">Create Account</h2>
//           <AuthForm role="doctor" type="signup" />
//         </div>
//       </div>
//     </div>
//   );
// }


import DoctorSignupForm from "@/components/ui/DoctorSignupForm";

export default function DoctorSignup() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Side - Illustration */}
      <div className="w-1/2 flex items-center justify-center p-10 bg-blue-50">
        <img src="/images/SignUpPic.jpg" alt="Doctor Sign Up" className="max-w-full h-auto" />
      </div>
      
      {/* Right Side - Form */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">Create Account</h2>
          <DoctorSignupForm />
        </div>
      </div>
    </div>
  );
}
