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

export interface RoleEmail {
    role: string
    subject: string
    body: string
}

export interface VideoScript {
    opening?: string
    supporting_visuals?: string
    executive_return?: string
    supporting_visuals_two?: string
    closing?: string
    fade_out?: string
}

// Parsed video script content interface
export interface ParsedVideoScript {
    opening?: string
    supporting_visuals?: string
    executive_return?: string
    supporting_visuals_two?: string
    closing?: string
    fade_out?: string
}

export interface FAQ {
    question: string
    answer: string
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
    emails?: Record<string, { subject: string; body: string }>
    faqs?: FAQ[]
    video_script: string | null  // JSON string containing video script sections
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
    roleEmails: RoleEmail[]
    videoScript: VideoScript
    faqs: FAQ[]
    // Add project data
    project?: ProjectData
}
