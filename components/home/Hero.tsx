"use client"
import { ArrowRight, Clock, FileText, Mail, Play, Presentation, Star, Users } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

const Hero = () => {
    const [activePreview, setActivePreview] = useState<'slides' | 'emails' | 'videos'>('slides')
    const activeIndex = activePreview === 'slides' ? 0 : activePreview === 'emails' ? 1 : 2

    return (
        <section className="container pb-20">
            <div className="grid gap-16 items-start lg:flex lg:justify-between">
                {/* Left Column - Hero Content */}
                <div className="space-y-4 md:space-y-8">
                    <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium">
                        <Star className="w-4 h-4" />
                        AI-Driven Change Management Platform
                    </div>

                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                        Transform weeks of
                        <span className="block text-primary">manual work</span>
                        <span>into minutes</span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                        Generate personalized slide decks, email series, video scripts, and FAQs tailored for every stakeholder
                        in your organization.
                    </p>

                    {/* Value Props */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                            <Clock className="w-5 h-5 text-primary" />
                            <span className="font-medium text-gray-700">Generate in minutes</span>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                            <Users className="w-5 h-5 text-primary" />
                            <span className="font-medium text-gray-700">Multi-audience targeting</span>
                        </div>
                    </div>

                </div>

                {/* Right Column */}
                <div className="lg:max-w-md mx-auto w-full place-self-end">
                    <Card className="bg-gray-50 shadow-xl border-0 overflow-hidden pt-0">
                        <CardHeader className="text-center py-4 bg-gradient-to-r from-primary to-purple-600 text-white rounded-tr-2xl rounded-tl-2xl">
                            <CardTitle className="text-xl font-bold">See What You'll Generate</CardTitle>
                            <CardDescription className="text-indigo-100">Professional assets ready in minutes</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="w-full">
                                <div className="relative grid w-full grid-cols-3 border-b">
                                    <button
                                        onClick={() => setActivePreview('slides')}
                                        className={`cursor-pointer flex items-center justify-center gap-2 py-3 text-sm ${activePreview === 'slides' ? 'text-primary' : 'text-gray-600'}`}
                                    >
                                        <Presentation className="w-4 h-4" />
                                        Slides
                                    </button>
                                    <button
                                        onClick={() => setActivePreview('emails')}
                                        className={`cursor-pointer flex items-center justify-center gap-2 py-3 text-sm ${activePreview === 'emails' ? 'text-primary' : 'text-gray-600'}`}
                                    >
                                        <Mail className="w-4 h-4" />
                                        Emails
                                    </button>
                                    <button
                                        onClick={() => setActivePreview('videos')}
                                        className={`cursor-pointer flex items-center justify-center gap-2 py-3 text-sm ${activePreview === 'videos' ? 'text-primary' : 'text-gray-600'}`}
                                    >
                                        <Play className="w-4 h-4" />
                                        Scripts
                                    </button>
                                    <div
                                        className="z-50 absolute bottom-0 left-0 h-[2px] bg-primary transition-transform duration-300 ease-in-out"
                                        style={{ width: '33.3333%', transform: `translateX(${activeIndex * 100}%)` }}
                                    />
                                </div>

                                <div className="min-h-56">
                                    {activePreview === 'slides' && (
                                        <div className="p-6 space-y-4">
                                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border">
                                                <div className="text-sm font-semibold text-indigo-800 mb-2">Executive Summary Slide</div>
                                                <div className="space-y-2">
                                                    <div className="h-2 bg-indigo-200 rounded w-3/4"></div>
                                                    <div className="h-2 bg-indigo-100 rounded w-full"></div>
                                                    <div className="h-2 bg-indigo-100 rounded w-2/3"></div>
                                                </div>
                                                <div className="flex justify-between items-center mt-3">
                                                    <div className="text-xs text-primary">PowerPoint Ready</div>
                                                    <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                                                        <FileText className="w-3 h-3 text-white" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-sm text-gray-600">+ 12 more slides generated</div>
                                            </div>
                                        </div>
                                    )}

                                    {activePreview === 'emails' && (
                                        <div className="p-6 space-y-4">
                                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border">
                                                <div className="text-sm font-semibold text-emerald-800 mb-2">Manager Communication</div>
                                                <div className="space-y-1">
                                                    <div className="h-2 bg-emerald-200 rounded w-3/4"></div>
                                                    <div className="h-2 bg-emerald-100 rounded w-full"></div>
                                                    <div className="h-2 bg-emerald-100 rounded w-2/3"></div>
                                                </div>
                                                <div className="flex justify-between items-center mt-3">
                                                    <div className="text-xs text-emerald-600">Role-Specific Tone</div>
                                                    <div className="w-6 h-6 bg-emerald-600 rounded flex items-center justify-center">
                                                        <Mail className="w-3 h-3 text-white" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-sm text-gray-600">+ Executive & Staff versions</div>
                                            </div>
                                        </div>
                                    )}

                                    {activePreview === 'videos' && (
                                        <div className="p-6 space-y-4">
                                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border">
                                                <div className="text-sm font-semibold text-purple-800 mb-2">Video Script - 3 min</div>
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                                        <div className="h-1.5 bg-purple-200 rounded w-3/4"></div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
                                                        <div className="h-1.5 bg-purple-100 rounded w-5/6"></div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
                                                        <div className="h-1.5 bg-purple-100 rounded w-2/3"></div>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center mt-3">
                                                    <div className="text-xs text-purple-600">Engaging & Clear</div>
                                                    <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center">
                                                        <Play className="w-3 h-3 text-white" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-sm text-gray-600">+ FAQ document included</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="p-6 pt-4 bg-gray-50">
                                <Link href="/login">
                                    <Button className="w-full h-12 bg-primary hover:bg-indigo-700 text-white font-semibold">
                                        Get Started
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}

export default Hero