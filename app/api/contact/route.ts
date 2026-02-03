import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'edge';

interface ContactFormData {
  full_name: string;
  phone_number: string;
  email: string;
  business: string;
  message: string;
  time: string;
}

export async function POST(request: NextRequest) {
  try {
    const formData: ContactFormData = await request.json();

    if (!formData.full_name || !formData.email || !formData.business || !formData.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set');
      return NextResponse.json(
        { error: 'Email service configuration error' },
        { status: 500 }
      );
    }

    if (!process.env.RESEND_FROM_EMAIL) {
      console.error('RESEND_FROM_EMAIL is not set');
      return NextResponse.json(
        { error: 'Email service configuration error: RESEND_FROM_EMAIL must be set to a verified domain email' },
        { status: 500 }
      );
    }

    // Initialize Resend inside the function after validation to prevent build-time errors
    const resend = new Resend(process.env.RESEND_API_KEY);

    const recipientEmail = process.env.RESEND_FROM_EMAIL;
    const fromEmail = process.env.RESEND_FROM_EMAIL;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #555; }
            .value { margin-top: 5px; color: #333; }
            .message-box { background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin-top: 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Enterprise Contact Form Submission</h2>
              <p style="margin: 0; color: #666;">Submitted at: ${formData.time}</p>
            </div>
            
            <div class="field">
              <div class="label">Full Name:</div>
              <div class="value">${formData.full_name}</div>
            </div>
            
            <div class="field">
              <div class="label">Email:</div>
              <div class="value">${formData.email}</div>
            </div>
            
            <div class="field">
              <div class="label">Phone Number:</div>
              <div class="value">${formData.phone_number || 'Not provided'}</div>
            </div>
            
            <div class="field">
              <div class="label">Business/Company:</div>
              <div class="value">${formData.business}</div>
            </div>
            
            <div class="field">
              <div class="label">Message:</div>
              <div class="message-box">
                ${formData.message.replace(/\n/g, '<br>')}
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: recipientEmail,
      replyTo: formData.email,
      subject: `Enterprise Contact Form: ${formData.business}`,
      html: emailHtml,
    });

    if (error) {
      console.error('Resend error:', error);
      
      let errorMessage = 'Failed to send email';
      if (error.message) {
        errorMessage = error.message;
      }
      
      return NextResponse.json(
        { 
          error: errorMessage,
          details: error,
          hint: 'Make sure RESEND_FROM_EMAIL uses your verified domain (e.g., noreply@robustapps.net)'
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, messageId: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending contact email:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

