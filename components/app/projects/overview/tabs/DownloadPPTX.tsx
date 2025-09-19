'use client';

import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import React from 'react'
import { ProjectData } from '../types'

interface DownloadPPTXProps {
    project?: ProjectData
}

const generatePPTX = async (project?: ProjectData) => {
    try {
        // Call the API route to generate PPTX
        const response = await fetch('/api/generate-pptx', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        });

        if (!response.ok) {
            throw new Error('Failed to generate PowerPoint presentation');
        }

        // Get the blob from the response
        const blob = await response.blob();

        // Create filename
        const fileName = project?.name 
            ? `${project.name.replace(/[^a-zA-Z0-9]/g, '_')}_Change_Management_Strategy.pptx`
            : 'Change_Management_Strategy.pptx';

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

        console.log('PowerPoint presentation generated successfully!');
    } catch (error) {
        console.error('Error generating PowerPoint:', error);
        alert('Error generating PowerPoint presentation. Please try again.');
    }
}

const DownloadPPTX = ({ project }: DownloadPPTXProps) => {
    const handleDownload = () => {
        generatePPTX(project)
    }

    return (
        <Button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3"
            onClick={handleDownload}
            size="lg"
        >
            <Download className="w-4 h-4 mr-2" />
            Export All
        </Button>
    )
}

export default DownloadPPTX
