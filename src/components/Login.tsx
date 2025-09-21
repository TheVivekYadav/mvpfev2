import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAppStore } from "../store/AppStore";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import Input from "./ui/Input.tsx";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const login = useAppStore(state => state.login);

    const loginMutation = useMutation({
        mutationFn: () => login(email, password),

        onSuccess: () => {
            showSuccessToast("Login successful!");
            navigate({ to: "/dashboard" });
        },

        onError: (error: Error) => {
            showErrorToast(error.message || "An unexpected error occurred.");
            setPassword("");
        },
    });

    function handleOnSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!email || !password) {
            showErrorToast("Please fill in all fields.");
            return;
        }
        loginMutation.mutate();
    }

    return (
        <>
            {/* Wrapper with a slightly more vibrant gradient background */}
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-gray-200 p-4">

                <div className="w-full max-w-md mx-auto rounded-2xl shadow-xl bg-white border border-gray-200/80">

                    {/* Header Section */}
                    <div className="p-8 border-b border-gray-200/80">
                        <h2 className="text-2xl font-bold text-gray-800">Welcome Back!</h2>
                        <p className="mt-1 text-sm text-gray-500">Please enter your details to sign in.</p>
                    </div>

                    {/* Form Section */}
                    <form onSubmit={handleOnSubmit} className="flex flex-col p-8 gap-5">

                        {/* Email Input */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="email" className="text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <Input
                                id="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full" // Pass w-full to your custom component if needed
                                placeholder="you@example.com"
                                disabled={loginMutation.isPending}
                            />
                        </div>

                        {/* Password Input */}
                        <div className="flex flex-col gap-1.5">
                            <div className="flex justify-between items-center">
                                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a>
                            </div>
                            <Input
                                id="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full"
                                type="password"
                                placeholder="••••••••••"
                                disabled={loginMutation.isPending}
                            />
                        </div>

                        {/* Error Message Display */}
                        {loginMutation.isError && (
                            <div className="flex items-center gap-2 p-3 text-sm text-red-700 bg-red-50 rounded-lg">
                                {/* Error Icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                <p>{loginMutation.error.message}</p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button type="submit" disabled={loginMutation.isPending} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-full transition-colors disabled:opacity-70 mt-4 hover:cursor-pointer">
                            {loginMutation.isPending ? "Signing In..." : "Sign In"}
                        </button>

                        {/* Footer Link */}
                        <p className="mt-4 text-center text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                Sign Up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}