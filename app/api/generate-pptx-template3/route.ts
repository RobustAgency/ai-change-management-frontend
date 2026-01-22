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

// Template 3: Clean Design (matching reference images - same as Template 1 style)
const getTemplate2Styles = () => ({
    titleColor: '1F2937',
    subtitleColor: '374151',
    textColor: '1F2937',
    accentColor: '3B82F6', // Blue for Template 3
    backgroundColor: 'FFFFFF',
    secondaryAccent: 'DBEAFE', // Light blue
    tealColor: '475569', // Dark gray/slate for Template 3
    fontSize: {
        title: 44,
        subtitle: 18,
        heading: 38,
        body: 15,
        bullet: 15
    }
});

// Type for PptxGenJS slide object - infer from instance
const _tempPptx = new PptxGenJS();
type Slide = ReturnType<typeof _tempPptx.addSlide>;

// Type for template styles
interface TemplateStyles {
  titleColor: string;
  subtitleColor: string;
  textColor: string;
  accentColor: string;
  backgroundColor: string;
  secondaryAccent: string;
  tealColor: string;
  fontSize: {
    title: number;
    subtitle: number;
    heading: number;
    body: number;
    bullet: number;
  };
}

// Function to add template-specific header styling for Template 3
const addTemplate2Header = (slide: Slide, styles: TemplateStyles) => {
    // Template 3 doesn't use header bars - keep slides clean
};

