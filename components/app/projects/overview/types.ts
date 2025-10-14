// TypeScript interfaces for Project Overview components
import { MediaFile } from '@/interfaces/Project'

export interface SlideDeck {
    id: number
    title: string
    audience: string
    slides: number
    status: string
    lastModified: string
}

export interface Email {
    id: number
    type: string
    audience: string
    subject: string
    status: string
}

export interface VideoScript {
    title: string
    duration: string
    status: string
    wordCount: number
    content: string
}

export interface FAQ {
    q: string
    a: string
}

export interface FAQSet {
    audience: string
    questionCount: number
    questions: FAQ[]
}

// New interfaces for API data
export interface AIContent {
    id: number
    project_id: number
    slides_content: {
        benefits: string[]
        key_stakeholders: string[]
        executive_summary: string
        change_management_strategy: string
    }
    faqs: Record<string, unknown> | null
    video_script: Record<string, unknown> | null
    created_at: string
    updated_at: string
}

export interface ProjectData {
    id: number
    name: string
    launch_date: string
    type: string
    sponsor_name: string
    sponsor_title: string
    business_goals: string
    summary: string
    expected_outcomes: string
    template_id: number
    stakeholders: Array<{
        name: string
        department: string
        role_level: string
    }>
    client_organization: string
    status: string
    media: MediaFile[]
    ai_content: AIContent
    created_at: string
    updated_at: string
}

export interface AssetData {
    slideDecks: SlideDeck[]
    emails: Email[]
    videoScript: VideoScript
    faqs: FAQSet[]
    // Add project data
    project?: ProjectData
}
