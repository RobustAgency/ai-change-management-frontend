import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import React from 'react'
import PptxGenJS from 'pptxgenjs'

// Dummy data structure - in the future this will come from API
const dummyProjectData = {
    projectName: "AI Change Management Initiative",
    overview: "This project aims to implement AI-driven change management solutions to improve organizational efficiency and employee adaptation.",
    keyMetrics: [
        { metric: "Employee Adoption Rate", value: "85%", change: "+12%" },
        { metric: "Process Efficiency", value: "92%", change: "+18%" },
        { metric: "Cost Reduction", value: "$250K", change: "+25%" },
        { metric: "Time Savings", value: "40 hrs/week", change: "+30%" }
    ],
    timeline: [
        { phase: "Planning & Assessment", duration: "4 weeks", status: "Completed" },
        { phase: "Implementation", duration: "8 weeks", status: "In Progress" },
        { phase: "Training & Rollout", duration: "6 weeks", status: "Upcoming" },
        { phase: "Evaluation & Optimization", duration: "4 weeks", status: "Planned" }
    ],
    risks: [
        { risk: "Employee Resistance", impact: "Medium", mitigation: "Comprehensive training program" },
        { risk: "Technical Integration", impact: "High", mitigation: "Phased rollout approach" },
        { risk: "Budget Overrun", impact: "Low", mitigation: "Regular budget reviews" }
    ]
}

const generatePPTX = async () => {
    try {
        // Create a new presentation
        const pptx = new PptxGenJS()

        // Slide 1: Title Slide
        const slide1 = pptx.addSlide()
        slide1.addText(dummyProjectData.projectName, {
            x: 1,
            y: 2,
            w: 8,
            h: 1.5,
            fontSize: 32,
            bold: true,
            align: 'center',
            color: '363636'
        })
        slide1.addText('Project Overview & Analytics', {
            x: 1,
            y: 4,
            w: 8,
            h: 1,
            fontSize: 18,
            align: 'center',
            color: '666666'
        })

        // Slide 2: Project Overview
        const slide2 = pptx.addSlide()
        slide2.addText('Project Overview', {
            x: 0.5,
            y: 0.5,
            w: 9,
            h: 0.8,
            fontSize: 24,
            bold: true,
            color: '363636'
        })
        slide2.addText(dummyProjectData.overview, {
            x: 0.5,
            y: 1.5,
            w: 9,
            h: 2,
            fontSize: 14,
            color: '666666',
            valign: 'top'
        })

        // Slide 3: Key Metrics
        const slide3 = pptx.addSlide()
        slide3.addText('Key Performance Metrics', {
            x: 0.5,
            y: 0.5,
            w: 9,
            h: 0.8,
            fontSize: 24,
            bold: true,
            color: '363636'
        })

        // Add metrics as a table
        const metricsTableData = [
            [
                { text: 'Metric', options: { bold: true } },
                { text: 'Current Value', options: { bold: true } },
                { text: 'Change', options: { bold: true } }
            ],
            ...dummyProjectData.keyMetrics.map(item => [
                { text: item.metric },
                { text: item.value },
                { text: item.change }
            ])
        ]

        slide3.addTable(metricsTableData, {
            x: 1,
            y: 1.5,
            w: 8,
            h: 3,
            fontSize: 12,
            border: { pt: 1, color: 'CCCCCC' },
            fill: { color: 'F8F9FA' }
        })

        // Slide 4: Timeline
        const slide4 = pptx.addSlide()
        slide4.addText('Project Timeline', {
            x: 0.5,
            y: 0.5,
            w: 9,
            h: 0.8,
            fontSize: 24,
            bold: true,
            color: '363636'
        })

        const timelineTableData = [
            [
                { text: 'Phase', options: { bold: true } },
                { text: 'Duration', options: { bold: true } },
                { text: 'Status', options: { bold: true } }
            ],
            ...dummyProjectData.timeline.map(item => [
                { text: item.phase },
                { text: item.duration },
                { text: item.status }
            ])
        ]

        slide4.addTable(timelineTableData, {
            x: 1,
            y: 1.5,
            w: 8,
            h: 3,
            fontSize: 12,
            border: { pt: 1, color: 'CCCCCC' },
            fill: { color: 'F8F9FA' }
        })

        // Slide 5: Risk Assessment
        const slide5 = pptx.addSlide()
        slide5.addText('Risk Assessment', {
            x: 0.5,
            y: 0.5,
            w: 9,
            h: 0.8,
            fontSize: 24,
            bold: true,
            color: '363636'
        })

        const riskTableData = [
            [
                { text: 'Risk', options: { bold: true } },
                { text: 'Impact', options: { bold: true } },
                { text: 'Mitigation Strategy', options: { bold: true } }
            ],
            ...dummyProjectData.risks.map(item => [
                { text: item.risk },
                { text: item.impact },
                { text: item.mitigation }
            ])
        ]

        slide5.addTable(riskTableData, {
            x: 0.5,
            y: 1.5,
            w: 9,
            h: 3,
            fontSize: 11,
            border: { pt: 1, color: 'CCCCCC' },
            fill: { color: 'F8F9FA' }
        })

        // Generate and download the presentation
        const fileName = `${dummyProjectData.projectName.replace(/\s+/g, '_')}_Report_${new Date().toISOString().split('T')[0]}.pptx`
        await pptx.writeFile({ fileName })
        
        console.log('PPTX generated successfully!')
    } catch (error) {
        console.error('Error generating PPTX:', error)
        alert('Error generating PPTX. Please try again.')
    }
}

const DownloadPPTX = () => {
    return (
        <Button
            size="sm"
            className="h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
            onClick={generatePPTX}
        >
            <Download className="w-4 h-4 mr-2" />
            Download PPTX
        </Button>
    )
}

export default DownloadPPTX