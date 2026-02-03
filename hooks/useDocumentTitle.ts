'use client';

import { useEffect } from 'react';

export const useDocumentTitle = (title: string, description?: string) => {
    useEffect(() => {
        // Update document title
        const baseTitle = 'Innovative Dialogs';
        document.title = `${title} | ${baseTitle}`;

        // Update meta description if provided
        if (description) {
            let metaDescription = document.querySelector('meta[name="description"]');
            if (!metaDescription) {
                metaDescription = document.createElement('meta');
                metaDescription.setAttribute('name', 'description');
                document.head.appendChild(metaDescription);
            }
            metaDescription.setAttribute('content', description);
        }
    }, [title, description]);
};