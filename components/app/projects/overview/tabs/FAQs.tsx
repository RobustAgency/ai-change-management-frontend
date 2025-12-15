import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HelpCircle, ChevronDown } from "lucide-react"
import { useState } from 'react'

interface FAQ {
    question: string
    answer: string
}

interface FAQsProps {
    faqs: FAQ[]
}

const FAQs = ({ faqs }: FAQsProps) => {
    const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)

    const toggleFAQ = (index: number) => {
        setExpandedFAQ(expandedFAQ === index ? null : index)
    }

    if (!faqs || faqs.length === 0) {
        return (
            <div className="text-center py-12">
                <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No FAQs Available</h3>
                <p className="text-gray-600">FAQs will be generated when AI content is available.</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <Card className="border-0 shadow-sm bg-white">
                <CardHeader className="bg-indigo-600 text-white rounded-t-lg">
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <HelpCircle className="w-5 h-5" />
                                Frequently Asked Questions
                            </CardTitle>
                            <CardDescription className="text-indigo-100 mt-2">
                                Find answers to common questions about your change management project
                            </CardDescription>
                        </div>
                        <Badge className="bg-white/20 text-white border-white/30">Ready</Badge>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="cursor-pointer w-full px-4 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex justify-between items-center"
                                >
                                    <span className="font-medium text-gray-900 pr-4">
                                        {faq.question}
                                    </span>
                                    <ChevronDown
                                        className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-300 ${expandedFAQ === index ? 'rotate-180' : ''
                                            }`}
                                    />
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                    }`}>
                                    <div className="px-4 py-4 bg-white border-t border-gray-200">
                                        <p className="text-gray-700 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default FAQs
