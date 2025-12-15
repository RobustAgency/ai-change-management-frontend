"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { useAuth } from '@/providers/AuthProvider'
import Image from 'next/image'


const BaseHeader = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const { user, isLoading } = useAuth()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 2)
        }
        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
            <div className={`container mx-auto px-6 ${isScrolled ? 'py-3' : 'py-5'} transition-all duration-300`}>
                <div className="flex justify-between items-center">
                    <Image width={165} height={100} src="/logo.png" alt="Logo" />
                    <nav className="flex items-center space-x-8">
                        <a href="#features" className="hidden md:block text-gray-600 hover:text-primary font-medium transition-colors">
                            Features
                        </a>
                        <a href="#pricing" className="hidden md:block text-gray-600 hover:text-primary font-medium transition-colors">
                            Pricing
                        </a>
                        <Link href={user ? "/dashboard" : "/login"}>
                            <Button className="bg-primary hover:bg-indigo-700 text-white">
                                {isLoading ? "Get Started" : user ? "Dashboard" : "Get Started"}
                            </Button>
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default BaseHeader