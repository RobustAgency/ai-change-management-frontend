import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { CheckCircle, Clock, Users } from 'lucide-react'

const Features = () => {
    return (
        <section id="features" className='bg-gray-50'>
            <div className="container mx-auto py-20 px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">Everything You Need for Change Communication</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Generate all your communication assets in one seamless workflow
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                        <CardHeader className="text-center pb-4">
                            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Clock className="w-8 h-8 text-indigo-600" />
                            </div>
                            <CardTitle className="text-xl">Lightning Fast Generation</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <p className="text-gray-600 leading-relaxed">
                                Transform weeks of manual work into minutes of AI-powered generation. Get professional results
                                instantly.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                        <CardHeader className="text-center pb-4">
                            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-indigo-600" />
                            </div>
                            <CardTitle className="text-xl">Smart Audience Targeting</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <p className="text-gray-600 leading-relaxed">
                                Generate personalized content for executives, managers, and frontline workers with appropriate tone
                                and detail level.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                        <CardHeader className="text-center pb-4">
                            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-8 h-8 text-indigo-600" />
                            </div>
                            <CardTitle className="text-xl">Professional Quality</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <p className="text-gray-600 leading-relaxed">
                                All generated assets maintain professional standards with consistent messaging and formatting across
                                every communication channel.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}

export default Features