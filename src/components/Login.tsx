import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAppStore } from "../store/AppStore";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import Button from "./ui/Button.tsx";
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100">
            <div className="w-full max-w-lg mx-auto rounded-xl shadow-lg bg-white">
                <h1 className="text-blue-700 p-6 text-center text-2xl font-bold">Login to continue...</h1>
                <form onSubmit={handleOnSubmit} className="flex flex-col items-center justify-center p-6 gap-4">
                    <label htmlFor="email" className="sr-only">Email</label>
                    <Input
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="block"
                        placeholder="contact@thevivekyadav.me"
                        disabled={loginMutation.isPending}
                    />

                    <label htmlFor="password" className="sr-only">Password</label>
                    <Input
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="block"
                        type="password"
                        placeholder="••••••••••"
                        disabled={loginMutation.isPending}
                    />

                    {loginMutation.isError && (
                        <p className="text-sm text-red-600">
                            {loginMutation.error.message}
                        </p>
                    )}

                    <Button type="submit" disabled={loginMutation.isPending} className="w-full">
                        {loginMutation.isPending ? "Logging in..." : "Login"}
                    </Button>
                </form>
            </div>
        </div>
    );
}