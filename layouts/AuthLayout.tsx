import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='relative flex flex-col h-svh items-center justify-center'>
            <Link href="/" className='absolute top-4 left-4'>
                <Image src="/logo.png" alt="logo" width={100} height={100} className='object-cover object-start w-30 h-14' />
            </Link>
            {children}
        </div>
    )
}

export default AuthLayout