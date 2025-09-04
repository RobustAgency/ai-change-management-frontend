// TypeScript interfaces for Project Overview components

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

export interface AssetData {
    slideDecks: SlideDeck[]
    emails: Email[]
    videoScript: VideoScript
    faqs: FAQSet[]
}
