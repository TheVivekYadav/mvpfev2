import {Link} from "@tanstack/react-router";

export function Navbar() {
    return (
        <nav className="flex gap: 1rem; padding: 1rem; background-color: #f0f0f0;">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/login">Login</Link>
            <Link to="/dashboard">Dashboard</Link>
        </nav>
    )
}