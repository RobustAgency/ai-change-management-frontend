import { Card, CardContent } from '@/components/ui/card'
import { Calendar, Clock, Download, FileText } from 'lucide-react'
import React from 'react'

const Metrics = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="border-0 shadow-sm bg-white">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Total Projects</p>
                            <p className="text-3xl font-bold text-gray-900">12</p>
                            <p className="text-sm text-green-600 font-medium">+3 this month</p>
                        </div>
                        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
                            <FileText className="w-6 h-6 text-indigo-600" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">This Month</p>
                            <p className="text-3xl font-bold text-gray-900">3</p>
                            <p className="text-sm text-gray-600">2 remaining</p>
                        </div>
                        <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Assets Generated</p>
                            <p className="text-3xl font-bold text-gray-900">48</p>
                            <p className="text-sm text-green-600 font-medium">24 this week</p>
                        </div>
                        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
                            <Download className="w-6 h-6 text-indigo-600" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Time Saved</p>
                            <p className="text-3xl font-bold text-gray-900">47h</p>
                            <p className="text-sm text-gray-600">This month</p>
                        </div>
                        <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                            <Clock className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Metrics