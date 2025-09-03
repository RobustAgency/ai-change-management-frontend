import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { CheckCircle, Sparkles, Star, Zap } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'

const Pricing = () => {
    return (
        <section id="pricing" className="container mx-auto px-14 py-20">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Simple, Transparent Pricing</h2>
                <p className="text-xl text-gray-600">Choose the plan that fits your needs</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {/* Free Plan */}
                <Card className="border-2 border-gray-200 bg-white hover:shadow-lg transition-all">
                    <CardHeader className="text-center pb-6">
                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <Star className="w-6 h-6 text-gray-600" />
                        </div>
                        <CardTitle className="text-2xl">Free</CardTitle>
                        <div className="text-4xl font-bold text-gray-900 mt-2">
                            $0<span className="text-lg font-normal text-gray-600">/month</span>
                        </div>
                        <p className="text-gray-600 mt-2">Perfect for trying out</p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span className="text-gray-700">1 project per month</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span className="text-gray-700">Basic templates</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span className="text-gray-700">Standard export formats</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span className="text-gray-700">Email support</span>
                            </li>
                        </ul>
                        <Link href={"/login"}>
                            <Button variant="outline" className="w-full h-12 font-semibold bg-transparent">
                                Get Started
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                {/* Starter Plan */}
                <Card className="border-2 border-indigo-500 bg-white relative shadow-xl scale-105">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <div className="bg-primary text-white px-6 py-2 rounded-full text-sm font-bold">Most Popular</div>
                    </div>
                    <CardHeader className="text-center pb-6 pt-8">
                        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <CardTitle className="text-2xl">Starter</CardTitle>
                        <div className="text-4xl font-bold text-gray-900 mt-2">
                            $29<span className="text-lg font-normal text-gray-600">/month</span>
                        </div>
                        <p className="text-gray-600 mt-2">For growing teams</p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span className="text-gray-700">5 projects per month</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span className="text-gray-700">Premium templates</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span className="text-gray-700">Advanced editing tools</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span className="text-gray-700">Priority support</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span className="text-gray-700">All export formats</span>
                            </li>
                        </ul>
                        <Link href={"/login"}>
                            <Button className="w-full h-12 bg-primary hover:bg-indigo-700 text-white font-semibold">
                                Get Started
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                {/* Pro Plan */}
                <Card className="border-2 border-gray-200 bg-white hover:shadow-lg transition-all">
                    <CardHeader className="text-center pb-6">
                        <div className="w-12 h-12 bg-gray-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <Zap className="w-6 h-6 text-white" />
                        </div>
                        <CardTitle className="text-2xl">Pro</CardTitle>
                        <div className="text-4xl font-bold text-gray-900 mt-2">
                            $99<span className="text-lg font-normal text-gray-600">/month</span>
                        </div>
                        <p className="text-gray-600 mt-2">For large organizations</p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span className="text-gray-700">Unlimited projects</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span className="text-gray-700">Custom templates</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span className="text-gray-700">Advanced analytics</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span className="text-gray-700">Dedicated support</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span className="text-gray-700">Team collaboration</span>
                            </li>
                        </ul>
                        <Link href={"/login"}>
                            <Button variant="outline" className="w-full h-12 font-semibold bg-transparent">
                                Get Started
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}

export default Pricing