'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Users } from 'lucide-react';
import type { ProjectFormData, Stakeholder } from '@/interfaces/Project';

interface StakeholdersProps {
    formData: ProjectFormData;
    onStakeholderChange: (index: number, field: keyof Stakeholder, value: string) => void;
    onAddStakeholder: () => void;
    onRemoveStakeholder: (index: number) => void;
}

const Stakeholders: React.FC<StakeholdersProps> = ({
    formData,
    onStakeholderChange,
    onAddStakeholder,
    onRemoveStakeholder,
}) => {
    return (
        <div className="space-y-6">
            <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100">
                <h3 className="font-semibold text-indigo-900 mb-2 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Why stakeholder information matters
                </h3>
                <p className="text-indigo-700">
                    Identifying key stakeholders helps ensure the right people are informed and engaged throughout the change process. Include anyone who will be impacted or needs to support the change.
                </p>
            </div>

            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Project Stakeholders</h3>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={onAddStakeholder}
                    className="h-10"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Stakeholder
                </Button>
            </div>

            <div className="space-y-4">
                {formData.stakeholders && formData.stakeholders.length > 0 ? (
                    formData.stakeholders.map((stakeholder, index) => (
                        <div key={index} className="flex items-center space-x-3 p-6 border-2 border-gray-200 rounded-lg hover:border-indigo-300 transition-all">
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-600">Name</label>
                                    <Input
                                        placeholder="Enter stakeholder name"
                                        value={stakeholder.name || ''}
                                        onChange={(e) => onStakeholderChange(index, 'name', e.target.value)}
                                        className="h-12"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-600">Department</label>
                                    <Input
                                        placeholder="Enter department"
                                        value={stakeholder.department || ''}
                                        onChange={(e) => onStakeholderChange(index, 'department', e.target.value)}
                                        className="h-12"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-600">Role Level</label>
                                    <Select
                                        value={stakeholder.role_level || ''}
                                        onValueChange={(value) => onStakeholderChange(index, 'role_level', value)}
                                    >
                                        <SelectTrigger className="h-12">
                                            <SelectValue placeholder="Select role level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="C-Suite">C-Suite</SelectItem>
                                            <SelectItem value="Leader">Leader</SelectItem>
                                            <SelectItem value="Manager">Manager</SelectItem>
                                            <SelectItem value="Individual Contributor">Individual Contributor</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => onRemoveStakeholder(index)}
                                className="h-10 w-10 p-0"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500 py-12 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                        <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No stakeholders added yet</h3>
                        <p className="text-gray-600 mb-4">Add key stakeholders who will be impacted by this change</p>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onAddStakeholder}
                            className="h-12 px-6"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Your First Stakeholder
                        </Button>
                    </div>
                )}
            </div>

            {formData.stakeholders && formData.stakeholders.length > 0 && (
                <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                    <h3 className="font-semibold text-green-900 mb-2">
                        Stakeholders Added ({formData.stakeholders.length})
                    </h3>
                    <p className="text-green-700">
                        Great! These stakeholders will be considered when creating communication materials and change management strategies.
                    </p>
                </div>
            )}
        </div>
    );
};

export default Stakeholders;
