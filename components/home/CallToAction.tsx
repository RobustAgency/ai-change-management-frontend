import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'

const CallToAction = () => {
    return (
        <section className="py-20 bg-primary -mx-6 px-6 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Change Communication?</h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                Join change professionals who save hours with AI-powered communication assets.
            </p>
            <Link href="/dashboard">
                <Button size="lg" className="h-14 px-8 bg-white text-primary hover:bg-gray-50 font-semibold text-lg">
                    Start Free Trial
                    <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
            </Link>
        </section>
    )
}

export default CallToAction