import { NextRequest, NextResponse } from 'next/server';
import PptxGenJS from 'pptxgenjs';

// Template 1: Professional Blue Theme (Clean, Corporate)
const getTemplate1Styles = () => ({
  titleColor: '1F2937',
  subtitleColor: '6B7280',
  textColor: '374151',
  accentColor: '3B82F6',
  backgroundColor: 'FFFFFF',
  secondaryAccent: 'E5E7EB',
  fontSize: {
    title: 48,
    subtitle: 20,
    heading: 42,
    body: 16,
    bullet: 16
  }
});

// Template 2: Modern Red Theme (Bold, Dynamic)
const getTemplate2Styles = () => ({
  titleColor: '1F2937',
  subtitleColor: '374151',
  textColor: '1F2937',
  accentColor: 'DC2626',
  backgroundColor: 'FFFFFF',
  secondaryAccent: 'F3F4F6',
  fontSize: {
    title: 44,
    subtitle: 18,
    heading: 38,
    body: 15,
    bullet: 15
  }
});

// Template 3: Corporate Purple Theme (Executive, Premium)
const getTemplate3Styles = () => ({
  titleColor: '581C87',
  subtitleColor: '7C3AED',
  textColor: '6B46C1',
  accentColor: '8B5CF6',
  backgroundColor: 'FAF5FF',
  secondaryAccent: 'C4B5FD',
  fontSize: {
    title: 46,
    subtitle: 19,
    heading: 40,
    body: 16,
    bullet: 16
  }
});

const getTemplateStyles = (template: number) => {
  switch (template) {
    case 2:
      return getTemplate2Styles();
    case 3:
      return getTemplate3Styles();
    default:
      return getTemplate1Styles();
  }
};

