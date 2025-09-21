import { Link, useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";
import authService from "../api/authService";
import Input from "./ui/Input.tsx"; // Assuming your Input component passes down className

export function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const res = await authService.register({
                name: form.name,
                email: form.email,
                password: form.password
            });
            if (res.data && res.data.user) {
                setSuccess(true);
                setTimeout(() => navigate({ to: "/login" }), 1500);
            } else {
                console.log(`Response status code:`)
                setError(`${res.data.status} - ${res.data.message || "An error occurred. Please try again."}`);
            }
        } catch (e: any) {
            console.log(e.response.status)
            if (e.response?.status === 409) {
                setError("Email already exists. Please use a different email.");
            }
            else
                setError(e?.response?.data?.error || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    // Input field styles for consistency
    const inputStyles = "w-full px-3 py-2 border border-slate-300 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition";

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200/80 p-8">

                {/* Header */}
                <div className="text-left mb-8">
                    <h2 className="text-2xl font-bold text-slate-800">Create an Account</h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Please fill in the details to get started.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="name">
                            Full Name
                        </label>
                        <Input
                            className={inputStyles}
                            type="text"
                            name="name"
                            id="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Alisha Sharma"
                            required
                            autoComplete="name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="email">
                            Email Address
                        </label>
                        <Input
                            className={inputStyles}
                            type="email"
                            name="email"
                            id="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            required
                            autoComplete="email"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="password">
                            Password
                        </label>
                        <Input
                            className={inputStyles}
                            type="password"
                            name="password"
                            id="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="••••••••••"
                            required
                            autoComplete="new-password"
                        />
                    </div>

                    {error && <div className="text-red-600 text-sm text-center pt-2">{error}</div>}
                    {success && <div className="text-green-600 text-sm text-center pt-2">Registration successful! Redirecting...</div>}

                    <button
                        type="submit"
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-full transition-colors disabled:opacity-70 mt-4 hover:cursor-pointer"
                        disabled={loading}
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>
                </form>

                {/* Footer Link */}
                <p className="text-center text-sm text-slate-600 mt-8">
                    Already have an account?{' '}
                    <Link to="/login" className="font-semibold text-violet-600 hover:text-violet-500">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}