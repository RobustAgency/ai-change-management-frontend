import { NextRequest, NextResponse } from 'next/server';
import JSZip from 'jszip';
import { Document, Packer, Paragraph, HeadingLevel, AlignmentType, Footer } from 'docx';
import { Project } from '@/interfaces/Project';

export const runtime = 'edge';

// Type definitions for AI content
interface EmailData {
  subject?: string;
  body?: string;
}

interface EmailsData {
  [role: string]: EmailData;
}

interface VideoScript {
  opening?: string;
  supporting_visuals?: string;
  executive_return?: string;
  supporting_visuals_two?: string;
  closing?: string;
  fade_out?: string;
}

interface FAQ {
  question?: string;
  answer?: string;
}

// Extended AI Content interface to include emails
interface ExtendedAIContent {
  emails?: EmailsData;
  video_script?: VideoScript | string;
  faqs?: FAQ[];
}

// Extended Project interface
interface ProjectWithExtendedAI extends Omit<Project, 'ai_content'> {
  ai_content?: ExtendedAIContent;
}

// Function to generate Word document for emails
const generateEmailsDocx = async (emails: EmailsData | null | undefined): Promise<ArrayBuffer> => {
  const children: Paragraph[] = [
    new Paragraph({
      text: 'CHANGE MANAGEMENT PROJECT EMAILS',
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 }
    }),
    new Paragraph({
      text: '='.repeat(50),
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 }
    }),
    new Paragraph({ text: '' })
  ];

  if (!emails || typeof emails !== 'object') {
    children.push(
      new Paragraph({
        text: 'No emails available for this project.',
        spacing: { after: 200 }
      })
    );
  } else {
    Object.entries(emails).forEach(([role, emailData]: [string, EmailData]) => {
      children.push(
        new Paragraph({
          text: `ROLE: ${role}`,
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400, after: 200 }
        }),
        new Paragraph({
          text: '-'.repeat(30),
          spacing: { after: 200 }
        }),
        new Paragraph({
          text: `SUBJECT: ${emailData.subject || 'No subject'}`,
          spacing: { after: 200 }
        }),
        new Paragraph({ text: '' }),
        new Paragraph({
          text: 'BODY:',
          spacing: { after: 200 }
        }),
        new Paragraph({
          text: emailData.body || 'No email body available',
          spacing: { after: 400 }
        }),
        new Paragraph({
          text: '='.repeat(50),
          spacing: { after: 400 }
        }),
        new Paragraph({ text: '' })
      );
    });
  }

  const doc = new Document({
    sections: [{
      children,
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              text: '©2025 Life Vision, LLC - Innovative Dialogs(R)',
              alignment: AlignmentType.CENTER,
              spacing: { before: 200 }
            })
          ]
        })
      }
    }]
  });

  const buffer = await Packer.toBuffer(doc);
  return new Uint8Array(buffer).buffer;
};

// Function to generate Word document for video script
const generateVideoScriptDocx = async (videoScript: VideoScript | string | null | undefined): Promise<ArrayBuffer> => {
  const children: Paragraph[] = [
    new Paragraph({
      text: 'CHANGE MANAGEMENT PROJECT VIDEO SCRIPT',
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 }
    }),
    new Paragraph({
      text: '='.repeat(50),
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 }
    }),
    new Paragraph({ text: '' })
  ];

  if (!videoScript) {
    children.push(
      new Paragraph({
        text: 'No video script available for this project.',
        spacing: { after: 200 }
      })
    );
  } else {
    try {
      const script = typeof videoScript === 'string' ? JSON.parse(videoScript) : videoScript;

      if (script.opening) {
        children.push(
          new Paragraph({
            text: 'OPENING:',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 }
          }),
          new Paragraph({
            text: '-'.repeat(20),
            spacing: { after: 200 }
          }),
          new Paragraph({
            text: script.opening,
            spacing: { after: 400 }
          }),
          new Paragraph({ text: '' })
        );
      }

      if (script.supporting_visuals) {
        children.push(
          new Paragraph({
            text: 'SUPPORTING VISUALS:',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 }
          }),
          new Paragraph({
            text: '-'.repeat(20),
            spacing: { after: 200 }
          }),
          new Paragraph({
            text: script.supporting_visuals,
            spacing: { after: 400 }
          }),
          new Paragraph({ text: '' })
        );
      }

      if (script.executive_return) {
        children.push(
          new Paragraph({
            text: 'EXECUTIVE RETURN:',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 }
          }),
          new Paragraph({
            text: '-'.repeat(20),
            spacing: { after: 200 }
          }),
          new Paragraph({
            text: script.executive_return,
            spacing: { after: 400 }
          }),
          new Paragraph({ text: '' })
        );
      }

      if (script.supporting_visuals_two) {
        children.push(
          new Paragraph({
            text: 'SUPPORTING VISUALS (2):',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 }
          }),
          new Paragraph({
            text: '-'.repeat(20),
            spacing: { after: 200 }
          }),
          new Paragraph({
            text: script.supporting_visuals_two,
            spacing: { after: 400 }
          }),
          new Paragraph({ text: '' })
        );
      }

      if (script.closing) {
        children.push(
          new Paragraph({
            text: 'CLOSING:',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 }
          }),
          new Paragraph({
            text: '-'.repeat(20),
            spacing: { after: 200 }
          }),
          new Paragraph({
            text: script.closing,
            spacing: { after: 400 }
          }),
          new Paragraph({ text: '' })
        );
      }

      if (script.fade_out) {
        children.push(
          new Paragraph({
            text: 'FADE OUT:',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 }
          }),
          new Paragraph({
            text: '-'.repeat(20),
            spacing: { after: 200 }
          }),
          new Paragraph({
            text: script.fade_out,
            spacing: { after: 400 }
          }),
          new Paragraph({ text: '' })
        );
      }
    } catch {
      children.push(
        new Paragraph({
          text: 'Raw video script content:',
          spacing: { after: 200 }
        }),
        new Paragraph({
          text: String(videoScript),
          spacing: { after: 200 }
        })
      );
    }
  }

  const doc = new Document({
    sections: [{
      children,
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              text: '©2025 Life Vision, LLC - Innovative Dialogs(R)',
              alignment: AlignmentType.CENTER,
              spacing: { before: 200 }
            })
          ]
        })
      }
    }]
  });

  const buffer = await Packer.toBuffer(doc);
  return new Uint8Array(buffer).buffer;
};

