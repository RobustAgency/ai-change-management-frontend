import { NextRequest, NextResponse } from 'next/server';
import JSZip from 'jszip';
import { Project } from '@/interfaces/Project';

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

// Function to format emails as text
const formatEmails = (emails: EmailsData | null | undefined): string => {
  if (!emails || typeof emails !== 'object') {
    return 'No emails available for this project.';
  }

  let emailText = 'CHANGE MANAGEMENT PROJECT EMAILS\n';
  emailText += '='.repeat(50) + '\n\n';

  Object.entries(emails).forEach(([role, emailData]: [string, EmailData]) => {
    emailText += `ROLE: ${role}\n`;
    emailText += '-'.repeat(30) + '\n';
    emailText += `SUBJECT: ${emailData.subject || 'No subject'}\n\n`;
    emailText += `BODY:\n${emailData.body || 'No email body available'}\n\n`;
    emailText += '='.repeat(50) + '\n\n';
  });

  return emailText;
};

// Function to format video script as text
const formatVideoScript = (videoScript: VideoScript | string | null | undefined): string => {
  if (!videoScript) {
    return 'No video script available for this project.';
  }

  let scriptText = 'CHANGE MANAGEMENT PROJECT VIDEO SCRIPT\n';
  scriptText += '='.repeat(50) + '\n\n';

  try {
    const script = typeof videoScript === 'string' ? JSON.parse(videoScript) : videoScript;

    if (script.opening) {
      scriptText += 'OPENING:\n';
      scriptText += '-'.repeat(20) + '\n';
      scriptText += `${script.opening}\n\n`;
    }

    if (script.supporting_visuals) {
      scriptText += 'SUPPORTING VISUALS:\n';
      scriptText += '-'.repeat(20) + '\n';
      scriptText += `${script.supporting_visuals}\n\n`;
    }

    if (script.executive_return) {
      scriptText += 'EXECUTIVE RETURN:\n';
      scriptText += '-'.repeat(20) + '\n';
      scriptText += `${script.executive_return}\n\n`;
    }

    if (script.supporting_visuals_two) {
      scriptText += 'SUPPORTING VISUALS (2):\n';
      scriptText += '-'.repeat(20) + '\n';
      scriptText += `${script.supporting_visuals_two}\n\n`;
    }

    if (script.closing) {
      scriptText += 'CLOSING:\n';
      scriptText += '-'.repeat(20) + '\n';
      scriptText += `${script.closing}\n\n`;
    }

    if (script.fade_out) {
      scriptText += 'FADE OUT:\n';
      scriptText += '-'.repeat(20) + '\n';
      scriptText += `${script.fade_out}\n\n`;
    }
  } catch {
    scriptText += `Raw video script content:\n${videoScript}\n`;
  }

  return scriptText;
};

// Function to format FAQs as text
const formatFAQs = (faqs: FAQ[] | null | undefined): string => {
  if (!faqs || !Array.isArray(faqs) || faqs.length === 0) {
    return 'No FAQs available for this project.';
  }

  let faqText = 'CHANGE MANAGEMENT PROJECT FAQS\n';
  faqText += '='.repeat(50) + '\n\n';

  faqs.forEach((faq, index) => {
    faqText += `Q${index + 1}: ${faq.question || 'No question available'}\n`;
    faqText += '-'.repeat(40) + '\n';
    faqText += `A${index + 1}: ${faq.answer || 'No answer available'}\n\n`;
    faqText += '='.repeat(50) + '\n\n';
  });

  return faqText;
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

    // Generate and add text files
    if (project.ai_content) {
      // Add emails.txt
      const emailsText = formatEmails(project.ai_content.emails);
      zip.file('emails.txt', emailsText);

      // Add video_script.txt
      const videoScriptText = formatVideoScript(project.ai_content.video_script);
      zip.file('video_script.txt', videoScriptText);

      // Add faqs.txt
      const faqsText = formatFAQs(project.ai_content.faqs);
      zip.file('faqs.txt', faqsText);
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