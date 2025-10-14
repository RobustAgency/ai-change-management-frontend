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

// Function to add template-specific header styling
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addTemplateHeader = (slide: any, template: number, styles: any) => {
  if (template === 1) {
    // Professional Blue - Simple header line
    slide.addShape('rect', {
      x: 0,
      y: 0,
      w: 10,
      h: 0.3,
      fill: { color: styles.accentColor }
    });
  } else if (template === 2) {
    // Modern Green - Gradient-like effect
    slide.addShape('rect', {
      x: 0,
      y: 0,
      w: 10,
      h: 0.2,
      fill: { color: styles.accentColor }
    });
    slide.addShape('rect', {
      x: 0,
      y: 0.2,
      w: 10,
      h: 0.1,
      fill: { color: styles.secondaryAccent }
    });
  } else if (template === 3) {
    // Corporate Purple - Elegant corner design
    slide.addShape('rect', {
      x: 0,
      y: 0,
      w: 3,
      h: 0.3,
      fill: { color: styles.accentColor }
    });
    slide.addShape('rect', {
      x: 7,
      y: 0,
      w: 3,
      h: 0.3,
      fill: { color: styles.secondaryAccent }
    });
  }
};

// This API route will work with Cloudflare Workers + Node.js compatibility
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
    
    // Add template-specific header
    addTemplateHeader(slide1, template, styles);
    
    slide1.addText('Change Management Strategy', {
      x: 0.5,
      y: 1.5,
      w: 9,
      h: 2.5,
      fontSize: styles.fontSize.title,
      bold: true,
      align: 'left',
      color: styles.titleColor,
      lineSpacing: 32
    })

    slide1.addText(project?.name || 'S4/HANA Enterprise Resource Planning (ERP)', {
      x: 0.5,
      y: 4.5,
      w: 9,
      h: 1,
      fontSize: styles.fontSize.subtitle,
      align: 'left',
      color: styles.subtitleColor
    })

    // Add accent line for visual appeal
    slide1.addShape(pptx.ShapeType.rect, {
      x: 0.5,
      y: 4.0,
      w: 2.0,
      h: 0.1,
      fill: { color: styles.accentColor }
    });

    // Slide 2: Agenda
    const slide2 = pptx.addSlide()
    
    if (template === 2 || template === 3) {
      slide2.background = { color: styles.backgroundColor };
    }
    
    // Add template-specific header
    addTemplateHeader(slide2, template, styles);
    
    slide2.addText('Agenda', {
      x: 0.5,
      y: 0.5,
      w: 9,
      h: 1.5,
      fontSize: styles.fontSize.title,
      bold: true,
      align: 'left',
      color: styles.titleColor
    })

    // Add accent line
    slide2.addShape(pptx.ShapeType.rect, {
      x: 0.5,
      y: 1.8,
      w: 2.0,
      h: 0.1,
      fill: { color: styles.accentColor }
    });

    const agendaItems = [
      'Executive Summary',
      'Benefits',
      'Key Stakeholders',
      'High-Level Change Management Strategy'
    ]

    agendaItems.forEach((item, index) => {
      slide2.addText(`• ${item}`, {
        x: 0.5,
        y: 2.5 + (index * 0.8),
        w: 9,
        h: 0.7,
        fontSize: styles.fontSize.bullet,
        align: 'left',
        color: styles.textColor
      })
    })

    // Slide 3: Executive Summary
    const slide3 = pptx.addSlide()
    
    if (template === 2 || template === 3) {
      slide3.background = { color: styles.backgroundColor };
    }
    
    // Add template-specific header
    addTemplateHeader(slide3, template, styles);
    
    slide3.addText('Executive Summary', {
      x: 0.5,
      y: 0.5,
      w: 9,
      h: 1.5,
      fontSize: styles.fontSize.title,
      bold: true,
      align: 'left',
      color: styles.titleColor
    })

    // Add accent line
    slide3.addShape(pptx.ShapeType.rect, {
      x: 0.5,
      y: 1.8,
      w: 2.0,
      h: 0.1,
      fill: { color: styles.accentColor }
    });

    const executiveSummary = project?.ai_content?.slides_content?.executive_summary ||
      'This project represents a strategic initiative to transform our organization through effective change management practices.'

    slide3.addText(executiveSummary, {
      x: 0.5,
      y: 2.5,
      w: 9,
      h: 4.5,
      fontSize: styles.fontSize.body,
      align: 'left',
      color: styles.textColor,
      wrap: true,
      lineSpacing: 20
    })

    // Slide 4: Benefits
    const slide4 = pptx.addSlide()
    
    if (template === 2 || template === 3) {
      slide4.background = { color: styles.backgroundColor };
    }
    
    // Add template-specific header
    addTemplateHeader(slide4, template, styles);
    
    slide4.addText('Benefits', {
      x: 0.5,
      y: 0.5,
      w: 9,
      h: 1.5,
      fontSize: styles.fontSize.title,
      bold: true,
      align: 'left',
      color: styles.titleColor
    })

    // Add accent line
    slide4.addShape(pptx.ShapeType.rect, {
      x: 0.5,
      y: 1.8,
      w: 2.0,
      h: 0.1,
      fill: { color: styles.accentColor }
    });

    const benefits = project?.ai_content?.slides_content?.benefits || [
      'Improved operational efficiency',
      'Enhanced employee engagement',
      'Reduced resistance to change',
      'Better stakeholder alignment'
    ]

    benefits.forEach((benefit: string, index: number) => {
      slide4.addText(`• ${benefit}`, {
        x: 0.5,
        y: 2.5 + (index * 0.8),
        w: 9,
        h: 0.7,
        fontSize: styles.fontSize.bullet,
        align: 'left',
        color: styles.textColor,
        wrap: true
      })
    })

    // Slide 5: Key Stakeholders
    const slide5 = pptx.addSlide()
    
    if (template === 2 || template === 3) {
      slide5.background = { color: styles.backgroundColor };
    }
    
    // Add template-specific header
    addTemplateHeader(slide5, template, styles);
    
    slide5.addText('Key Stakeholders', {
      x: 0.5,
      y: 0.5,
      w: 9,
      h: 1.5,
      fontSize: styles.fontSize.title,
      bold: true,
      align: 'left',
      color: styles.titleColor
    })

    // Add accent line
    slide5.addShape(pptx.ShapeType.rect, {
      x: 0.5,
      y: 1.8,
      w: 2.0,
      h: 0.1,
      fill: { color: styles.accentColor }
    });

    const stakeholders = project?.ai_content?.slides_content?.key_stakeholders || [
      'Executive Leadership',
      'Project Team',
      'End Users',
      'IT Department',
      'Human Resources'
    ]

    stakeholders.forEach((stakeholder: string, index: number) => {
      slide5.addText(`• ${stakeholder}`, {
        x: 0.5,
        y: 2.5 + (index * 0.8),
        w: 9,
        h: 0.7,
        fontSize: styles.fontSize.bullet,
        align: 'left',
        color: styles.textColor,
        wrap: true
      })
    })

    // Slide 6: High-Level Change Management Strategy
    const slide6 = pptx.addSlide()
    
    if (template === 2 || template === 3) {
      slide6.background = { color: styles.backgroundColor };
    }
    
    // Add template-specific header
    addTemplateHeader(slide6, template, styles);
    
    slide6.addText('High-Level Change Management Strategy', {
      x: 0.5,
      y: 0.5,
      w: 9,
      h: 1.5,
      fontSize: styles.fontSize.heading,
      bold: true,
      align: 'left',
      color: styles.titleColor
    })

    // Add accent line
    slide6.addShape(pptx.ShapeType.rect, {
      x: 0.5,
      y: 1.8,
      w: 2.0,
      h: 0.1,
      fill: { color: styles.accentColor }
    });

    const strategy = project?.ai_content?.slides_content?.change_management_strategy ||
      'Our comprehensive change management strategy focuses on stakeholder engagement, communication, training, and continuous support to ensure successful transformation.'

    slide6.addText(strategy, {
      x: 0.5,
      y: 2.5,
      w: 9,
      h: 4.5,
      fontSize: styles.fontSize.body,
      align: 'left',
      color: styles.textColor,
      wrap: true,
      lineSpacing: 20
    })

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
