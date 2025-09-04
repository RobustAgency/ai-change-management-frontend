'use client';

import React, { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';
import type { ProjectFormData } from '@/interfaces/Project';

interface BasicInformationProps {
    formData: ProjectFormData;
    validationErrors: Record<string, string>;
    customType: string;
    clientLogo: File | null;
    logoPreview: string | null;
    onInputChange: (field: keyof ProjectFormData, value: string) => void;
    onTypeChange: (value: string) => void;
    onCustomTypeChange: (value: string) => void;
    onLogoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemoveLogo: () => void;
}

const BasicInformation: React.FC<BasicInformationProps> = ({
    formData,
    validationErrors,
    customType,
    clientLogo,
    logoPreview,
    onInputChange,
    onTypeChange,
    onCustomTypeChange,
    onLogoChange,
    onRemoveLogo,
}) => {
    const [localPreview, setLocalPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const previewUrlRef = useRef<string | null>(null);

    const validateFile = (file: File) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) return 'Only image files are allowed';
        const maxBytes = 5 * 1024 * 1024; // 5MB
        if (file.size > maxBytes) return 'Max size is 5MB';
        return null;
    };

    const handleFileSelect = (file: File) => {
        const validation = validateFile(file);
        if (validation) {
            // You might want to show this error to the user
            console.error(validation);
            return;
        }

        // Clean up previous preview URL
        if (previewUrlRef.current && previewUrlRef.current.startsWith('blob:')) {
            URL.revokeObjectURL(previewUrlRef.current);
        }

        // Create new preview URL
        const blobUrl = URL.createObjectURL(file);
        previewUrlRef.current = blobUrl;
        setLocalPreview(blobUrl);

        // Create synthetic event and call parent handler
        const syntheticEvent = {
            target: {
                files: [file]
            }
        } as unknown as React.ChangeEvent<HTMLInputElement>;
        
        onLogoChange(syntheticEvent);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.classList.remove('border-indigo-400', 'bg-indigo-50');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            handleFileSelect(file);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.classList.add('border-indigo-400', 'bg-indigo-50');
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.classList.remove('border-indigo-400', 'bg-indigo-50');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const handleRemove = () => {
        // Clean up preview URL
        if (previewUrlRef.current && previewUrlRef.current.startsWith('blob:')) {
            URL.revokeObjectURL(previewUrlRef.current);
        }
        previewUrlRef.current = null;
        setLocalPreview(null);
        
        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        
        // Call parent handler
        onRemoveLogo();
    };

    const openFileDialog = () => {
        fileInputRef.current?.click();
    };

    // Use local preview if available, otherwise fall back to logoPreview from props
    const displayImage = localPreview || logoPreview;

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-base font-semibold text-gray-700">
                        Project Name *
                    </Label>
                    <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => onInputChange('name', e.target.value)}
                        placeholder="e.g., Q4 Digital Transformation Initiative"
                        className="h-12"
                    />
                    {validationErrors.name && (
                        <p className="text-red-500 text-sm">{validationErrors.name}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="launch_date" className="text-base font-semibold text-gray-700">
                        Launch Date *
                    </Label>
                    <Input
                        id="launch_date"
                        type="date"
                        value={formData.launch_date}
                        onChange={(e) => onInputChange('launch_date', e.target.value)}
                        className="h-12"
                    />
                    {validationErrors.launch_date && (
                        <p className="text-red-500 text-sm">{validationErrors.launch_date}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="type" className="text-base font-semibold text-gray-700">
                        Project Type
                    </Label>
                    <Select value={formData.type} onValueChange={onTypeChange}>
                        <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select the type of change initiative" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="system">System</SelectItem>
                            <SelectItem value="process">Process</SelectItem>
                            <SelectItem value="structure">Structure</SelectItem>
                            <SelectItem value="strategy">Strategy</SelectItem>
                            <SelectItem value="culture">Culture</SelectItem>
                            <SelectItem value="org design">Org Design</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                    {formData.type === 'other' && (
                        <div className="mt-2">
                            <Input
                                placeholder="Please specify the type of change"
                                value={customType}
                                onChange={(e) => onCustomTypeChange(e.target.value)}
                                className="h-12"
                            />
                            {validationErrors.customType && (
                                <p className="text-red-500 text-sm mt-1">{validationErrors.customType}</p>
                            )}
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="status" className="text-base font-semibold text-gray-700">
                        Status *
                    </Label>
                    <Select value={formData.status} onValueChange={(value) => onInputChange('status', value)}>
                        <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                    {validationErrors.status && (
                        <p className="text-red-500 text-sm">{validationErrors.status}</p>
                    )}
                </div>

                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="client_organization" className="text-base font-semibold text-gray-700">
                        Client Organization
                    </Label>
                    <Input
                        id="client_organization"
                        value={formData.client_organization}
                        onChange={(e) => onInputChange('client_organization', e.target.value)}
                        placeholder="Enter client organization name"
                        className="h-12"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="summary" className="text-base font-semibold text-gray-700">
                    Project Summary
                </Label>
                <Textarea
                    id="summary"
                    value={formData.summary}
                    onChange={(e) => onInputChange('summary', e.target.value)}
                    placeholder="Provide a brief overview of what this change initiative involves and its main objectives..."
                    rows={4}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="client_logo" className="text-base font-semibold text-gray-700">
                    Client Logo
                </Label>
                <div className="relative">
                    {displayImage ? (
                        <div className="min-w-md w-max relative group">
                            <div 
                                className="w-full max-w-md h-32 border-2 border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-all"
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={openFileDialog}
                            >
                                <img
                                    src={displayImage}
                                    alt="Logo preview"
                                    className="max-w-full max-h-full object-contain rounded-md"
                                />
                            </div>
                            <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="absolute -top-2 -right-2 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={handleRemove}
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    ) : (
                        <div 
                            className="w-full max-w-md h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-gray-50 cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-all"
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={openFileDialog}
                        >
                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-600 text-center">
                                <span className="font-medium">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-400">PNG, JPG, JPEG, WEBP up to 5MB</p>
                        </div>
                    )}
                    <Input
                        ref={fileInputRef}
                        id="client_logo"
                        type="file"
                        accept="image/png,image/jpg,image/jpeg,image/webp"
                        onChange={handleInputChange}
                        className="hidden"
                    />
                </div>
                <p className="text-sm text-gray-500">Drag and drop an image file or click to browse</p>
            </div>
        </div>
    );
};

export default BasicInformation;