// Helper function to add copyright footer to a slide
const addCopyrightFooter = (slide: Slide) => {
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

// This API route handles Template 3 PowerPoint generation
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
            { number: '•', text: 'Executive Summary' },
            { number: '•', text: 'Benefits' },
            { number: '•', text: 'Key Stakeholders' },
            { number: '•', text: 'High Level Change Management Strategy' }
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
                color: '000000', // Red color
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
            fill: { color: 'FFFFFF' } // Light blue
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

        // Default benefits if none provided
        const defaultBenefits = [
            { title: 'Benefit' },
            { title: 'Benefit' },
            { title: 'Benefit' },
            { title: 'Benefit' },
            { title: 'Benefit' },
            { title: 'Benefit' },
            { title: 'Benefit' },
            { title: 'Benefit' }
        ];

        const benefits = benefitCards.length > 0 ? benefitCards : defaultBenefits;

        // Benefits grid - 2 columns, 4 rows (8 total)
        const benefitPositions = [
            { x: 0.5, y: 1.5 }, { x: 5.25, y: 1.5 },
            { x: 0.5, y: 2.4 }, { x: 5.25, y: 2.4 },
            { x: 0.5, y: 3.3 }, { x: 5.25, y: 3.3 },
            { x: 0.5, y: 4.2 }, { x: 5.25, y: 4.2 }
        ];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        benefits.slice(0, 8).forEach((benefit: any, index: number) => {
            const pos = benefitPositions[index];
            if (!pos) return;

            // Dark gray circle with number
            slide4.addShape('ellipse', {
                x: pos.x,
                y: pos.y,
                w: 0.5,
                h: 0.5,
                fill: { color: '374151' } // Gray-700
            });

            // Number in circle
            slide4.addText((index + 1).toString(), {
                x: pos.x,
                y: pos.y,
                w: 0.5,
                h: 0.5,
                fontSize: 16,
                bold: true,
                color: 'FFFFFF',
                align: 'center',
                valign: 'middle'
            });

            // Benefit title text
            const benefitTitle = decodeHtmlEntities(benefit.title || `Benefit ${index + 1}`);
            slide4.addText(benefitTitle, {
                x: pos.x + 0.7,
                y: pos.y + 0.05,
                w: 4.0,
                h: 0.4,
                fontSize: 14,
                bold: true,
                color: styles.textColor,
                align: 'left',
                valign: 'middle'
            });
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

        // Default stakeholders if none provided
        const defaultStakeholders = [
            { title: 'Stakeholder Group' },
            { title: 'Stakeholder Group' },
            { title: 'Stakeholder Group' },
            { title: 'Stakeholder Group' },
            { title: 'Stakeholder Group' },
            { title: 'Stakeholder Group' }
        ];

        const stakeholders = stakeholdersData.length > 0 ? stakeholdersData : defaultStakeholders;

        // Stakeholder grid - 2 columns (left: 0-2, right: 3-5)
        const stakeholderPositions = [
            // Left column
            { x: 0.5, y: 1.5 },
            { x: 0.5, y: 2.5 },
            { x: 0.5, y: 3.5 },
            // Right column
            { x: 5.25, y: 1.5 },
            { x: 5.25, y: 2.5 },
            { x: 5.25, y: 3.5 }
        ];

        // Only show stakeholders that exist in the data
        stakeholders.slice(0, 6).forEach((stakeholder: { title?: string; project_role?: string }, index: number) => {
            const pos = stakeholderPositions[index];
            if (!pos || !stakeholder) return;

            // Determine if this is the first item in each column (index 0 or 3)
            const isFirstInColumn = index === 0 || index === 3;
            const bgColor = isFirstInColumn ? '8296B0' : 'D1D5DB'; // Blue-gray for first, light gray for others
            const textColor = isFirstInColumn ? 'FFFFFF' : '1F2937'; // White for first, dark gray for others

            // Arrow background shape
            slide5.addShape('rect', {
                x: pos.x,
                y: pos.y,
                w: 4.2,
                h: 0.75,
                fill: { color: bgColor }
            });

            // Black circle with number
            slide5.addShape('ellipse', {
                x: pos.x + 0.15,
                y: pos.y + 0.125,
                w: 0.5,
                h: 0.5,
                fill: { color: '000000' }
            });

            // Number in circle
            const displayNumber = index < 3 ? (index + 1) : (index - 3 + 4); // Left column: 1-3, Right column: 4-6
            slide5.addText(displayNumber.toString(), {
                x: pos.x + 0.15,
                y: pos.y + 0.125,
                w: 0.5,
                h: 0.5,
                fontSize: 18,
                bold: true,
                color: 'FFFFFF',
                align: 'center',
                valign: 'middle'
            });

            // Stakeholder title text
            const stakeholderTitle = decodeHtmlEntities(stakeholder.title || `Stakeholder Group ${index + 1}`);
            slide5.addText(stakeholderTitle, {
                x: pos.x + 0.8,
                y: pos.y + 0.125,
                w: 3.2,
                h: 0.5,
                fontSize: 14,
                bold: true,
                color: textColor,
                align: 'left',
                valign: 'middle'
            });
        });

        // Add copyright footer
        addCopyrightFooter(slide5);

        // Slide 6: Change Management Strategy - Template 3 Design (Table layout)
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
        const heading = strategyData?.heading || 'Enable stakeholder understanding, readiness, and adoption by reinforcing the change through leadership alignment, manager engagement, and ongoing reinforcement.';

        // Heading text
        slide6.addText(heading, {
            x: 0.5,
            y: 1.3,
            w: 9,
            h: 0.6,
            fontSize: 12,
            color: styles.textColor,
            align: 'left',
            valign: 'top'
        });

        // Table title
        slide6.addText('Proposed OCM Approach', {
            x: 0.5,
            y: 2.0,
            w: 9,
            h: 0.4,
            fontSize: 20,
            bold: true,
            color: styles.titleColor,
            align: 'left'
        });

        // Default OCM data
        const defaultApproach = [
            {
                activity: 'Executive Sponsorship',
                approach: 'Active, visible support, lead the vision'
            },
            {
                activity: 'Leadership Enablement',
                approach: 'Leader toolkits'
            },
            {
                activity: 'Stakeholder Engagement',
                approach: 'Identify impacted departments\nClarify the Why? and impacts to their daily work'
            },
            {
                activity: 'Feedback Loops',
                approach: 'Create two-way channels for addressing issues, asking questions, mitigating resistance, and training resources'
            },
            {
                activity: 'Adoption Support',
                approach: 'Monitor readiness throughout via surveys, pulse checks, interviews, or formal assessments'
            }
        ];

        // Create table
        const tableData: { text: string; options: { bold?: boolean; fontSize: number; color: string; fill?: { color: string } } }[][] = [];

        // Header row
        tableData.push([
            { text: 'Activity', options: { bold: true, fontSize: 14, color: 'FFFFFF', fill: { color: '374151' } } },
            { text: 'Approach', options: { bold: true, fontSize: 14, color: 'FFFFFF', fill: { color: '374151' } } }
        ]);

        // Data rows with alternating colors
        defaultApproach.forEach((item, index) => {
            const rowColor = index % 2 === 0 ? 'DBEAFE' : 'FFFFFF'; // Light blue and white alternating
            tableData.push([
                { text: item.activity, options: { fontSize: 12, color: '1F2937', bold: true, fill: { color: rowColor } } },
                { text: item.approach, options: { fontSize: 12, color: '374151', fill: { color: rowColor } } }
            ]);
        });

        slide6.addTable(tableData, {
            x: 0.5,
            y: 2.5,
            w: 9.0,
            colW: [2.5, 6.5],
            border: { pt: 1, color: '9CA3AF' },
            align: 'left',
            valign: 'top'
        });

        // Add copyright footer
        addCopyrightFooter(slide6);

        // Generate the PowerPoint
        const pptxData = await pptx.write({ outputType: 'arraybuffer' }) as ArrayBuffer;

        // Create filename
        const templateName = 'Template_3';
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
        console.error('Error generating PowerPoint for Template 3:', error);
        return NextResponse.json(
            { error: 'Failed to generate PowerPoint presentation for Template 3' },
            { status: 500 }
        );
    }
}