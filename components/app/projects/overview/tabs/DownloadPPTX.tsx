'use client';

import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import React, { useState } from 'react'
import { ProjectData } from '../types'
import TemplateSelectionModal from './TemplateSelectionModal'

interface DownloadPPTXProps {
    project?: ProjectData
}

const generatePPTX = async (project?: ProjectData, template: number = 1) => {
    try {
        // Call the API route to generate PPTX with template selection
        const response = await fetch('/api/generate-pptx', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ project, template }),
        });

        if (!response.ok) {
            throw new Error('Failed to generate PowerPoint presentation');
        }

        // Get the blob from the response
        const blob = await response.blob();

        // Create filename with template name
        const templateName = `Template_${template}`;
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSelectTemplate = async (templateId: number) => {
        setIsGenerating(true);
        try {
            await generatePPTX(project, templateId);
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error generating presentation:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <>
            <Button
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3"
                onClick={handleOpenModal}
                size="lg"
                disabled={isGenerating}
            >
                <Download className="w-4 h-4 mr-2" />
                Export All
            </Button>

            <TemplateSelectionModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSelectTemplate={handleSelectTemplate}
                isGenerating={isGenerating}
            />
        </>
    )
}

export default DownloadPPTX
