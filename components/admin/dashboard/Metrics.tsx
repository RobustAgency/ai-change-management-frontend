import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Users, Activity, FileText, DollarSign } from "lucide-react"

const platformStats = {
    totalUsers: 1247,
    activeUsers: 892,
    totalProjects: 3456,
    monthlyRevenue: 28450
}

const Metrics = () => {
    return (
        <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="border-0 shadow-sm bg-white">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Total Users</p>
                            <p className="text-3xl font-bold text-gray-900">{platformStats.totalUsers.toLocaleString()}</p>
                        </div>
                        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
                            <Users className="w-6 h-6 text-indigo-600" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Active Users</p>
                            <p className="text-3xl font-bold text-gray-900">{platformStats.activeUsers.toLocaleString()}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                            <Activity className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Total Projects</p>
                            <p className="text-3xl font-bold text-gray-900">{platformStats.totalProjects.toLocaleString()}</p>
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
                            <p className="text-sm font-medium text-gray-600 mb-1">Monthly Revenue</p>
                            <p className="text-3xl font-bold text-gray-900">${platformStats.monthlyRevenue.toLocaleString()}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                            <DollarSign className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Metrics