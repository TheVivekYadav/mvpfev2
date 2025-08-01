import React, {useState} from "react";
import Button from "./ui/Button.tsx";
import Input from "./ui/Input.tsx";
import {useNavigate} from "@tanstack/react-router";
import authService from "../api/authService";

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
        setForm({...form, [e.target.name]: e.target.value});
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
                setTimeout(() => navigate({to: "/login"}), 1500);
            } else {
                setError("Registration failed. Please try again.");
            }
        } catch (e: any) {
            setError(e?.response?.data?.error || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-blue-700 mb-1" htmlFor="name">
                            Name
                        </label>
                        <Input
                            className="w-full px-4 py-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            type="text"
                            name="name"
                            id="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            autoComplete="name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-blue-700 mb-1" htmlFor="email">
                            Email
                        </label>
                        <Input
                            className="w-full px-4 py-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            type="email"
                            name="email"
                            id="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            autoComplete="email"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-blue-700 mb-1" htmlFor="password">
                            Password
                        </label>
                        <Input
                            className="w-full px-4 py-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            type="password"
                            name="password"
                            id="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            autoComplete="new-password"
                        />
                    </div>
                    {error && <div className="text-red-600 text-sm">{error}</div>}
                    {success && <div className="text-green-600 text-sm">Registration successful!</div>}
                    <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-colors"
                        disabled={loading}
                    >
                        {loading ? "Registering..." : "Register"}
                    </Button>
                </form>
            </div>
        </div>
    );
}