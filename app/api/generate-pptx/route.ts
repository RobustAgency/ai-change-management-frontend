import { NextRequest, NextResponse } from 'next/server';
import PptxGenJS from 'pptxgenjs';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
    try {
        const projectData = await request.json();

        // Create a new presentation
        const pptx = new PptxGenJS();

        // Slide 1: Change Management Strategy (Title slide)
        const slide1 = pptx.addSlide();
        slide1.addText('Change Management Strategy', {
            x: 0.5,
            y: 1.5,
            w: 9,
            h: 2.5,
            fontSize: 48,
            bold: true,
            align: 'left',
            color: '1F2937',
            lineSpacing: 32
        });

        slide1.addText(projectData?.name || 'S4/HANA Enterprise Resource Planning (ERP)', {
            x: 0.5,
            y: 4.5,
            w: 9,
            h: 1,
            fontSize: 20,
            align: 'left',
            color: '6B7280'
        });

        // Slide 2: Agenda
        const slide2 = pptx.addSlide();
        slide2.addText('Agenda', {
            x: 0.5,
            y: 0.5,
            w: 9,
            h: 1.5,
            fontSize: 48,
            bold: true,
            align: 'left',
            color: '1F2937'
        });

        const agendaItems = [
            'Executive Summary',
            'Benefits',
            'Key Stakeholders',
            'High-Level Change Management Strategy'
        ];

        agendaItems.forEach((item, index) => {
            slide2.addText(`• ${item}`, {
                x: 0.5,
                y: 2.5 + (index * 0.8),
                w: 9,
                h: 0.7,
                fontSize: 18,
                align: 'left',
                color: '374151'
            });
        });

        // Slide 3: Executive Summary
        const slide3 = pptx.addSlide();
        slide3.addText('Executive Summary', {
            x: 0.5,
            y: 0.5,
            w: 9,
            h: 1.5,
            fontSize: 48,
            bold: true,
            align: 'left',
            color: '1F2937'
        });

        const executiveSummary = projectData?.ai_content?.slides_content?.executive_summary ||
            'This project represents a strategic initiative to transform our organization through effective change management practices.';

        slide3.addText(executiveSummary, {
            x: 0.5,
            y: 2.5,
            w: 9,
            h: 4.5,
            fontSize: 16,
            align: 'left',
            color: '374151',
            wrap: true,
            lineSpacing: 20
        });

        // Slide 4: Benefits
        const slide4 = pptx.addSlide();
        slide4.addText('Benefits', {
            x: 0.5,
            y: 0.5,
            w: 9,
            h: 1.5,
            fontSize: 48,
            bold: true,
            align: 'left',
            color: '1F2937'
        });

        const benefits = projectData?.ai_content?.slides_content?.benefits || [
            'Improved operational efficiency',
            'Enhanced employee engagement',
            'Reduced resistance to change',
            'Better stakeholder alignment'
        ];

        benefits.forEach((benefit: string, index: number) => {
            slide4.addText(`• ${benefit}`, {
                x: 0.5,
                y: 2.5 + (index * 0.8),
                w: 9,
                h: 0.7,
                fontSize: 16,
                align: 'left',
                color: '374151',
                wrap: true
            });
        });

        // Slide 5: Key Stakeholders
        const slide5 = pptx.addSlide();
        slide5.addText('Key Stakeholders', {
            x: 0.5,
            y: 0.5,
            w: 9,
            h: 1.5,
            fontSize: 48,
            bold: true,
            align: 'left',
            color: '1F2937'
        });

        const stakeholders = projectData?.ai_content?.slides_content?.key_stakeholders || [
            'Executive Leadership',
            'Project Team',
            'End Users',
            'IT Department',
            'Human Resources'
        ];

        stakeholders.forEach((stakeholder: string, index: number) => {
            slide5.addText(`• ${stakeholder}`, {
                x: 0.5,
                y: 2.5 + (index * 0.8),
                w: 9,
                h: 0.7,
                fontSize: 16,
                align: 'left',
                color: '374151',
                wrap: true
            });
        });

        // Slide 6: High-Level Change Management Strategy
        const slide6 = pptx.addSlide();
        slide6.addText('High-Level Change Management Strategy', {
            x: 0.5,
            y: 0.5,
            w: 9,
            h: 1.5,
            fontSize: 42,
            bold: true,
            align: 'left',
            color: '1F2937'
        });

        const strategy = projectData?.ai_content?.slides_content?.change_management_strategy ||
            'Our comprehensive change management strategy focuses on stakeholder engagement, communication, training, and continuous support to ensure successful transformation.';

        slide6.addText(strategy, {
            x: 0.5,
            y: 2.5,
            w: 9,
            h: 4.5,
            fontSize: 16,
            align: 'left',
            color: '374151',
            wrap: true,
            lineSpacing: 20
        });

        // Generate the presentation as a buffer
        const pptxData = await pptx.write({ outputType: 'nodebuffer' }) as Buffer;

        // Create filename
        const fileName = projectData?.name
            ? `${projectData.name.replace(/[^a-zA-Z0-9]/g, '_')}_Change_Management_Strategy.pptx`
            : 'Change_Management_Strategy.pptx';

        // Return the file as a download
        return new NextResponse(new Uint8Array(pptxData), {
            status: 200,
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                'Content-Disposition': `attachment; filename="${fileName}"`,
                'Content-Length': pptxData.byteLength.toString(),
            },
        });

    } catch (error) {
        console.error('Error generating PowerPoint:', error);
        return NextResponse.json(
            { error: 'Failed to generate PowerPoint presentation' },
            { status: 500 }
        );
    }
}