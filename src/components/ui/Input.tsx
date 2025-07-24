import * as React from 'react';

interface InputProps extends React.ComponentProps<'input'> {
    variant?: 'default' | 'outlined';
}

export default function Input({
                                  className,
                                  variant = "default",
                                  ...props
                              }: InputProps) {
    const baseStyles = 'px-4 py-2 font-semibold rounded-md transition-colors';
    const variantStyles = {
        default: 'border border-gray-300 focus:border-blue-500 focus:ring-blue-500',
        outlined: 'border border-gray-400 focus:border-blue-600 focus:ring-blue-600',
    };
    return (
        <input
            className={`${baseStyles} ${variantStyles[variant]} ${className || ''}`}
            {...props}
        />
    );
}