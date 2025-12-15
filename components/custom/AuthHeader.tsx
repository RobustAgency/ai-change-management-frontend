import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const AuthHeader = () => {
    return (
        <header>
            <div className="container mx-auto px-2 md:px-6 py-6">
                <div className="flex justify-between items-center">
                    <Link href="/" className="flex items-center space-x-3">
                        <Image width={165} height={100} src="/logo.png" alt="Logo" />
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default AuthHeader