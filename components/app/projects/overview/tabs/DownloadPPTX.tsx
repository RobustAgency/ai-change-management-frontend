'use client';

import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import React, { useState } from 'react'
import { ProjectData } from '../types'

interface DownloadPPTXProps {
    project?: ProjectData
}

const generatePPTX = async (project?: ProjectData) => {
    try {
        // Use project's template_id, default to 1 if not available
        const selectedTemplate = project?.template_id || 1;

        // Determine which API endpoint to use based on template
        let apiEndpoint = '/api/generate-pptx-template1';
        if (selectedTemplate === 2) {
            apiEndpoint = '/api/generate-pptx-template2';
        } else if (selectedTemplate === 3) {
            apiEndpoint = '/api/generate-pptx-template3';
        }

        // Call the appropriate API route to generate PPTX
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ project, template: selectedTemplate }),
        });

        if (!response.ok) {
            throw new Error('Failed to generate PowerPoint presentation');
        }

        // Get the blob from the response
        const blob = await response.blob();

        // Create filename with template name
        const templateName = `Template_${selectedTemplate}`;
        const fileName = project?.name
            ? `${project.name.replace(/[^a-zA-Z0-9]/g, '_')}_Change_Management_Strategy_${templateName}.pptx`
            : `Change_Management_Strategy_${templateName}.pptx`;

        // Create download link and trigger download
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        console.log(`PowerPoint presentation generated successfully with ${templateName}!`);
    } catch (error) {
        console.error('Error generating PowerPoint:', error);
        alert('Error generating PowerPoint presentation. Please try again.');
    }
}

const DownloadPPTX = ({ project }: DownloadPPTXProps) => {
    const [isGenerating, setIsGenerating] = useState(false);

    const handleDownload = async () => {
        setIsGenerating(true);
        try {
            await generatePPTX(project);
        } catch (error) {
            console.error('Error generating presentation:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <Button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3"
            onClick={handleDownload}
            size="lg"
            disabled={isGenerating}
        >
            <Download className="w-4 h-4 mr-2" />
            {isGenerating ? 'Generating...' : 'Export Slides'}
        </Button>
    )
}

export default DownloadPPTX
