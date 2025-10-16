'use client';

import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import React, { useState } from 'react'
import { ProjectData } from './types'

interface ExportAllProps {
    project?: ProjectData
}

const generateExportAll = async (project?: ProjectData) => {
    try {
        // Call the new API endpoint for complete export
        const response = await fetch('/api/export-all', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ project }),
        });

        if (!response.ok) {
            throw new Error('Failed to generate complete export package');
        }

        // Get the blob from the response
        const blob = await response.blob();

        // Create filename
        const fileName = project?.name
            ? `${project.name.replace(/[^a-zA-Z0-9]/g, '_')}_Complete_Package.zip`
            : 'Change_Management_Complete_Package.zip';

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

        console.log('Complete export package generated successfully!');
    } catch (error) {
        console.error('Error generating complete export package:', error);
        alert('Error generating complete export package. Please try again.');
    }
}

const ExportAll = ({ project }: ExportAllProps) => {
    const [isGenerating, setIsGenerating] = useState(false);

    const handleExportAll = async () => {
        setIsGenerating(true);
        try {
            await generateExportAll(project);
        } catch (error) {
            console.error('Error generating complete export:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <Button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3"
            onClick={handleExportAll}
            size="lg"
            disabled={isGenerating}
        >
            <Download className="w-4 h-4 mr-2" />
            {isGenerating ? 'Generating...' : 'Export All'}
        </Button>
    )
}

export default ExportAll