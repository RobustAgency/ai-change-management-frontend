"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Sparkles } from 'lucide-react'


const BaseHeader = () => {
    const [isScrolled, setIsScrolled] = useState(false)

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
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-gray-900">ChangeAI</span>
                    </div>
                    <nav className="flex items-center space-x-8">
                        <a href="#features" className="hidden md:block text-gray-600 hover:text-indigo-600 font-medium transition-colors">
                            Features
                        </a>
                        <a href="#pricing" className="hidden md:block text-gray-600 hover:text-indigo-600 font-medium transition-colors">
                            Pricing
                        </a>
                        <Link href="/dashboard">
                            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Get Started</Button>
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default BaseHeader