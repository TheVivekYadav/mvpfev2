import {Link} from "@tanstack/react-router";

export function Navbar() {
    return (
        <nav className="flex gap-6 p-4 bg-gray-100 rounded shadow items-center">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium">About</Link>
            <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium">Login</Link>
            <Link to="/register" className="text-gray-700 hover:text-blue-600 font-medium">Register</Link>
            <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">Dashboard</Link>
            <Link to="/logout" className="text-gray-700 hover:text-blue-600 font-medium">Log Out</Link>
        </nav>
    );
}