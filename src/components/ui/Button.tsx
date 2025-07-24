import * as React from 'react';

// Use an interface to define all the props the button can accept
interface ButtonProps extends React.ComponentProps<'button'> {
    variant?: 'primary' | 'secondary';
}

export default function Button({
                                   className,
                                   children,
                                   variant = 'primary', // Default to the 'primary' look
                                   ...props
                               }: ButtonProps) {
    // Define base styles that apply to all variants
    const baseStyles = 'px-4 py-2 font-semibold rounded-md transition-colors';

    // Define styles specific to each variant
    const variantStyles = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    };

    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${className || ''}`}
            {...props}
        >
            {children}
        </button>
    );
}