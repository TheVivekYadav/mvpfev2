import Button from "./ui/Button.tsx";
import Input from "./ui/Input.tsx";
import {useState} from "react";
import {useNavigate} from "@tanstack/react-router";
import {useAppStore} from "../store/AppStore";

export function Login() {
    // 1. Add state for loading and error messages
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const login = useAppStore(state => state.login);

    // 2. Use a form and handle the onSubmit event
    async function handleOnSubmit(e: React.FormEvent) {
        e.preventDefault(); // Prevent the default form submission
        setError(""); // Clear previous errors

        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        setIsLoading(true); // Set loading to true
        try {
            const success = await login(email, password);
            if (success) {
                navigate({to: "/dashboard"});
            } else {
                // 3. Set a user-friendly error message instead of an alert
                setError("Login failed. Please check your credentials.");
                // 4. Only clear the password on failure for better UX
                setPassword("");
            }
        } catch (e) {
            setError("An unexpected error occurred. Please try again.");
            setPassword("");
        } finally {
            setIsLoading(false); // Set loading to false when done
        }
    }

    return (
        // 5. Use a responsive max-width instead of a fixed width
        <div className="bg-amber-800 w-full max-w-lg mx-auto rounded-lg shadow-md">
            <h1 className="text-white p-4 text-center text-2xl font-bold">Login to continue...</h1>

            {/* Use a <form> element for better semantics and accessibility */}
            <form onSubmit={handleOnSubmit} className="flex flex-col items-center justify-center p-4 gap-4">

                {/* 6. Add labels for accessibility (sr-only hides them visually) */}
                <label htmlFor="email" className="sr-only">Email</label>
                <Input
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="block"
                    placeholder="contact@thevivekyadav.me"
                    disabled={isLoading}
                />

                <label htmlFor="password" className="sr-only">Password</label>
                <Input
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="block"
                    type="password"
                    placeholder="••••••••••"
                    disabled={isLoading}
                />

                {/* 7. Conditionally render the error message */}
                {error && <p className="text-red-300 text-sm">{error}</p>}

                <Button type="submit" disabled={isLoading}>
                    {/* Show different text based on loading state */}
                    {isLoading ? "Logging in..." : "Login"}
                </Button>
            </form>
        </div>
    );
}