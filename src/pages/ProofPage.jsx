import React, { useState, useEffect } from 'react';
import PremiumLayout from '../components/PremiumLayout';
import { hasArtifact } from '../utils/artifactStore';

export default function ProofPage() {
    const [links, setLinks] = useState({
        lovable: localStorage.getItem('rb_proof_lovable') || '',
        github: localStorage.getItem('rb_proof_github') || '',
        deploy: localStorage.getItem('rb_proof_deploy') || ''
    });

    const handleLinkChange = (key, value) => {
        setLinks(prev => ({ ...prev, [key]: value }));
        localStorage.setItem(`rb_proof_${key}`, value);
    };

    const allStepsComplete = [1, 2, 3, 4, 5, 6, 7, 8].every(step => hasArtifact(step));
    const allLinksProvided = links.lovable && links.github && links.deploy;
    const readyToSubmit = allStepsComplete && allLinksProvided;

    const handleCopySubmission = () => {
        const text = `
Project 3: AI Resume Builder - Final Submission
-----------------------------------------------
Lovable Link: ${links.lovable}
GitHub Link: ${links.github}
Deploy Link: ${links.deploy}

Steps Completed: ${allStepsComplete ? '8/8' : 'Incomplete'}
    `.trim();
        navigator.clipboard.writeText(text);
        alert('Submission copied to clipboard!');
    };

    return (
        <PremiumLayout stepNumber={9} title="Final Proof" subtitle="Verify and submit your project">
            <div className="kn-card">
                <h2 className="kn-card__title">Project Status</h2>
                <div className="kn-card__content">
                    <div className="kn-proof-checklist kn-mb-md">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(step => (
                            <div key={step} className="kn-proof-item">
                                <input type="checkbox" checked={hasArtifact(step)} readOnly />
                                <span>Step {step}</span>
                            </div>
                        ))}
                    </div>
                    {allStepsComplete ? (
                        <p className="text-muted">All steps verified. Please provide your improved project links below.</p>
                    ) : (
                        <div className="kn-error">
                            <h4 className="kn-error__title">Incomplete Steps</h4>
                            <p className="kn-error__message">Please complete all 8 steps before submitting.</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="kn-card">
                <h2 className="kn-card__title">Submission Links</h2>
                <div className="kn-card__content">
                    <div className="kn-form-group">
                        <label className="kn-form-label">Lovable Project Link</label>
                        <input
                            className="kn-input"
                            placeholder="https://lovable.dev/..."
                            value={links.lovable}
                            onChange={(e) => handleLinkChange('lovable', e.target.value)}
                        />
                    </div>
                    <div className="kn-form-group">
                        <label className="kn-form-label">GitHub Repository Link</label>
                        <input
                            className="kn-input"
                            placeholder="https://github.com/..."
                            value={links.github}
                            onChange={(e) => handleLinkChange('github', e.target.value)}
                        />
                    </div>
                    <div className="kn-form-group">
                        <label className="kn-form-label">Deployed Application Link</label>
                        <input
                            className="kn-input"
                            placeholder="https://..."
                            value={links.deploy}
                            onChange={(e) => handleLinkChange('deploy', e.target.value)}
                        />
                    </div>

                    <div className="kn-mt-md">
                        <button
                            className="kn-btn kn-btn--primary kn-btn--full"
                            disabled={!readyToSubmit}
                            onClick={handleCopySubmission}
                        >
                            Copy Final Submission
                        </button>
                    </div>
                </div>
            </div>
        </PremiumLayout>
    );
}
