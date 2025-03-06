"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // If you want to programmatically navigate
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { registerUser } from "@/app/service/user-service";
import { authSuccess } from "@/app/store/slices/authSlice";

export default function SignUpPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );

  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [Error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const resultAction = await dispatch(
      registerUser({ email: formData.email, password: formData.password }),
    );

    if (registerUser.fulfilled.match(resultAction)) {
      router.push("/dashboard");
    } else {
      if (resultAction.payload) {
        setError(resultAction.payload as string);
      } else {
        setError("Registration failed");
      }
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <a
          href="#"
          className="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="mr-2 size-8"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Hellobuild Test Cristian
        </a>
        <div
          className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 
                        dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0"
        >
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1
              className="text-xl font-bold leading-tight tracking-tight text-gray-900 
                           dark:text-white md:text-2xl"
            >
              Create an account
            </h1>

            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              {Error && (
                <div className="rounded bg-red-100 p-2 text-sm text-red-600">
                  {Error}
                </div>
              )}
              {error && (
                <div className="rounded bg-red-100 p-2 text-sm text-red-600">
                  {error}
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="name@company.com"
                  className="focus:border-primary-600 focus:ring-primary-600 block w-full rounded-lg 
                 border border-gray-300 bg-gray-50 p-2.5 
                 text-sm text-gray-900 
                 dark:border-gray-600 dark:bg-gray-700 
                 dark:text-white dark:placeholder:text-gray-400 
                 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  required
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="focus:border-primary-600 focus:ring-primary-600 block w-full rounded-lg border 
                   border-gray-300 bg-gray-50 p-2.5 pr-10 
                   text-sm text-gray-900
                   dark:border-gray-600 dark:bg-gray-700 dark:text-white 
                   dark:placeholder:text-gray-400 
                   dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    required
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center px-2 
                   text-sm text-gray-600 dark:text-gray-300"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="••••••••"
                    className="focus:border-primary-600 focus:ring-primary-600 block w-full rounded-lg border 
                   border-gray-300 bg-gray-50 p-2.5 pr-10 
                   text-sm text-gray-900
                   dark:border-gray-600 dark:bg-gray-700 dark:text-white 
                   dark:placeholder:text-gray-400 
                   dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    required
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center px-2 
                   text-sm text-gray-600 dark:text-gray-300"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full 
               rounded-lg px-5 py-2.5 
               text-center text-sm font-medium 
               text-white focus:outline-none 
               focus:ring-4"
              >
                Create an account
              </button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <a
                  href="/"
                  className="text-primary-600 dark:text-primary-500 font-medium 
                 hover:underline"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
