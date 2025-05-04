"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Cookies from "js-cookie"
import { AlertMessage } from "@/components/ui/alert-message"
import { FormField } from "@/components/ui/form-field"
import {
  checkDuplicate,
  getAllDoctorSpecializations,
  sendOTP,
  validateRegistration,
} from "@/APIServices/users/usersAPI"

export default function SignupPage() {
  const router = useRouter()
  const [isDoctor, setIsDoctor] = useState(false)
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
  })
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({})
  const [notification, setNotification] = useState<{
    type: "error" | "success" | "info" | "warning"
    message: string
  } | null>(null)
  const [loading, setLoading] = useState(false)
  const [validatingReg, setValidatingReg] = useState(false)
  const [regValidated, setRegValidated] = useState(false)
  const [specializations, setSpecializations] = useState<{ lookupID: number; value: string }[]>([])

  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const response = await getAllDoctorSpecializations()
        if (!response || !Array.isArray(response.data)) {
          throw new Error("Invalid API response: Expected an array inside response.data.")
        }
        const formatted = response.data.map((spec: any) => ({
          lookupID: spec.lookupID,
          value: spec.value,
        }))
        setSpecializations(formatted)
      } catch (error) {
        setNotification({
          type: "error",
          message: "Failed to load specializations. Please try again.",
        })
      }
    }
    fetchSpecializations()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    // Clear field-specific errors when user starts typing
    setErrors((prev) => ({ ...prev, [name]: [] }))
    // Reset registration validation for doctors
    if (name === "registrationNumber" || name === "name") {
      setRegValidated(false)
    }
  }

  const validateRegistrationNumber = async () => {
    if (!formData.registrationNumber || !formData.name) {
      setErrors((prev) => ({
        ...prev,
        registrationNumber: ["Registration number and name are required for verification."],
      }))
      return
    }

    setValidatingReg(true)
    setErrors((prev) => ({ ...prev, registrationNumber: [] }))

    try {
      const result = await validateRegistration(formData.registrationNumber, formData.name)
      if (!result.success) {
        setErrors((prev) => ({
          ...prev,
          registrationNumber: [result.message],
        }))
        setRegValidated(false)
      } else {
        setRegValidated(result.data?.isValid ?? false)
        if (result.data?.isValid) {
          setNotification({
            type: "success",
            message: "Registration number verified successfully!",
          })
        }
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        registrationNumber: ["Failed to validate registration number."],
      }))
    } finally {
      setValidatingReg(false)
    }
  }

  useEffect(() => {
    if (isDoctor && formData.registrationNumber && formData.name) {
      const handler = setTimeout(() => {
        validateRegistrationNumber()
      }, 1000)
      return () => clearTimeout(handler)
    }
  }, [formData.registrationNumber, formData.name, isDoctor])

  const validateForm = () => {
    const newErrors: { [key: string]: string[] } = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const cnicRegex = /^\d{5}\d{7}\d{1}$/
    const phoneRegex = /^03\d{9}$/

    if (!formData.name) newErrors.name = ["Name is required."]
    if (!formData.CNIC || !cnicRegex.test(formData.CNIC))
      newErrors.CNIC = ["Enter a valid CNIC (e.g., 1234567890123)."]
    if (!formData.phone || !phoneRegex.test(formData.phone))
      newErrors.phone = ["Enter a valid phone number (e.g., 03XXXXXXXXX)."]
    if (!formData.email || !emailRegex.test(formData.email)) newErrors.email = ["Enter a valid email."]
    const password = formData.password;

if (!password) {
  newErrors.password = ["Password is required."];
} else {
  const errors = [];

  if (password.length < 6) {
    errors.push("Password must be at least 6 characters long.");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must include at least one uppercase letter.");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must include at least one lowercase letter.");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Password must include at least one number.");
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push("Password must include at least one special character.");
  }

  if (errors.length > 0) {
    newErrors.password = errors;
  }
}

    if (isDoctor) {
      if (!formData.registrationNumber) newErrors.registrationNumber = ["Registration number is required."]
      else if (!regValidated) newErrors.registrationNumber = ["Registration number must be verified."]
      if (!formData.specialization) newErrors.specialization = ["Select a specialization."]
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setNotification(null)

    if (isDoctor && !regValidated) {
      setErrors({
        registrationNumber: ["Registration number must be verified before submission."],
      })
      return
    }

    if (!validateForm()) return

    setLoading(true)
    const updatedFormData = { ...formData, role: isDoctor ? "Doctor" : "Patient" }

    try {
      const duplicateResponse = await checkDuplicate(updatedFormData.email, updatedFormData.CNIC)
      if (!duplicateResponse.success) {
        if (duplicateResponse.errors) {
          
          setErrors(duplicateResponse.errors)
        } else {
          setNotification({
            type: "error",
            message: duplicateResponse.message || "Registration failed due to duplicate email or CNIC.",
          })
        }
        return
      }

      Cookies.set("tempUserData", JSON.stringify(updatedFormData))
      Cookies.set("userEmail", updatedFormData.email)
      Cookies.set("otpFlow", "signup")

      const otpResponse = await sendOTP(updatedFormData.email)
      if (!otpResponse.success) {
        setNotification({
          type: "error",
          message: otpResponse.message || "Failed to send OTP. Please try again.",
        })
        return
      }

      setNotification({
        type: "success",
        message: "OTP has been sent to your email. Redirecting to verification page...",
      })

      setTimeout(() => {
        router.push("/ConfirmationCode")
      }, 2000)
    } catch (error: any) {
      setNotification({
        type: "error",
        message: error.message || "An unexpected error occurred. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleManualVerification = () => {
    validateRegistrationNumber()
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-gray-100">
      <div className="relative w-[768px] min-h-[640px] bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Notification Banner */}
        {notification && (
          <div className="absolute top-0 left-0 right-0 z-50 px-4 pt-4">
            <AlertMessage
              type={notification.type}
              message={notification.message}
              onClose={() => setNotification(null)}
              autoClose={notification.type === "success"}
            />
          </div>
        )}

        {/* Patient Sign Up Form */}
        <form
          onSubmit={handleSubmit}
          className={`absolute top-0 left-0 h-full w-1/2 p-10 flex flex-col items-center justify-center transition-all duration-500 ${
            isDoctor ? "pointer-events-none -translate-x-full opacity-0" : "pointer-events-auto opacity-100"
          }`}
        >
          <h1 className="text-2xl font-semibold text-[#0A192F]">Patient Sign Up</h1>
          <button
            type="button"
            className="p-2 border rounded-lg w-48 flex items-center justify-center space-x-2 hover:bg-gray-100 transition mt-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-red-500"
            >
              <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
            </svg>
            <span className="text-sm font-medium">Continue with Google</span>
          </button>
          <span className="text-sm text-gray-600 mt-2">or use your email to register</span>

          <FormField name="name" errors={errors.name}>
            <input
              type="text"
              id="form-field-name"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-2 rounded-lg bg-gray-100 border ${
                errors.name?.length ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500 focus:border-blue-500"
              }`}
              disabled={loading}
            />
          </FormField>

          <FormField name="CNIC" errors={errors.CNIC}>
            <input
              type="text"
              id="form-field-CNIC"
              name="CNIC"
              placeholder="CNIC (e.g., 12345-6789012-3)"
              value={formData.CNIC}
              onChange={handleChange}
              className={`w-full p-2 rounded-lg bg-gray-100 border ${
                errors.CNIC?.length ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500 focus:border-blue-500"
              }`}
              disabled={loading}
            />
          </FormField>

          <FormField name="phone" errors={errors.phone}>
            <input
              type="text"
              id="form-field-phone"
              name="phone"
              placeholder="Phone Number (e.g., 03XXXXXXXXX)"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full p-2 rounded-lg bg-gray-100 border ${
                errors.phone?.length ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500 focus:border-blue-500"
              }`}
              disabled={loading}
            />
          </FormField>

          <FormField name="email" errors={errors.email}>
            <input
              type="email"
              id="form-field-email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2 rounded-lg bg-gray-100 border ${
                errors.email?.length ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500 focus:border-blue-500"
              }`}
              disabled={loading}
            />
          </FormField>

          <FormField name="password" errors={errors.password}>
            <input
              type="password"
              id="form-field-password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full p-2 rounded-lg bg-gray-100 border ${
                errors.password?.length
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500 focus:border-blue-500"
              }`}
              disabled={loading}
            />
          </FormField>

          <button
            type="submit"
            className="mt-6 bg-[#0077B6] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:bg-[#005F91] disabled:bg-gray-400 flex items-center justify-center min-w-[120px]"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                Registering...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
          <Link href="/login" className="text-sm text-[#2563EB] mt-2 hover:underline">
            Already have an account? Login
          </Link>
        </form>

        {/* Doctor Sign Up Form */}
        <form
          onSubmit={handleSubmit}
          className={`absolute top-0 left-0 h-full w-1/2 p-10 flex flex-col items-center justify-center transition-all duration-500 ${
            isDoctor ? "pointer-events-auto translate-x-full opacity-100 z-10" : "pointer-events-none opacity-0"
          }`}
        >
          <h1 className="text-2xl font-semibold text-[#0A192F]">Doctor Sign Up</h1>
          <button
            type="button"
            className="p-2 border rounded-lg w-48 flex items-center justify-center space-x-2 hover:bg-gray-100 transition mt-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-red-500"
            >
              <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
            </svg>
            <span className="text-sm font-medium">Continue with Google</span>
          </button>
          <span className="text-sm text-gray-600 mt-2">or use your email to register</span>

          <FormField name="name" errors={errors.name}>
            <input
              type="text"
              id="form-field-doctor-name"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-2 rounded-lg bg-gray-100 border ${
                errors.name?.length ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500 focus:border-blue-500"
              }`}
              disabled={loading}
            />
          </FormField>

          <FormField name="CNIC" errors={errors.CNIC}>
            <input
              type="text"
              id="form-field-doctor-CNIC"
              name="CNIC"
              placeholder="CNIC"
              value={formData.CNIC}
              onChange={handleChange}
              className={`w-full p-2 rounded-lg bg-gray-100 border ${
                errors.CNIC?.length ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500 focus:border-blue-500"
              }`}
              disabled={loading}
            />
          </FormField>

          <FormField name="phone" errors={errors.phone}>
            <input
              type="text"
              id="form-field-doctor-phone"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full p-2 rounded-lg bg-gray-100 border ${
                errors.phone?.length ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500 focus:border-blue-500"
              }`}
              disabled={loading}
            />
          </FormField>

          <FormField name="email" errors={errors.email}>
            <input
              type="email"
              id="form-field-doctor-email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2 rounded-lg bg-gray-100 border ${
                errors.email?.length ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500 focus:border-blue-500"
              }`}
              disabled={loading}
            />
          </FormField>

          <FormField name="password" errors={errors.password}>
            <input
              type="password"
              id="form-field-doctor-password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full p-2 rounded-lg bg-gray-100 border ${
                errors.password?.length
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500 focus:border-blue-500"
              }`}
              disabled={loading}
            />
          </FormField>

          <FormField
            name="registrationNumber"
            errors={errors.registrationNumber}
            loading={validatingReg}
            loadingMessage="Validating..."
            success={regValidated}
            successMessage="Verified"
          >
            <input
              type="text"
              id="form-field-doctor-registrationNumber"
              name="registrationNumber"
              placeholder="Medical Registration Number"
              value={formData.registrationNumber}
              onChange={handleChange}
              className={`w-full p-2 rounded-lg bg-gray-100 border ${
                errors.registrationNumber?.length
                  ? "border-red-500 focus:ring-red-500"
                  : regValidated
                    ? "border-green-500 focus:ring-green-500"
                    : "focus:ring-blue-500 focus:border-blue-500"
              }`}
              disabled={loading}
            />
          </FormField>

          <div className="w-full flex justify-start">
            <button
              type="button"
              onClick={handleManualVerification}
              className="text-sm text-blue-600 hover:text-blue-800 disabled:text-gray-400 flex items-center mt-1"
              disabled={!formData.registrationNumber || !formData.name || loading || validatingReg}
            >
              {validatingReg ? (
                <>
                  <span className="animate-spin h-3 w-3 border-2 border-blue-500 border-t-transparent rounded-full mr-1"></span>
                  Verifying...
                </>
              ) : (
                "Verify Registration"
              )}
            </button>
          </div>

          <FormField name="specialization" errors={errors.specialization}>
            <select
              id="form-field-doctor-specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className={`w-full p-2 rounded-lg bg-gray-100 border ${
                errors.specialization?.length
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500 focus:border-blue-500"
              }`}
              disabled={loading}
            >
              <option value="" disabled>
                Select Specialization
              </option>
              {specializations.map((spec) => (
                <option key={spec.lookupID} value={spec.lookupID}>
                  {spec.value}
                </option>
              ))}
            </select>
          </FormField>

          <button
            type="submit"
            className="mt-6 bg-[#0077B6] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:bg-[#005F91] disabled:bg-gray-400 flex items-center justify-center min-w-[120px]"
            disabled={loading || (isDoctor && !regValidated)}
          >
            {loading ? (
              <>
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                Registering...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
          <Link href="/login" className="text-sm text-[#2563EB] mt-2 hover:underline">
            Already have an account? Login
          </Link>
        </form>

        {/* Side Panel */}
        <div
          className={`absolute top-0 left-1/2 h-full w-1/2 bg-[#023E8A] text-white flex flex-col items-center justify-center transition-all duration-500 ${
            isDoctor ? "-translate-x-full" : ""
          }`}
        >
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
  )
}
