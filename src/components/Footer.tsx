import { Link } from '@tanstack/react-router';

export function Footer() {
    return (
        <nav style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
            <Link to="/">
                Home
            </Link>
            <Link to="/about">
                About
            </Link>
            {/* Add more links here later, e.g., for login */}
        </nav>
    );
}