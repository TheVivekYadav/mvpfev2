import {Link} from "@tanstack/react-router";
import {useAppStore} from "../store/AppStore";

export function Navbar() {
    const user = useAppStore((s) => s.user);
    const isLoggedIn = !!user;

    return (
        <nav
            className="flex items-center justify-between px-6 py-3 bg-white/80 backdrop-blur border-b border-blue-100 shadow-sm">
            <div className="flex items-center gap-3">
                <span className="font-bold text-xl text-blue-700 tracking-tight">Expense Split</span>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
                <Link
                    to="/"
                    className="px-3 py-1 rounded hover:bg-blue-50 text-blue-700 font-medium transition"
                >
                    Home
                </Link>
                <Link
                    to="/about"
                    className="px-3 py-1 rounded hover:bg-blue-50 text-blue-700 font-medium transition"
                >
                    About
                </Link>
                {!isLoggedIn && (
                    <>
                        <Link
                            to="/login"
                            className="px-3 py-1 rounded hover:bg-green-50 text-green-700 font-medium transition"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="px-3 py-1 rounded hover:bg-purple-50 text-purple-700 font-medium transition"
                        >
                            Register
                        </Link>
                    </>
                )}
                {isLoggedIn && (
                    <>
                        <Link
                            to="/dashboard"
                            className="px-3 py-1 rounded hover:bg-yellow-50 text-yellow-700 font-medium transition"
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/logout"
                            className="px-3 py-1 rounded hover:bg-red-50 text-red-600 font-medium transition"
                        >
                            Log Out
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}