export async function POST(request: NextRequest) {
  try {
    const { project, template = 1 } = await request.json();

    // Get template styles
    const styles = getTemplateStyles(template);

    // Create a new presentation
    const pptx = new PptxGenJS()

    // Set background color for all slides based on template
    if (template === 2 || template === 3) {
      pptx.layout = 'LAYOUT_16x9';
      pptx.defineLayout({ name: 'CUSTOM', width: 10, height: 5.625 });
    }

    // Slide 1: Change Management Strategy (Title slide)
    const slide1 = pptx.addSlide()

    // Add background color for templates 2 and 3
    if (template === 2 || template === 3) {
      slide1.background = { color: styles.backgroundColor };
    }

    // Create two-column layout: white left side, dark right side
    // Dark background section (right side)
    slide1.addShape('rect', {
      x: 4.8,
      y: 0,
      w: 5.2,
      h: 5.625,
      fill: { color: '2D3748' }
    });

    // Main title on white background (left side)
    slide1.addText('Change\nManagement\nStrategy', {
      x: 0.5,
      y: 1.5,
      w: 4,
      h: 3,
      fontSize: 48,
      bold: true,
      align: 'left',
      color: '2D3748',
      lineSpacing: 52
    });


    // Slide 2: Agenda
    const slide2 = pptx.addSlide()

    if (template === 2 || template === 3) {
      slide2.background = { color: styles.backgroundColor };
    }

    slide2.addText('Agenda', {
      x: 0.5,
      y: 0.17,
      w: 9,
      h: 1,
      fontSize: styles.fontSize.title,
      bold: true,
      align: 'left',
      color: styles.titleColor
    });

    const agendaItems = [
      { number: '01', text: 'Executive Summary', color: '000000' },
      { number: '02', text: 'Benefits', color: '000000' },
      { number: '03', text: 'Key Stakeholders', color: '000000' },
      { number: '04', text: 'High Level Change Management Strategy', color: '000000' }
    ];

    agendaItems.forEach((item, index) => {
      const yPos = 1.07 + (index * 0.7);

      // Red number
      slide2.addText(item.number, {
        x: 0.5,
        y: yPos,
        w: 1,
        h: 0.6,
        fontSize: 24,
        bold: true,
        align: 'left',
        color: item.color
      });

      // Agenda item text
      slide2.addText(item.text, {
        x: 1.8,
        y: yPos,
        w: 7.7,
        h: 0.6,
        fontSize: 18,
        align: 'left',
        color: styles.textColor
      });
    });

    // Slide 3: Executive Summary
    const slide3 = pptx.addSlide()

    if (template === 2 || template === 3) {
      slide3.background = { color: styles.backgroundColor };
    }

    slide3.addText('Executive Summary', {
      x: 0.5,
      y: 0.17,
      w: 9,
      h: 1,
      fontSize: styles.fontSize.title,
      bold: true,
      align: 'left',
      color: styles.titleColor
    });

    const execSummaryData = project?.ai_content?.slides_content?.executive_summary_slide;

    // Create table structure for Executive Summary
    const tableRows = [
      {
        label: 'Project Overview',
        content: execSummaryData?.project_overview || 'This project represents a strategic initiative to transform our organization through effective change management practices.'
      },
      {
        label: 'Purpose of the OCM Plan',
        content: execSummaryData?.purpose_of_ocm_plan || 'This Organizational Change Management (OCM) Plan outlines a comprehensive, inclusive, and mission-aligned approach to support the successful adoption of the Project Name.'
      },
      {
        label: 'Aligned with Client\'s Org Mission and Vision',
        content: Array.isArray(execSummaryData?.aligned_with_org_mission_and_vision)
          ? execSummaryData.aligned_with_org_mission_and_vision.map((item: string) => `• ${item}`).join('\n')
          : '• Bulleted list'
      },
      {
        label: 'Benefits',
        content: Array.isArray(execSummaryData?.benefits)
          ? execSummaryData.benefits.map((item: string) => `• ${item}`).join('\n')
          : '• Bulleted list'
      },
      {
        label: 'Strategic Objectives of the OCM Plan',
        content: Array.isArray(execSummaryData?.strategic_objectives_of_ocm_plan)
          ? execSummaryData.strategic_objectives_of_ocm_plan.map((item: string) => `• ${item}`).join('\n')
          : execSummaryData?.strategic_objectives_of_ocm_plan || 'Strategic objectives content'
      }
    ];

    let currentY = 1.07;
    const rowHeight = 0.8;

    tableRows.forEach((row) => {
      // Left column - Label
      slide3.addShape('rect', {
        x: 0.5,
        y: currentY,
        w: 2.2,
        h: rowHeight,
        fill: { color: '4A5568' },
        line: { color: '2D3748', width: 1 }
      });

      slide3.addText(row.label, {
        x: 0.6,
        y: currentY + 0.1,
        w: 2.0,
        h: rowHeight - 0.2,
        fontSize: 11,
        bold: true,
        color: 'FFFFFF',
        align: 'left',
        wrap: true,
        valign: 'top'
      });

      // Right column - Content
      slide3.addShape('rect', {
        x: 2.7,
        y: currentY,
        w: 6.8,
        h: rowHeight,
        fill: { color: 'F7FAFC' },
        line: { color: '2D3748', width: 1 }
      });

      slide3.addText(row.content, {
        x: 2.8,
        y: currentY + 0.1,
        w: 6.6,
        h: rowHeight - 0.2,
        fontSize: 10,
        color: '2D3748',
        align: 'left',
        wrap: true,
        valign: 'top',
        lineSpacing: 14
      });

      currentY += rowHeight;
    });

    // Slide 4: Benefits
    const slide4 = pptx.addSlide()

    if (template === 2 || template === 3) {
      slide4.background = { color: styles.backgroundColor };
    }

    slide4.addText('Benefits', {
      x: 0.5,
      y: 0.17,
      w: 9,
      h: 1,
      fontSize: styles.fontSize.title,
      bold: true,
      align: 'left',
      color: styles.titleColor
    });

    const benefitCards = project?.ai_content?.slides_content?.benefits_slide?.benefit_cards || [
      { title: 'Improved operational efficiency', bullet_list: ['Streamlined processes', 'Faster response times'] },
      { title: 'Enhanced employee engagement', bullet_list: ['Better communication', 'Increased satisfaction'] }
    ];

    // Create benefit cards in a 3x2 grid
    const positions = [
      { x: 0.5, y: 1.07 }, { x: 3.7, y: 1.07 }, { x: 6.9, y: 1.07 },
      { x: 0.5, y: 2.77 }, { x: 3.7, y: 2.77 }, { x: 6.9, y: 2.77 }
    ];

    benefitCards.slice(0, 6).forEach((benefit: { title?: string; bullet_list?: string[] }, benefitIndex: number) => {
      const pos = positions[benefitIndex];

      // Benefit card background with border
      slide4.addShape('rect', {
        x: pos.x,
        y: pos.y,
        w: 2.8,
        h: 1.5,
        fill: { color: 'FFFFFF' },
        line: { color: 'C5D9F1', width: 2 }
      });

      // Blue header for benefit card
      slide4.addShape('rect', {
        x: pos.x,
        y: pos.y,
        w: 2.8,
        h: 0.4,
        fill: { color: '1B5F8C' }
      });

      // Benefit title
      slide4.addText(benefit.title || `Benefit ${benefitIndex + 1}`, {
        x: pos.x + 0.1,
        y: pos.y + 0.05,
        w: 2.6,
        h: 0.3,
        fontSize: 12,
        bold: true,
        color: 'FFFFFF',
        align: 'center'
      });

      // Bullet points (if available)
      if (benefit.bullet_list && benefit.bullet_list.length > 0) {
        benefit.bullet_list.slice(0, 2).forEach((bullet: string, bulletIndex: number) => {
          slide4.addText(`• ${bullet}`, {
            x: pos.x + 0.1,
            y: pos.y + 0.6 + (bulletIndex * 0.3),
            w: 2.6,
            h: 0.25,
            fontSize: 10,
            color: '374151',
            align: 'left'
          });
        });
      }
    });

    // Slide 5: Key Stakeholders
    const slide5 = pptx.addSlide()

    if (template === 2 || template === 3) {
      slide5.background = { color: styles.backgroundColor };
    }

    slide5.addText('Stakeholders', {
      x: 0.5,
      y: 0.17,
      w: 9,
      h: 1,
      fontSize: styles.fontSize.title,
      bold: true,
      align: 'left',
      color: styles.titleColor
    });

    // Table header
    slide5.addShape('rect', {
      x: 0.5,
      y: 1.07,
      w: 9,
      h: 0.5,
      fill: { color: '4A90E2' }
    });

    // Table headers
    slide5.addText('Title', {
      x: 0.7,
      y: 1.17,
      w: 2.8,
      h: 0.3,
      fontSize: 14,
      bold: true,
      color: 'FFFFFF',
      align: 'left'
    });

    slide5.addText('Project Role', {
      x: 6.7,
      y: 1.17,
      w: 2.6,
      h: 0.3,
      fontSize: 14,
      bold: true,
      color: 'FFFFFF',
      align: 'left'
    });

    // Table rows
    const stakeholdersData = project?.ai_content?.slides_content?.key_stakeholders_slide?.stakeholder_table || [
      { title: 'Project Manager', project_role: 'Lead project execution' }
    ];

    let currentRowY = 1.57;

    stakeholdersData.slice(0, 4).forEach((stakeholder: { title?: string; project_role?: string }, stakeholderIndex: number) => {
      // Calculate dynamic row height based on content length
      const projectRole = stakeholder.project_role || 'Project participant';
      const estimatedLines = Math.ceil(projectRole.length / 35); // Roughly 35 chars per line
      const minRowHeight = 0.5;
      const dynamicRowHeight = Math.max(minRowHeight, estimatedLines * 0.25 + 0.3);

      // Alternating row colors
      const bgColor = stakeholderIndex % 2 === 0 ? 'E6F3FF' : 'FFFFFF';

      slide5.addShape('rect', {
        x: 0.5,
        y: currentRowY,
        w: 9,
        h: dynamicRowHeight,
        fill: { color: bgColor }
      });

      // Extract name from title (assuming format like "Name (Title)")
      const titleParts = stakeholder.title?.match(/^(.+?)\s*\((.+?)\)$/) || [null, stakeholder.title || '', ''];
      const stakeholderTitle = titleParts[1] || stakeholder.title || `Stakeholder ${stakeholderIndex + 1}`;
      // Calculate vertical center alignment for text
      const textVerticalPadding = (dynamicRowHeight - 0.25) / 2;

      slide5.addText(stakeholderTitle, {
        x: 0.7,
        y: currentRowY + textVerticalPadding,
        w: 2.8,
        h: 0.25,
        fontSize: 12,
        color: '374151',
        align: 'left',
        valign: 'middle'
      });

      slide5.addText(projectRole, {
        x: 6.7,
        y: currentRowY + 0.1,
        w: 2.6,
        h: dynamicRowHeight - 0.2,
        fontSize: 11,
        color: '374151',
        align: 'left',
        wrap: true,
        valign: 'top',
        lineSpacing: 16
      });

      // Update Y position for next row
      currentRowY += dynamicRowHeight;
    });

    // Slide 6: High-Level Change Management Strategy
    const slide6 = pptx.addSlide()

    if (template === 2 || template === 3) {
      slide6.background = { color: styles.backgroundColor };
    }

    slide6.addText('High-Level Change Management Strategy', {
      x: 0.5,
      y: 0.17,
      w: 9,
      h: 1,
      fontSize: styles.fontSize.heading,
      bold: true,
      align: 'left',
      color: styles.titleColor
    });

    // Create 4-column layout for strategy components
    const strategyData = project?.ai_content?.slides_content?.high_level_change_management_strategy_slide;

    const columns = [
      {
        title: 'Stakeholder Alignment & Engagement',
        content: strategyData?.stakeholder_alignment_and_engagement || { title: 'Aligning Stakeholders', actions: ['Identify key stakeholders', 'Develop engagement strategies'] },
        color: '1B5F8C',
        x: 0.5
      },
      {
        title: 'Define the Why & WIIFM',
        content: strategyData?.define_the_why_and_wiifm || { title: 'Communicate Benefits', actions: ['Define clear purpose', 'Highlight benefits'] },
        color: '4A90E2',
        x: 2.8
      },
      {
        title: 'Change Management Plan',
        content: strategyData?.change_management_plan || { title: 'Execution Plan', actions: ['Define milestones', 'Allocate resources'] },
        color: '1B5F8C',
        x: 5.1
      },
      {
        title: '"People" Measurement',
        content: strategyData?.people_measurement || { title: 'Evaluate Impact', actions: ['Set up KPIs', 'Regular check-ins'] },
        color: '89CDF1',
        x: 7.4
      }
    ];

    columns.forEach((column) => {
      // Column header
      slide6.addShape('rect', {
        x: column.x,
        y: 1.07,
        w: 2.1,
        h: 0.5,
        fill: { color: column.color }
      });

      slide6.addText(column.title, {
        x: column.x + 0.1,
        y: 1.17,
        w: 1.9,
        h: 0.3,
        fontSize: 11,
        bold: true,
        color: 'FFFFFF',
        align: 'center',
        wrap: true
      });

      // Column content area
      slide6.addShape('rect', {
        x: column.x,
        y: 1.57,
        w: 2.1,
        h: 3.43,
        fill: { color: column.color, transparency: 80 }
      });

      // Content text
      const actions = column.content.actions || [];
      const contentText = actions.slice(0, 4).map((action: string) => `• ${action}`).join('\n');

      slide6.addText(contentText, {
        x: column.x + 0.1,
        y: 1.77,
        w: 1.9,
        h: 3.03,
        fontSize: 9,
        color: '1F2937',
        align: 'left',
        wrap: true,
        lineSpacing: 14
      });
    });

    // Generate the PPTX data as a buffer
    const pptxData = await pptx.write({ outputType: 'nodebuffer' }) as ArrayBuffer;

    // Create filename with template name
    const templateName = `Template_${template}`;
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
    console.error('Error generating PowerPoint:', error);
    return NextResponse.json(
      { error: 'Failed to generate PowerPoint presentation' },
      { status: 500 }
    );
  }
}
