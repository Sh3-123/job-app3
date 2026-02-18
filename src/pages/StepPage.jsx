import React, { useState, useEffect } from 'react';
import PremiumLayout from '../components/PremiumLayout';
import { hasArtifact } from '../utils/artifactStore';

const StepPage = ({ stepNumber, title, subtitle }) => {
    const [isComplete, setIsComplete] = useState(false);

    const prompt = `Analyze the ${title} for the AI Resume Builder project.
Provide a clear ${subtitle}.
Output format: Markdown.`;

    useEffect(() => {
        const checkStatus = () => {
            setIsComplete(hasArtifact(stepNumber));
        };
        checkStatus();
        window.addEventListener('artifact-updated', checkStatus);
        return () => window.removeEventListener('artifact-updated', checkStatus);
    }, [stepNumber]);

    return (
        <PremiumLayout
            stepNumber={stepNumber}
            title={title}
            subtitle={subtitle}
            buildPrompt={prompt}
        >
            <div className="kn-card">
                <h2 className="kn-card__title">Current Task: {title}</h2>
                <div className="kn-card__content">
                    <p>Welcome to Step {stepNumber}. Your goal is to {subtitle.toLowerCase()}.</p>
                    <p className="kn-mt-md">1. Use the prompt on the right to generate the content.</p>
                    <p>2. Review the output.</p>
                    <p>3. If satisfied, click "It Worked" to proceed.</p>
                </div>
            </div>

            <div className="kn-card">
                <h2 className="kn-card__title">Status</h2>
                <div className="kn-card__content">
                    <div className={`kn-badge kn-badge--${isComplete ? 'success' : 'default'}`}>
                        {isComplete ? 'Completed' : 'Pending Artifact'}
                    </div>
                </div>
            </div>
        </PremiumLayout>
    );
};

export default StepPage;
