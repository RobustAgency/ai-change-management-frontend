"use client"

import { useRouter } from "next/navigation"
import ProjectOverviewTabs from "./ProjectOverviewTabs"
import ContainerCard from "@/components/custom/ContainerCard"
import ExportAll from "./ExportAll"
import { AssetData, ProjectData, SlideDeck, RoleEmail } from "./types"
import { useProject } from "@/hooks/app/useProjects"
import Spinner from "@/components/ui/spinner"
import { useParams } from "next/navigation"

const generateSlideDecksFromAI = (project: ProjectData): SlideDeck[] => {
    const slideDecks: SlideDeck[] = []

    if (project.ai_content?.slides_content) {
        const { slides_content } = project.ai_content

        // Slide 1: Change Management Strategy (fixed slide)
        slideDecks.push({
            id: 1,
            title: "Change Management Strategy",
            audience: "All Stakeholders",
            slides: 1,
            status: "ready",
            lastModified: project.ai_content.updated_at,
        })

        // Slide 2: Agenda (fixed slide)
        slideDecks.push({
            id: 2,
            title: "Agenda",
            audience: "All Stakeholders",
            slides: 1,
            status: "ready",
            lastModified: project.ai_content.updated_at,
        })

        // Slide 3: Executive Summary (from AI content)
        if (slides_content.executive_summary) {
            slideDecks.push({
                id: 3,
                title: "Executive Summary",
                audience: "Executives",
                slides: 1,
                status: "ready",
                lastModified: project.ai_content.updated_at,
            })
        }

        // Slide 4: Benefits (from AI content)
        if (slides_content.benefits && slides_content.benefits.length > 0) {
            slideDecks.push({
                id: 4,
                title: "Benefits",
                audience: "All Stakeholders",
                slides: 1,
                status: "ready",
                lastModified: project.ai_content.updated_at,
            })
        }

        // Slide 5: Key Stakeholders (from AI content)
        if (slides_content.key_stakeholders && slides_content.key_stakeholders.length > 0) {
            slideDecks.push({
                id: 5,
                title: "Key Stakeholders",
                audience: "Management",
                slides: 1,
                status: "ready",
                lastModified: project.ai_content.updated_at,
            })
        }
    }

    return slideDecks
}

const generateRoleEmailsFromAI = (project: ProjectData): RoleEmail[] => {
    const roleEmails: RoleEmail[] = []

    if (project.ai_content?.emails) {
        const emails = project.ai_content.emails as Record<string, { subject: string; body: string }>

        Object.entries(emails).forEach(([role, emailData]) => {
            roleEmails.push({
                role,
                subject: emailData.subject,
                body: emailData.body,
            })
        })
    }

    return roleEmails
}

interface ProjectOverviewProps {
    projectId?: string
}

export default function ProjectOverview({ projectId }: ProjectOverviewProps) {
    const params = useParams()
    const router = useRouter()
    const id = projectId || (params?.id as string)
    const { project, loading, error } = useProject(id)

    const handleEdit = (content: string) => {
        console.log("Editing content:", content)
    }

    if (loading) {
        return (
            <div className="bg-gray-50 min-h-screen flex items-center justify-center">
                <Spinner size="lg" />
            </div>
        )
    }

    if (error || !project) {
        return (
            <div className="bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Project not found</h2>
                    <p className="text-gray-600">{error || "Unable to load project data"}</p>
                </div>
            </div>
        )
    }

    // Redirect to dashboard if ai_content is not available
    if (project && !project.ai_content) {
        return (
            <div className="bg-gray-50 min-h-screen">
                <ContainerCard
                    title={project.name}
                    description="AI content is not available for this project"
                >
                    <div className="text-center py-12">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Content Not Generated</h3>
                        <p className="text-gray-600 mb-6">
                            AI content has not been generated for this project yet. Please go back to the dashboard to generate content.
                        </p>
                        <button
                            onClick={() => router.push('/dashboard')}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
                        >
                            Back to Dashboard
                        </button>
                    </div>
                </ContainerCard>
            </div>
        )
    }

    // Generate asset data from the project
    const assetData: AssetData = {
        slideDecks: generateSlideDecksFromAI(project as ProjectData),
        emails: [], // Legacy: keeping for backward compatibility
        roleEmails: generateRoleEmailsFromAI(project as ProjectData),
        videoScript: project?.ai_content?.video_script || null,
        faqs: project?.ai_content?.faqs || [], // Pass FAQs directly from AI content
        project: project as ProjectData,
    }

    return (
        <div className="bg-gray-50">
            <ContainerCard
                title={project?.name || ""}
                description="Your AI-generated communication assets are ready for review and export"
                action={<ExportAll project={project as ProjectData} />}
            >

                <ProjectOverviewTabs assetData={assetData} onEdit={handleEdit} />
            </ContainerCard>
        </div>
    )
}
