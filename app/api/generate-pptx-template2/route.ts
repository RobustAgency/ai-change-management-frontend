import { NextRequest, NextResponse } from 'next/server';
import PptxGenJS from 'pptxgenjs';

// Utility function to decode HTML entities
const decodeHtmlEntities = (text: string): string => {
    if (!text) return text;
    return text
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&nbsp;/g, ' ');
};

// Template 2: Blue Theme (matching reference images)
const getTemplate2Styles = () => ({
    titleColor: '1F2937',
    subtitleColor: '374151',
    textColor: '1F2937',
    accentColor: '2563EB', // Blue instead of red
    backgroundColor: 'FFFFFF',
    secondaryAccent: 'DBEAFE', // Light blue
    tealColor: '08475E', // Dark teal for Template 2 design
    fontSize: {
        title: 44,
        subtitle: 18,
        heading: 38,
        body: 15,
        bullet: 15
    }
});

// Function to add template-specific header styling for Template 2
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const addTemplate2Header = (slide: any, styles: any) => {
    // Template 2 doesn't use header bars like Template 1
    // Keep slides clean as shown in reference images
};

// Helper function to add copyright footer to a slide
const addCopyrightFooter = (slide: any) => {
    // Position copyright just below content area, not at the very bottom
    // For 16:9 layout, position at 4.8 (just below main content)
    const copyrightY = 4.8;
    
    slide.addText('©2025 Life Vision, LLC - Innovative Dialogs(R)', {
        x: 0,
        y: copyrightY,
        w: 10,
        h: 0.25,
        fontSize: 8,
        color: '6B7280',
        align: 'center',
        bold: false
    });
};

