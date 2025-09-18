import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Overview from './tabs/Overview'
import SlideDecks from './tabs/SlideDecks'
import EmailSeries from './tabs/EmailSeries'
import VideoScript from './tabs/VideoScript'
import FAQs from './tabs/FAQs'
import { AssetData } from './types'

interface ProjectOverviewTabsProps {
    assetData: AssetData
    onEdit?: (content: string) => void
}

const ProjectOverviewTabs = ({ assetData, onEdit }: ProjectOverviewTabsProps) => {
    const tabs = [
        { value: "overview", label: "Overview", component: <Overview assetData={assetData} /> },
        { value: "slides", label: "Slide Decks", component: <SlideDecks slideDecks={assetData.slideDecks} project={assetData.project} /> },
        { value: "emails", label: "Email Series", component: <EmailSeries emails={assetData.emails} onEdit={onEdit} /> },
        { value: "video", label: "Video Script", component: <VideoScript videoScript={assetData.videoScript} /> },
        { value: "faqs", label: "FAQs", component: <FAQs faqs={assetData.faqs} /> },
    ]

    return (
        <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-5 max-w-2xl bg-white border p-1 h-10 sm:h-12">
                {tabs.map(({ value, label }) => (
                    <TabsTrigger
                        key={value}
                        value={value}
                        className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white font-medium sm:font-semibold text-xs sm:text-sm lg:text-base px-2 sm:px-3 lg:px-4"
                    >
                        {label}
                    </TabsTrigger>
                ))}
            </TabsList>
            {tabs.map(({ value, component }) => (
                <TabsContent key={value} value={value} className="space-y-4 sm:space-y-6 lg:space-y-8 mt-4 sm:mt-6 lg:mt-8">
                    {component}
                </TabsContent>
            ))}
        </Tabs>
    )
}

export default ProjectOverviewTabs
