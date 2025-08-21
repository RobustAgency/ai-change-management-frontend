import React from 'react'

interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg'
    className?: string
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'md', className = '' }) => {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12'
    }

    return (
        <div
            className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-border border-t-primary ${className}`}
            aria-label="Loading"
            role="status"
        />
    )
}

export default Spinner