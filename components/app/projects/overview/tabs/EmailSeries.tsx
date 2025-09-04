import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, Download, Edit, Eye, Target } from "lucide-react"
import { Email } from '../types'

interface EmailSeriesProps {
    emails: Email[]
    onEdit?: (content: string) => void
}

const EmailSeries = ({ emails, onEdit }: EmailSeriesProps) => {
    const handleEdit = (content: string) => {
        if (onEdit) {
            onEdit(content)
        }
    }

    return (
        <div className="grid gap-6">
            {emails.map((email) => (
                <Card key={email.id} className="border-0 shadow-sm bg-white">
                    <CardHeader className="bg-green-600 text-white rounded-t-lg">
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="flex items-center gap-3 text-xl">
                                    <Mail className="w-5 h-5" />
                                    {email.type}
                                </CardTitle>
                                <CardDescription className="text-green-100 mt-2">Target: {email.audience}</CardDescription>
                            </div>
                            <Badge className="bg-white/20 text-white border-white/30">Ready</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                <Target className="w-4 h-4" />
                                Subject Line:
                            </p>
                            <p className="text-base text-gray-900 font-medium">{email.subject}</p>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" size="sm" className="flex-1 h-12 bg-transparent">
                                <Eye className="w-4 h-4 mr-2" />
                                Preview Email
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 h-12 bg-transparent"
                                onClick={() => handleEdit(email.subject)}
                            >
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Content
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

export default EmailSeries
