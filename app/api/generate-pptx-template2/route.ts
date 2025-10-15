import { NextRequest, NextResponse } from 'next/server';
import PptxGenJS from 'pptxgenjs';

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

// Function to add template-specific header styling for Template 2
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addTemplate2Header = (slide: any, styles: any) => {
  // Modern Red - Bold accent line at the top
  slide.addShape('rect', {
    x: 0,
    y: 0,
    w: 10,
    h: 0.2,
    fill: { color: styles.accentColor }
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

    // Red accent header bar
    slide1.addShape('rect', {
      x: 0,
      y: 0,
      w: 10,
      h: 0.1,
      fill: { color: styles.accentColor }
    });

    // Right side - red accent area (geometric modern design)
    slide1.addShape('rect', {
      x: 6,
      y: 0.1,
      w: 4,
      h: 5.525,
      fill: { color: styles.accentColor }
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
      slide1.addText(project.name, {
        x: 0.75,
        y: 4.2,
        w: 5,
        h: 0.5,
        fontSize: 18,
        align: 'left',
        color: '6B7280'
      });
    }

    // Geometric shapes on red background
    slide1.addShape('ellipse', {
      x: 7.5,
      y: 1.2,
      w: 1,
      h: 1,
      fill: { color: 'EF4444' }
    });

    slide1.addShape('rect', {
      x: 6.8,
      y: 3.5,
      w: 0.8,
      h: 0.8,
      fill: { color: 'B91C1C' },
      rotate: 45
    });

    slide1.addShape('ellipse', {
      x: 8.2,
      y: 2.8,
      w: 1.5,
      h: 1.5,
      line: { color: 'FFFFFF', width: 4 },
      fill: { color: 'transparent' }
    });

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
      { number: '01', text: 'Executive Summary', icon: '📊' },
      { number: '02', text: 'Benefits', icon: '💡' },
      { number: '03', text: 'Key Stakeholders', icon: '👥' },
      { number: '04', text: 'Change Management Strategy', icon: '🎯' }
    ];

    agendaItems.forEach((item, index) => {
      const yPos = 1.3 + (index * 0.8);
      
      // Card background with red left border
      slide2.addShape('rect', {
        x: 0.5,
        y: yPos,
        w: 9,
        h: 0.7,
        fill: { color: 'FFFFFF' },
        line: { color: 'E5E7EB', width: 1 }
      });

      // Red left border
      slide2.addShape('rect', {
        x: 0.5,
        y: yPos,
        w: 0.1,
        h: 0.7,
        fill: { color: styles.accentColor }
      });

      // Number circle
      slide2.addShape('ellipse', {
        x: 0.8,
        y: yPos + 0.15,
        w: 0.4,
        h: 0.4,
        fill: { color: styles.accentColor }
      });

      slide2.addText(item.number, {
        x: 0.8,
        y: yPos + 0.15,
        w: 0.4,
        h: 0.4,
        fontSize: 14,
        bold: true,
        color: 'FFFFFF',
        align: 'center',
        valign: 'middle'
      });

      // Icon and text
      slide2.addText(`${item.icon} ${item.text}`, {
        x: 1.4,
        y: yPos + 0.15,
        w: 7.5,
        h: 0.4,
        fontSize: 16,
        color: styles.textColor,
        align: 'left',
        valign: 'middle'
      });
    });

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

    // Main content card with gradient header
    slide3.addShape('rect', {
      x: 0.5,
      y: 1.3,
      w: 9,
      h: 2.5,
      fill: { color: 'FFFFFF' },
      line: { color: 'E5E7EB', width: 1 }
    });

    // Red gradient header
    slide3.addShape('rect', {
      x: 0.5,
      y: 1.3,
      w: 9,
      h: 0.6,
      fill: { color: styles.accentColor }
    });

    slide3.addText('Project Overview', {
      x: 0.7,
      y: 1.4,
      w: 8.6,
      h: 0.4,
      fontSize: 18,
      bold: true,
      color: 'FFFFFF',
      align: 'left',
      valign: 'middle'
    });

    // Content
    slide3.addText(execSummaryData?.project_overview || 'This project represents a strategic initiative to transform our organization through effective change management practices.', {
      x: 0.7,
      y: 2.0,
      w: 8.6,
      h: 1.6,
      fontSize: 14,
      color: styles.textColor,
      align: 'left',
      valign: 'top'
    });

    // Key highlights - two columns
    const highlights = [
      { title: 'Key Benefits', items: ['Enhanced operational efficiency', 'Improved decision-making capabilities', 'Increased stakeholder engagement'] },
      { title: 'Success Metrics', items: ['50% reduction in reporting time', '95% user adoption rate', 'Improved data accessibility'] }
    ];

    highlights.forEach((highlight, index) => {
      const xPos = 0.5 + (index * 4.7);
      
      // Card
      slide3.addShape('rect', {
        x: xPos,
        y: 4.0,
        w: 4.4,
        h: 1.4,
        fill: { color: 'FFFFFF' },
        line: { color: 'E5E7EB', width: 1 }
      });

      // Red left border
      slide3.addShape('rect', {
        x: xPos,
        y: 4.0,
        w: 0.1,
        h: 1.4,
        fill: { color: styles.accentColor }
      });

      // Title
      slide3.addText(highlight.title, {
        x: xPos + 0.2,
        y: 4.1,
        w: 4.0,
        h: 0.3,
        fontSize: 14,
        bold: true,
        color: styles.accentColor,
        align: 'left'
      });

      // Bullet points
      const bulletText = highlight.items.map(item => `• ${item}`).join('\n');
      slide3.addText(bulletText, {
        x: xPos + 0.2,
        y: 4.5,
        w: 4.0,
        h: 0.8,
        fontSize: 11,
        color: styles.textColor,
        align: 'left'
      });
    });

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

    const benefitCards = project?.ai_content?.slides_content?.benefits_slide?.benefit_cards || [
      { title: 'Enhanced Decision Making', bullet_list: ['Real-time analytics', 'Data-driven insights', 'Strategic planning'] },
      { title: 'Cost Efficiency', bullet_list: ['Reduced operational costs', 'Streamlined processes', 'Resource optimization'] }
    ];

    // Benefits grid - 2x2 layout for Template 2
    const benefitPositions = [
      { x: 0.5, y: 1.3 }, { x: 5.2, y: 1.3 },
      { x: 0.5, y: 3.4 }, { x: 5.2, y: 3.4 }
    ];

    const icons = ['🎯', '💰', '⚡', '📈'];

    benefitCards.slice(0, 4).forEach((benefit: any, index: number) => {
      const pos = benefitPositions[index];
      if (!pos) return;

      // Card background
      slide4.addShape('rect', {
        x: pos.x,
        y: pos.y,
        w: 4.5,
        h: 2.0,
        fill: { color: 'FFFFFF' },
        line: { color: 'E5E7EB', width: 1 }
      });

      // Red gradient header
      slide4.addShape('rect', {
        x: pos.x,
        y: pos.y,
        w: 4.5,
        h: 0.6,
        fill: { color: styles.accentColor }
      });

      // Icon circle
      slide4.addShape('ellipse', {
        x: pos.x + 0.2,
        y: pos.y + 0.1,
        w: 0.4,
        h: 0.4,
        fill: { color: 'FFFFFF', transparency: 20 }
      });

      slide4.addText(icons[index], {
        x: pos.x + 0.2,
        y: pos.y + 0.1,
        w: 0.4,
        h: 0.4,
        fontSize: 16,
        align: 'center',
        valign: 'middle'
      });

      // Title
      slide4.addText(benefit.title || `Benefit ${index + 1}`, {
        x: pos.x + 0.7,
        y: pos.y + 0.15,
        w: 3.6,
        h: 0.3,
        fontSize: 16,
        bold: true,
        color: 'FFFFFF',
        align: 'left',
        valign: 'middle'
      });

      // Bullet points
      if (benefit.bullet_list && benefit.bullet_list.length > 0) {
        const bulletText = benefit.bullet_list.slice(0, 3).map((bullet: string) => `• ${bullet}`).join('\n');
        slide4.addText(bulletText, {
          x: pos.x + 0.2,
          y: pos.y + 0.8,
          w: 4.1,
          h: 1.0,
          fontSize: 11,
          color: styles.textColor,
          align: 'left'
        });
      }
    });

    // Slide 5: Stakeholders - Template 2 Design
    const slide5 = pptx.addSlide()
    addTemplate2Header(slide5, styles);

    slide5.addText('Stakeholders', {
      x: 0.5,
      y: 0.4,
      w: 9,
      h: 1,
      fontSize: styles.fontSize.title,
      bold: true,
      align: 'left',
      color: styles.titleColor
    });

    const stakeholdersData = project?.ai_content?.slides_content?.key_stakeholders_slide?.stakeholder_table || [
      { title: 'Data & Analytics', bullet_list: ['Lead technical implementation', 'Ensure system architecture', 'Develop data quality standards'] },
      { title: 'Finance', bullet_list: ['Provide financial reporting needs', 'Test financial outputs', 'Define cost-benefit metrics'] },
      { title: 'IT', bullet_list: ['Manage cloud infrastructure', 'Support system interoperability', 'Provide technical support'] }
    ];

    // Stakeholder cards - vertical layout
    stakeholdersData.slice(0, 3).forEach((stakeholder: any, index: number) => {
      const yPos = 1.3 + (index * 1.3);

      // Card background
      slide5.addShape('rect', {
        x: 0.5,
        y: yPos,
        w: 9,
        h: 1.2,
        fill: { color: 'FFFFFF' },
        line: { color: 'E5E7EB', width: 1 }
      });

      // Red left border
      slide5.addShape('rect', {
        x: 0.5,
        y: yPos,
        w: 0.1,
        h: 1.2,
        fill: { color: styles.accentColor }
      });

      // Avatar circle
      slide5.addShape('ellipse', {
        x: 0.8,
        y: yPos + 0.2,
        w: 0.8,
        h: 0.8,
        fill: { color: styles.accentColor }
      });

      // Avatar initial
      slide5.addText(stakeholder.title?.charAt(0) || 'S', {
        x: 0.8,
        y: yPos + 0.2,
        w: 0.8,
        h: 0.8,
        fontSize: 20,
        bold: true,
        color: 'FFFFFF',
        align: 'center',
        valign: 'middle'
      });

      // Title
      slide5.addText(stakeholder.title || `Stakeholder ${index + 1}`, {
        x: 1.8,
        y: yPos + 0.1,
        w: 7.4,
        h: 0.4,
        fontSize: 16,
        bold: true,
        color: styles.textColor,
        align: 'left'
      });

      // Responsibilities header
      slide5.addText('KEY RESPONSIBILITIES', {
        x: 1.8,
        y: yPos + 0.45,
        w: 7.4,
        h: 0.2,
        fontSize: 10,
        bold: true,
        color: styles.accentColor,
        align: 'left'
      });

      // Bullet points
      if (stakeholder.bullet_list && stakeholder.bullet_list.length > 0) {
        const bulletText = stakeholder.bullet_list.slice(0, 3).map((bullet: string) => `• ${bullet}`).join('\n');
        slide5.addText(bulletText, {
          x: 1.8,
          y: yPos + 0.7,
          w: 7.4,
          h: 0.4,
          fontSize: 10,
          color: styles.textColor,
          align: 'left'
        });
      }
    });

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
      'Communicate clear project goals and progress to all stakeholders.',
      'Run workshops and training sessions to ensure user readiness.',
      'Implement a phased deployment to mitigate risks and gather feedback.',
      'Establish a dedicated support team to aid with the transition.',
      'Continuously monitor and optimize system performance post-deployment.'
    ];

    // Header badge
    slide6.addShape('rect', {
      x: 3.5,
      y: 1.3,
      w: 3,
      h: 0.5,
      fill: { color: styles.accentColor }
    });

    slide6.addText('5-Step Implementation Strategy', {
      x: 3.5,
      y: 1.3,
      w: 3,
      h: 0.5,
      fontSize: 14,
      bold: true,
      color: 'FFFFFF',
      align: 'center',
      valign: 'middle'
    });

    // Strategy steps
    numbersList.slice(0, 5).forEach((step: string, index: number) => {
      const yPos = 2.0 + (index * 0.7);

      // Step card
      slide6.addShape('rect', {
        x: 0.5,
        y: yPos,
        w: 9,
        h: 0.6,
        fill: { color: 'FFFFFF' },
        line: { color: 'E5E7EB', width: 1 }
      });

      // Red left border
      slide6.addShape('rect', {
        x: 0.5,
        y: yPos,
        w: 0.1,
        h: 0.6,
        fill: { color: styles.accentColor }
      });

      // Step number circle
      slide6.addShape('ellipse', {
        x: 0.8,
        y: yPos + 0.1,
        w: 0.4,
        h: 0.4,
        fill: { color: styles.accentColor }
      });

      slide6.addText((index + 1).toString(), {
        x: 0.8,
        y: yPos + 0.1,
        w: 0.4,
        h: 0.4,
        fontSize: 14,
        bold: true,
        color: 'FFFFFF',
        align: 'center',
        valign: 'middle'
      });

      // Step text
      slide6.addText(step, {
        x: 1.4,
        y: yPos + 0.1,
        w: 7.8,
        h: 0.4,
        fontSize: 12,
        color: styles.textColor,
        align: 'left',
        valign: 'middle'
      });
    });

    // Bottom accent line
    slide6.addShape('rect', {
      x: 4.4,
      y: 5.4,
      w: 1.2,
      h: 0.1,
      fill: { color: styles.accentColor }
    });

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