// Function to generate Word document for FAQs
const generateFAQsDocx = async (faqs: FAQ[] | null | undefined): Promise<ArrayBuffer> => {
  const children: Paragraph[] = [
    new Paragraph({
      text: 'CHANGE MANAGEMENT PROJECT FAQS',
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 }
    }),
    new Paragraph({
      text: '='.repeat(50),
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 }
    }),
    new Paragraph({ text: '' })
  ];

  if (!faqs || !Array.isArray(faqs) || faqs.length === 0) {
    children.push(
      new Paragraph({
        text: 'No FAQs available for this project.',
        spacing: { after: 200 }
      })
    );
  } else {
    faqs.forEach((faq, index) => {
      children.push(
        new Paragraph({
          text: `Q${index + 1}: ${faq.question || 'No question available'}`,
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400, after: 200 }
        }),
        new Paragraph({
          text: '-'.repeat(40),
          spacing: { after: 200 }
        }),
        new Paragraph({
          text: `A${index + 1}: ${faq.answer || 'No answer available'}`,
          spacing: { after: 400 }
        }),
        new Paragraph({
          text: '='.repeat(50),
          spacing: { after: 400 }
        }),
        new Paragraph({ text: '' })
      );
    });
  }

  const doc = new Document({
    sections: [{
      children,
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              text: '©2025 Life Vision, LLC - Innovative Dialogs(R)',
              alignment: AlignmentType.CENTER,
              spacing: { before: 200 }
            })
          ]
        })
      }
    }]
  });

  const buffer = await Packer.toBuffer(doc);
  return new Uint8Array(buffer).buffer;
};

// Function to generate PowerPoint using existing template routes
const generatePowerPoint = async (project: ProjectWithExtendedAI, template: number = 1): Promise<ArrayBuffer> => {
  try {
    // Dynamically import the specific template route
    if (template === 2) {
      const { POST: template2Post } = await import('../generate-pptx-template2/route');
      const mockRequest = {
        json: async () => ({ project })
      } as NextRequest;

      const response = await template2Post(mockRequest);
      if (response instanceof NextResponse) {
        return await response.arrayBuffer();
      }
    } else if (template === 3) {
      const { POST: template3Post } = await import('../generate-pptx-template3/route');
      const mockRequest = {
        json: async () => ({ project })
      } as NextRequest;

      const response = await template3Post(mockRequest);
      if (response instanceof NextResponse) {
        return await response.arrayBuffer();
      }
    } else {
      // Default to Template 1
      const { POST: template1Post } = await import('../generate-pptx-template1/route');
      const mockRequest = {
        json: async () => ({ project, template: 1 })
      } as NextRequest;

      const response = await template1Post(mockRequest);
      if (response instanceof NextResponse) {
        return await response.arrayBuffer();
      }
    }

    throw new Error('Failed to generate PowerPoint');
  } catch (error) {
    console.error('Error generating PowerPoint:', error);
    throw error;
  }
};

export async function POST(request: NextRequest) {
  try {
    const { project }: { project: ProjectWithExtendedAI } = await request.json();

    if (!project) {
      return NextResponse.json(
        { error: 'Project data is required' },
        { status: 400 }
      );
    }

    // Create a new JSZip instance
    const zip = new JSZip();

    // Get the template ID from project (default to 1)
    const templateId = project.template_id || 1;

    // Generate PowerPoint presentation using the appropriate template
    const pptxData = await generatePowerPoint(project, templateId);
    const templateName = `Template_${templateId}`;
    const pptxFileName = project.name
      ? `${project.name.replace(/[^a-zA-Z0-9]/g, '_')}_Change_Management_Strategy_${templateName}.pptx`
      : `Change_Management_Strategy_${templateName}.pptx`;

    // Add PowerPoint to ZIP
    zip.file(pptxFileName, pptxData);

    // Generate and add Word documents
    if (project.ai_content) {
      // Add emails.docx
      const emailsDocx = await generateEmailsDocx(project.ai_content.emails);
      zip.file('emails.docx', emailsDocx);

      // Add video_script.docx
      const videoScriptDocx = await generateVideoScriptDocx(project.ai_content.video_script);
      zip.file('video_script.docx', videoScriptDocx);

      // Add faqs.docx
      const faqsDocx = await generateFAQsDocx(project.ai_content.faqs);
      zip.file('faqs.docx', faqsDocx);
    }

    // Generate the ZIP file
    const zipData = await zip.generateAsync({ type: 'nodebuffer' });

    // Create filename for ZIP
    const zipFileName = project.name
      ? `${project.name.replace(/[^a-zA-Z0-9]/g, '_')}_Complete_Package.zip`
      : 'Change_Management_Complete_Package.zip';

    // Return the ZIP file as a response
    return new NextResponse(new Uint8Array(zipData), {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${zipFileName}"`,
        'Content-Length': zipData.byteLength.toString(),
      },
    });
  } catch (error) {
    console.error('Error generating export package:', error);
    return NextResponse.json(
      { error: 'Failed to generate export package' },
      { status: 500 }
    );
  }
}