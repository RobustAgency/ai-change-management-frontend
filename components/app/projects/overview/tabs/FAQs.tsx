import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { HelpCircle, Download, Edit, Eye, Users } from "lucide-react"
import { FAQSet } from '../types'

interface FAQsProps {
    faqs: FAQSet[]
}

const FAQs = ({ faqs }: FAQsProps) => {
    return (
        <div className="grid gap-6">
            {faqs.map((faqSet, index) => (
                <Card key={index} className="border-0 shadow-sm bg-white">
                    <CardHeader className="bg-green-600 text-white rounded-t-lg">
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="flex items-center gap-3 text-xl">
                                    <HelpCircle className="w-5 h-5" />
                                    FAQ Set - {faqSet.audience}
                                </CardTitle>
                                <CardDescription className="text-green-100 mt-2 flex items-center gap-2">
                                    <Users className="w-4 h-4" />
                                    {faqSet.questionCount} questions and answers
                                </CardDescription>
                            </div>
                            <Badge className="bg-white/20 text-white border-white/30">Ready</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                        <div className="space-y-4">
                            {faqSet.questions.slice(0, 2).map((qa, qaIndex) => (
                                <div key={qaIndex} className="bg-gray-50 p-4 rounded-lg border">
                                    <p className="font-bold text-gray-900 text-base mb-3 flex items-start gap-2">
                                        <span className="text-green-600">Q:</span>
                                        {qa.q}
                                    </p>
                                    <p className="text-gray-700 leading-relaxed flex items-start gap-2">
                                        <span className="text-green-600 font-semibold">A:</span>
                                        {qa.a}
                                    </p>
                                </div>
                            ))}
                            {faqSet.questionCount > 2 && (
                                <div className="text-center py-4">
                                    <p className="text-gray-500 font-medium">
                                        +{faqSet.questionCount - 2} more questions available in full document
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" size="sm" className="flex-1 h-12 bg-transparent">
                                <Eye className="w-4 h-4 mr-2" />
                                View All FAQs
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1 h-12 bg-transparent">
                                <Edit className="w-4 h-4 mr-2" />
                                Edit FAQs
                            </Button>
                            <Button
                                size="sm"
                                className="flex-1 h-12 bg-green-600 hover:bg-green-700 text-white font-semibold"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Download DOCX
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default FAQs
