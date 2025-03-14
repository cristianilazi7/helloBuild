"use client"; // Ensures this is treated as a client component

import { loginUser } from "@/app/service/auth-service";
import {
  authFailure,
  authStart,
  authSuccess,
} from "@/app/store/slices/authSlice";
import { AppDispatch, RootState } from "@/app/store/store";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

export default function SignInForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { error } = useSelector((state: RootState) => state.auth);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    dispatch(authStart());
    try {
      const userData = await dispatch(loginUser(formData)).unwrap();
      dispatch(authSuccess({ token: userData.token, user: userData.user }));
      router.push("/dashboard");
    } catch (err) {
      dispatch(
        authFailure((err as Error).message || "Invalid email or password"),
      );
    }
  };
  return (
    <section className="w-full max-w-md bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8">
        <a
          href="#"
          className="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
        >
          Hellobuild Test Cristian
        </a>
        <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
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
                  onChange={handleChange}
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full 
                             rounded-lg border border-gray-300 
                             bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 
                             dark:text-white dark:placeholder-gray-400 
                             dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  onChange={handleChange}
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full 
                             rounded-lg border border-gray-300 
                             bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 
                             dark:text-white dark:placeholder-gray-400 
                             dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="remember"
                      type="checkbox"
                      className="focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 h-4 w-4 rounded 
                                 border border-gray-300 bg-gray-50 
                                 dark:border-gray-600 dark:bg-gray-700 
                                 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-primary-600 dark:text-primary-500 text-sm font-medium hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              {error && (
                <p className="rounded bg-red-100 p-2 text-sm text-red-600">
                  {error}
                </p>
              )}
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 
                           dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full 
                           rounded-lg px-5 py-2.5 text-center text-sm font-medium 
                           text-white focus:outline-none 
                           focus:ring-4"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  href="/signup"
                  className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
