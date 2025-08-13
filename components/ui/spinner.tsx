import React from 'react'

const Spinner = () => {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div
                className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-primary"
                aria-label="Loading"
                role="status"
            />
        </div>
    )
}

export default Spinner