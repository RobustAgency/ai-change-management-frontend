import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Mail, Video, HelpCircle, Download, Eye, RefreshCw } from "lucide-react"
import { AssetData } from '../types'

interface OverviewProps {
    assetData: AssetData
}

const Overview = ({ assetData }: OverviewProps) => {
    return (
        <React.Fragment>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-0 shadow-sm bg-white">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Slide Decks</p>
                                <p className="text-3xl font-bold text-gray-900">{assetData.slideDecks.length}</p>
                                <p className="text-sm text-gray-600">12 total slides</p>
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
                                <p className="text-sm font-medium text-gray-600 mb-1">Email Series</p>
                                <p className="text-3xl font-bold text-gray-900">{assetData.emails.length}</p>
                                <p className="text-sm text-gray-600">Multi-audience</p>
                            </div>
                            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                                <Mail className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-sm bg-white">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Video Script</p>
                                <p className="text-3xl font-bold text-gray-900">1</p>
                                <p className="text-sm text-gray-600">{assetData.videoScript.wordCount} words</p>
                            </div>
                            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
                                <Video className="w-6 h-6 text-indigo-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-sm bg-white">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">FAQ Sets</p>
                                <p className="text-3xl font-bold text-gray-900">{assetData.faqs.length}</p>
                                <p className="text-sm text-gray-600">14 total Q&As</p>
                            </div>
                            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                                <HelpCircle className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card className="border-0 shadow-sm bg-white pb-5">
                <CardHeader>
                    <CardTitle className="text-xl">Quick Actions</CardTitle>
                    <CardDescription>Common tasks for your generated assets</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                        <Button className="h-16 bg-indigo-600 hover:bg-indigo-700 text-white justify-start p-6">
                            <Download className="w-5 h-5 mr-3" />
                            <div className="text-left">
                                <div className="font-semibold">Download All</div>
                                <div className="text-sm opacity-90">Export complete package</div>
                            </div>
                        </Button>
                        <Button variant="outline" className="h-16 justify-start p-6 bg-transparent">
                            <Eye className="w-5 h-5 mr-3" />
                            <div className="text-left">
                                <div className="font-semibold">Preview All</div>
                                <div className="text-sm text-gray-600">Review before download</div>
                            </div>
                        </Button>
                        <Button variant="outline" className="h-16 justify-start p-6 bg-transparent">
                            <RefreshCw className="w-5 h-5 mr-3" />
                            <div className="text-left">
                                <div className="font-semibold">Regenerate</div>
                                <div className="text-sm text-gray-600">Create new versions</div>
                            </div>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}

export default Overview