// This API route handles Template 2 PowerPoint generation
export async function POST(request: NextRequest) {
    try {
        const { project } = await request.json();

        // Get template styles
        const styles = getTemplate2Styles();

        // Create a new presentation
        const pptx = new PptxGenJS()

        // Set layout
        pptx.layout = 'LAYOUT_16x9';

        // Slide 1: Change Management Strategy (Title slide) - Template 2 Design
        const slide1 = pptx.addSlide()

        // Right side - dark slate area (matching reference)
        slide1.addShape('rect', {
            x: 6,
            y: 0,
            w: 4,
            h: 5.625,
            fill: { color: '475569' } // Slate gray
        });

        // Main title on left side
        slide1.addText('Change\nManagement\nStrategy', {
            x: 0.75,
            y: 1.5,
            w: 5,
            h: 3,
            fontSize: 50,
            bold: true,
            align: 'left',
            color: styles.titleColor,
            lineSpacing: 56
        });

        // Project name subtitle
        if (project?.name) {
            slide1.addText(decodeHtmlEntities(project.name), {
                x: 0.75,
                y: 4.2,
                w: 5,
                h: 0.5,
                fontSize: 18,
                align: 'left',
                color: '6B7280'
            });
        }

        // Add copyright footer
        addCopyrightFooter(slide1);

        // Slide 2: Agenda - Template 2 Design
        const slide2 = pptx.addSlide()
        addTemplate2Header(slide2, styles);

        slide2.addText('Agenda', {
            x: 0.5,
            y: 0.4,
            w: 9,
            h: 1,
            fontSize: styles.fontSize.title,
            bold: true,
            align: 'left',
            color: styles.titleColor
        });

        const agendaItems = [
            { number: '1', text: 'Executive Summary' },
            { number: '2', text: 'Benefits' },
            { number: '3', text: 'Key Stakeholders' },
            { number: '4', text: 'High Level Change Management Strategy' }
        ];

        agendaItems.forEach((item, index) => {
            const yPos = 1.3 + (index * 1.0);

            // Red number text (no circle background)
            slide2.addText(item.number, {
                x: 0.5,
                y: yPos,
                w: 0.6,
                h: 0.6,
                fontSize: 32,
                bold: true,
                color: 'DC2626', // Red color
                align: 'left',
                valign: 'middle'
            });

            // Text
            slide2.addText(item.text, {
                x: 1.3,
                y: yPos + 0.1,
                w: 8,
                h: 0.4,
                fontSize: 24,
                color: styles.textColor,
                align: 'left',
                valign: 'middle'
            });
        });

        // Add copyright footer
        addCopyrightFooter(slide2);

        // Slide 3: Executive Summary - Template 2 Design
        const slide3 = pptx.addSlide()
        addTemplate2Header(slide3, styles);

        slide3.addText('Executive Summary', {
            x: 0.5,
            y: 0.4,
            w: 9,
            h: 1,
            fontSize: styles.fontSize.title,
            bold: true,
            align: 'left',
            color: styles.titleColor
        });

        const execSummaryData = project?.ai_content?.slides_content?.executive_summary_slide;

        // Light blue content area (no header bar)
        slide3.addShape('rect', {
            x: 0.5,
            y: 1.3,
            w: 9,
            h: 3.6,
            fill: { color: 'DBEAFE' } // Light blue
        });

        // Content text
        const summaryText = decodeHtmlEntities(execSummaryData?.project_overview || 'This project represents a strategic initiative to transform our organization through effective change management practices.');
        slide3.addText(summaryText, {
            x: 0.7,
            y: 1.5,
            w: 8.6,
            h: 3.2,
            fontSize: 14,
            color: styles.textColor,
            align: 'left',
            valign: 'top'
        });

        // Add copyright footer
        addCopyrightFooter(slide3);

        // Slide 4: Benefits - Template 2 Design
        const slide4 = pptx.addSlide()
        addTemplate2Header(slide4, styles);

        slide4.addText('Benefits', {
            x: 0.5,
            y: 0.4,
            w: 9,
            h: 1,
            fontSize: styles.fontSize.title,
            bold: true,
            align: 'left',
            color: styles.titleColor
        });

        const benefitCards = project?.ai_content?.slides_content?.benefits_slide?.benefit_cards || [];

        // Benefits grid - 3x2 layout for Template 2 (matching updated design)
        const benefitPositions = [
            { x: 0.5, y: 1.3 }, { x: 3.6, y: 1.3 }, { x: 6.7, y: 1.3 },
            { x: 0.5, y: 3.2 }, { x: 3.6, y: 3.2 }, { x: 6.7, y: 3.2 }
        ];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        benefitCards.forEach((benefit: any, index: number) => {
            if (index >= 6) return; // Only show 6 benefits
            const pos = benefitPositions[index];
            if (!pos) return;

            // Outer dashed border
            slide4.addShape('rect', {
                x: pos.x,
                y: pos.y + 0.3, // Offset for title tab
                w: 2.9,
                h: 1.4,
                fill: { color: 'FFFFFF' },
                line: { color: '93C5FD', width: 2, dashType: 'dash' }
            });

            // Title tab background (dark teal)
            slide4.addShape('rect', {
                x: pos.x + 0.3,
                y: pos.y,
                w: 2.3,
                h: 0.6,
                fill: { color: styles.tealColor } // Dark teal
            });

            // Title text
            const benefitTitle = decodeHtmlEntities(benefit.title || `Benefit ${index + 1}`);
            slide4.addText(benefitTitle, {
                x: pos.x + 0.4,
                y: pos.y + 0.1,
                w: 2.1,
                h: 0.4,
                fontSize: 10,
                bold: true,
                color: 'FFFFFF',
                align: 'center',
                valign: 'middle'
            });

            // Content area with bullet points
            if (benefit.bullet_list && benefit.bullet_list.length > 0) {
                const bulletText = benefit.bullet_list.slice(0, 3).map((item: string) => `• ${decodeHtmlEntities(item)}`).join('\n');
                slide4.addText(bulletText, {
                    x: pos.x + 0.2,
                    y: pos.y + 0.8,
                    w: 2.5,
                    h: 0.8,
                    fontSize: 9,
                    color: styles.textColor,
                    align: 'left',
                    valign: 'top'
                });
            }
        });

        // Add copyright footer
        addCopyrightFooter(slide4);

        // Slide 5: Stakeholders - Template 2 Design
        const slide5 = pptx.addSlide()
        addTemplate2Header(slide5, styles);

        slide5.addText(decodeHtmlEntities('Stakeholders'), {
            x: 0.5,
            y: 0.4,
            w: 9,
            h: 1,
            fontSize: styles.fontSize.title,
            bold: true,
            align: 'left',
            color: styles.titleColor
        });

        const stakeholdersData = project?.ai_content?.slides_content?.key_stakeholders_slide?.stakeholder_table || [];

        // Stakeholder grid - 3x2 layout matching reference with dark teal backgrounds
        const stakeholderPositions = [
            { x: 0.5, y: 1.3 }, { x: 3.6, y: 1.3 }, { x: 6.7, y: 1.3 },
            { x: 0.5, y: 3.2 }, { x: 3.6, y: 3.2 }, { x: 6.7, y: 3.2 }
        ];

        // Only show stakeholders that exist in the data (no empty placeholders)
        stakeholdersData.slice(0, 6).forEach((stakeholder: { title?: string; project_role?: string; bullet_list?: string[] }, index: number) => {
            const pos = stakeholderPositions[index];
            if (!pos || !stakeholder) return;

            // Full card background (all dark teal)
            slide5.addShape('rect', {
                x: pos.x,
                y: pos.y,
                w: 2.9,
                h: 1.7,
                fill: { color: styles.tealColor } // Dark teal for all cards
            });

            // Header with white text
            const stakeholderTitle = decodeHtmlEntities(stakeholder.title || `Stakeholder Group ${index + 1}`);
            slide5.addText(stakeholderTitle, {
                x: pos.x + 0.1,
                y: pos.y + 0.1,
                w: 2.7,
                h: 0.4,
                fontSize: 12,
                bold: true,
                color: 'FFFFFF',
                align: 'center',
                valign: 'middle'
            });

            // Content with bullet points (white text on dark teal)
            if (stakeholder.bullet_list && stakeholder.bullet_list.length > 0) {
                const bulletText = stakeholder.bullet_list.slice(0, 2).map((item: string) => `• ${decodeHtmlEntities(item)}`).join('\n');
                slide5.addText(bulletText, {
                    x: pos.x + 0.2,
                    y: pos.y + 0.6,
                    w: 2.5,
                    h: 1.0,
                    fontSize: 10,
                    color: 'FFFFFF',
                    align: 'left',
                    valign: 'top'
                });
            }
        });

        // Add copyright footer
        addCopyrightFooter(slide5);

        // Slide 6: Change Management Strategy - Template 2 Design
        const slide6 = pptx.addSlide()
        addTemplate2Header(slide6, styles);

        slide6.addText('Change Management Strategy', {
            x: 0.5,
            y: 0.4,
            w: 9,
            h: 1,
            fontSize: styles.fontSize.heading,
            bold: true,
            align: 'left',
            color: styles.titleColor
        });

        const strategyData = project?.ai_content?.slides_content?.change_management_strategy_slide;
        const numbersList = strategyData?.numbers_list || [
            'Create the Case for Change & Define The Why',
            'Identify Impacted Teams',
            'Establish Communications',
            'Complete Impact Analyses',
            'Define Success Criteria'
        ];

        // Left column - Dark teal background
        slide6.addShape('rect', {
            x: 0.5,
            y: 1.3,
            w: 4.5,
            h: 4.0,
            fill: { color: '08475E' } // Teal
        });

        // Right column - Light blue background
        slide6.addShape('rect', {
            x: 5.0,
            y: 1.3,
            w: 4.5,
            h: 4.0,
            fill: { color: 'BFDBFE' } // Light blue
        });

        // Title on left column
        slide6.addText('Change Management Strategy', {
            x: 0.7,
            y: 1.5,
            w: 4.1,
            h: 0.6,
            fontSize: 18,
            bold: true,
            color: 'FFFFFF',
            align: 'left'
        });

        // Numbered list on left column
        numbersList.slice(0, 5).forEach((item: string, index: number) => {
            const yPos = 2.3 + (index * 0.6);


            slide6.addText((index + 1).toString(), {
                x: 0.8,
                y: yPos,
                w: 0.4,
                h: 0.4,
                fontSize: 14,
                bold: true,
                color: 'FFFFFF',
                align: 'center',
                valign: 'middle'
            });

            // Text
            slide6.addText(decodeHtmlEntities(item), {
                x: 1.4,
                y: yPos,
                w: 3.3,
                h: 0.5,
                fontSize: 12,
                color: 'FFFFFF',
                align: 'left',
                valign: 'middle'
            });
        });

        // Add copyright footer
        addCopyrightFooter(slide6);

        // Generate the PowerPoint
        const pptxData = await pptx.write({ outputType: 'arraybuffer' }) as ArrayBuffer;

        // Create filename
        const templateName = 'Template_2';
        const baseName = project?.name
            ? `${project.name.replace(/[^a-zA-Z0-9]/g, '_')}_Change_Management_Strategy_${templateName}.pptx`
            : `Change_Management_Strategy_${templateName}.pptx`;

        // Return the PPTX file as a response
        return new NextResponse(new Uint8Array(pptxData), {
            status: 200,
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                'Content-Disposition': `attachment; filename="${baseName}"`,
                'Content-Length': pptxData.byteLength.toString(),
            },
        });
    } catch (error) {
        console.error('Error generating PowerPoint for Template 2:', error);
        return NextResponse.json(
            { error: 'Failed to generate PowerPoint presentation for Template 2' },
            { status: 500 }
        );
    }
}