'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileText, Palette, Sparkles } from 'lucide-react';

interface TemplateSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (templateId: number) => void;
  isGenerating: boolean;
}

const templates = [
  {
    id: 1,
    name: 'Professional Blue',
    description: 'Clean and professional design with blue accents. Perfect for corporate presentations.',
    color: '#3B82F6',
    bgColor: '#EFF6FF',
    icon: <FileText className="w-6 h-6" />,
    features: ['Clean typography', 'Professional layout', 'Blue color scheme']
  },
  {
    id: 2,
    name: 'Modern Red',
    description: 'Bold and dynamic design with red accents. Perfect for impactful business presentations.',
    color: '#DC2626',
    bgColor: '#FEF2F2',
    icon: <Sparkles className="w-6 h-6" />,
    features: ['Bold design', 'Dynamic layout', 'Red accent scheme']
  },
  {
    id: 3,
    name: 'Corporate Purple',
    description: 'Elegant corporate design with purple accents. Great for executive presentations.',
    color: '#8B5CF6',
    bgColor: '#FAF5FF',
    icon: <Palette className="w-6 h-6" />,
    features: ['Executive style', 'Elegant design', 'Purple theme']
  }
];

const TemplateSelectionModal = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate, 
  isGenerating 
}: TemplateSelectionModalProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  const handleSelectTemplate = (templateId: number) => {
    setSelectedTemplate(templateId);
  };

  const handleConfirmSelection = () => {
    if (selectedTemplate) {
      onSelectTemplate(selectedTemplate);
    }
  };

  const handleClose = () => {
    if (!isGenerating) {
      setSelectedTemplate(null);
      onClose();
    }
  };

  const getTemplatePreviewText = (templateId: number) => {
    switch (templateId) {
      case 1:
        return "Professional blue theme with clean typography and corporate styling";
      case 2:
        return "Modern red theme with bold accents and dynamic business styling";
      case 3:
        return "Executive purple theme with elegant styling and premium appearance";
      default:
        return "";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="min-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Choose a Presentation Template
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Select a template design for your Change Management Strategy presentation. 
            Each template offers a unique visual style and color scheme.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {templates.map((template) => (
            <Card
              key={template.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                selectedTemplate === template.id
                  ? 'ring-2 ring-offset-2 ring-indigo-500 shadow-lg'
                  : 'hover:shadow-md'
              } ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => !isGenerating && handleSelectTemplate(template.id)}
            >
              <CardHeader className="pb-3">
                <div 
                  className="w-full h-32 rounded-lg mb-4 flex items-center justify-center"
                  style={{ backgroundColor: template.bgColor }}
                >
                  <div 
                    className="p-4 rounded-full"
                    style={{ backgroundColor: template.color, color: 'white' }}
                  >
                    {template.icon}
                  </div>
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  {template.name}
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  {template.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Features:</p>
                  <ul className="space-y-1">
                    {template.features.map((feature, index) => (
                      <li 
                        key={index} 
                        className="text-xs text-gray-600 flex items-center"
                      >
                        <span 
                          className="w-2 h-2 rounded-full mr-2"
                          style={{ backgroundColor: template.color }}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedTemplate && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-2">Selected Template Preview</h4>
            <p className="text-sm text-gray-600">
              {getTemplatePreviewText(selectedTemplate)}
            </p>
            <div className="mt-3 flex items-center">
              <div 
                className="w-4 h-4 rounded mr-2"
                style={{ backgroundColor: templates.find(t => t.id === selectedTemplate)?.color }}
              />
              <span className="text-sm font-medium">
                {templates.find(t => t.id === selectedTemplate)?.name}
              </span>
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-3 mt-8 pt-6 border-t">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isGenerating}
            className="px-6"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmSelection}
            disabled={!selectedTemplate || isGenerating}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6"
          >
            {isGenerating ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Generating...
              </div>
            ) : (
              <div className="flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Generate Presentation
              </div>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateSelectionModal;