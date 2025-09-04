"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import ProjectOverviewTabs from "./ProjectOverviewTabs"
import ContainerCard from "@/components/custom/ContainerCard"
import { AssetData } from "./types"

const assetData: AssetData = {
    slideDecks: [
        {
            id: 1,
            title: "Executive Overview",
            audience: "Executives",
            slides: 5,
            status: "ready",
            lastModified: "2024-01-20",
        },
        {
            id: 2,
            title: "Manager Briefing",
            audience: "Managers",
            slides: 7,
            status: "ready",
            lastModified: "2024-01-20",
        },
    ],
    emails: [
        {
            id: 1,
            type: "Launch Announcement",
            audience: "All Staff",
            subject: "Important Update: Q4 Digital Transformation Initiative",
            status: "ready",
        },
        {
            id: 2,
            type: "Manager Briefing",
            audience: "Managers",
            subject: "Action Required: Prepare Your Team for Digital Transformation",
            status: "ready",
        },
        {
            id: 3,
            type: "Follow-up Reminder",
            audience: "All Staff",
            subject: "Reminder: Digital Transformation Training Deadline Approaching",
            status: "ready",
        },
    ],
    videoScript: {
        title: "Digital Transformation Overview",
        duration: "2-3 minutes",
        status: "ready",
        wordCount: 285,
        content: `[HOOK - 0:00-0:15]
"In the next 60 days, we're embarking on a digital transformation that will revolutionize how we work, collaborate, and serve our customers. Here's what you need to know."

[WHAT & WHY - 0:15-1:30]
"Our Q4 Digital Transformation initiative introduces new cloud-based tools and streamlined processes designed to increase efficiency by 40% and improve customer response times. This change positions us for sustainable growth and keeps us competitive in our rapidly evolving market."

[BENEFITS - 1:30-2:15]
"For you, this means less time on manual tasks, better collaboration tools, and more opportunities to focus on high-value work that drives results. Our customers will experience faster service and more personalized solutions."

[NEXT STEPS - 2:15-2:45]
"Training begins next week, with full implementation by December 1st. Your manager will share specific timelines and resources. We're here to support you every step of the way."

[CLOSING - 2:45-3:00]
"Together, we're building a more efficient, innovative future. Thank you for your commitment to this important initiative."`,
    },
    faqs: [
        {
            audience: "All Staff",
            questionCount: 8,
            questions: [
                {
                    q: "When will the digital transformation begin?",
                    a: "The transformation will begin on November 1st, with full implementation completed by December 1st, 2024.",
                },
                {
                    q: "Will I need to learn new software?",
                    a: "Yes, we'll be implementing new cloud-based collaboration tools. Comprehensive training will be provided to ensure you're comfortable with all new systems.",
                },
                {
                    q: "How will this affect my daily work?",
                    a: "Initially, there may be a learning curve, but the new tools are designed to streamline your workflow and reduce manual tasks by up to 40%.",
                },
            ],
        },
        {
            audience: "Managers",
            questionCount: 6,
            questions: [
                {
                    q: "How do I prepare my team for this change?",
                    a: "We'll provide you with a manager's toolkit including communication templates, training schedules, and change management resources.",
                },
                {
                    q: "What support is available during the transition?",
                    a: "Dedicated support staff will be available 24/7 during the first two weeks, plus ongoing help desk support and peer mentoring programs.",
                },
            ],
        },
    ],
}

export default function ProjectOverview() {
    const handleEdit = (content: string) => {
        // Handle edit functionality here
        console.log("Editing content:", content)
    }

    return (
        <div className="bg-gray-50">
            <div className="flex items-center justify-end space-x-3 pb-5">
                {/* <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Regenerate All
                </Button> */}
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export All Assets
                </Button>
            </div>
            <ContainerCard
                title="Q4 Digital Transformation"
                description="Your AI-generated communication assets are ready for review and export"
            >
                <ProjectOverviewTabs assetData={assetData} onEdit={handleEdit} />
            </ContainerCard>
        </div>
    )
}
