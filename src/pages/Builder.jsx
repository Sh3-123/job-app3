import React from 'react';
import ResumeForm from '../components/ResumeForm';
import ResumePreview from '../components/ResumePreview';

const Builder = () => {
    return (
        <div className="kn-container kn-grid-builder">
            <div className="kn-workspace">
                <ResumeForm />
            </div>
            <div className="kn-preview-panel">
                <ResumePreview />
            </div>
        </div>
    );
};

export default Builder;
