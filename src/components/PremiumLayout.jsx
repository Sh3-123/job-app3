import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { hasArtifact, saveArtifact } from '../utils/artifactStore';
import '../design-system.css';

const STEP_ROUTES = [
    '/rb/01-problem',
    '/rb/02-market',
    '/rb/03-architecture',
    '/rb/04-hld',
    '/rb/05-lld',
    '/rb/06-build',
    '/rb/07-test',
    '/rb/08-ship',
];

const PROOF_ROUTE = '/rb/proof';

const STEPS_INFO = {
    1: { title: 'Problem Statement', subtitle: 'Define the core problem you are solving' },
    2: { title: 'Market Research', subtitle: 'Analyze the market and competitors' },
    3: { title: 'Architecture', subtitle: 'Define the high-level system architecture' },
    4: { title: 'HLD', subtitle: 'High Level Design of components' },
    5: { title: 'LLD', subtitle: 'Low Level Design of classes and functions' },
    6: { title: 'Build', subtitle: 'Implement the core functionality' },
    7: { title: 'Test', subtitle: 'Verify the implementation with tests' },
    8: { title: 'Ship', subtitle: 'Deploy and release the application' },
};

export default function PremiumLayout({ stepNumber, title, subtitle, onBuildSuccess, buildPrompt, children }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [artifactExists, setArtifactExists] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);

    useEffect(() => {
        // Check for artifact existence
        const checkArtifact = () => {
            if (stepNumber) {
                setArtifactExists(hasArtifact(stepNumber));
            }
        };

        checkArtifact();
        window.addEventListener('artifact-updated', checkArtifact);
        return () => window.removeEventListener('artifact-updated', checkArtifact);
    }, [stepNumber]);

    const handleCopy = () => {
        if (buildPrompt) {
            navigator.clipboard.writeText(buildPrompt);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        }
    };

    const handleItWorked = () => {
        // Save a simple timestamp as artifact for now
        if (stepNumber && stepNumber <= 8) {
            saveArtifact(stepNumber, new Date().toISOString());
        }
        if (onBuildSuccess) onBuildSuccess();
    };

    const handleBuildInLovable = () => {
        // Placeholder action
        console.log('Open Lovable');
        // Maybe copy prompt automatically too
        handleCopy();
    };

    const handleNext = () => {
        if (stepNumber < 8) {
            navigate(STEP_ROUTES[stepNumber]); // index matches next step (0-indexed array vs 1-indexed step)
        } else {
            navigate(PROOF_ROUTE);
        }
    };

    const isProofPage = location.pathname === PROOF_ROUTE;
    const currentStepInfo = STEPS_INFO[stepNumber] || { title: 'Proof', subtitle: 'Verify completion' };

    const displayTitle = title || currentStepInfo.title;
    const displaySubtitle = subtitle || currentStepInfo.subtitle;

    return (
        <div className="layout-root">
            {/* TOP BAR */}
            <header className="kn-topbar">
                <div className="kn-topbar__project">AI Resume Builder</div>
                <div className="kn-topbar__progress">
                    {isProofPage ? 'Final Proof' : `Project 3 — Step ${stepNumber} of 8`}
                </div>
                <div className={`kn-topbar__status kn-topbar__status--${isProofPage ? 'shipped' : 'in-progress'}`}>
                    {isProofPage ? 'Shipped' : 'In Progress'}
                </div>
            </header>

            {/* CONTEXT HEADER */}
            <section className="kn-context-header">
                <h1 className="kn-context-header__title">{displayTitle}</h1>
                <p className="kn-context-header__subtitle">{displaySubtitle}</p>
            </section>

            {/* PRIMARY WORKSPACE + SECONDARY PANEL */}
            <div className="kn-container">

                {/* PRIMARY WORKSPACE (70%) */}
                <main className="kn-workspace">
                    {children}

                    {!isProofPage && (
                        <div className="kn-btn-group kn-mt-lg">
                            <button
                                className="kn-btn kn-btn--primary"
                                disabled={!artifactExists}
                                onClick={handleNext}
                            >
                                Next Step
                            </button>
                        </div>
                    )}
                </main>

                {/* SECONDARY PANEL (30%) */}
                {!isProofPage && (
                    <aside className="kn-panel">

                        <div className="kn-panel-section">
                            <h3 className="kn-panel-section__title">Build with AI</h3>
                            <p className="kn-panel-section__content">
                                Use the prompt below to generate the artifact for this step.
                            </p>

                            <textarea
                                className="kn-textarea kn-mb-sm"
                                readOnly
                                value={buildPrompt || ''}
                            />

                            <button className="kn-btn kn-btn--secondary kn-btn--full" onClick={handleCopy}>
                                {copySuccess ? 'Copied!' : 'Copy Prompt'}
                            </button>
                        </div>

                        <div className="kn-panel-section">
                            <h3 className="kn-panel-section__title">Actions</h3>
                            <div className="kn-btn-group kn-mb-sm">
                                <button className="kn-btn kn-btn--secondary kn-btn--full" onClick={handleBuildInLovable}>
                                    Build in Lovable
                                </button>
                            </div>

                            <div className="kn-btn-group kn-mb-sm">
                                <button className="kn-btn kn-btn--success kn-btn--full" onClick={handleItWorked}>
                                    It Worked
                                </button>
                            </div>

                            <div className="kn-btn-group">
                                <button className="kn-btn kn-btn--secondary kn-btn--full">Error</button>
                                <button className="kn-btn kn-btn--secondary kn-btn--full">Add Screenshot</button>
                            </div>
                        </div>

                    </aside>
                )}
            </div>

            {/* PROOF FOOTER */}
            <footer className="kn-proof-footer">
                <h3 className="kn-proof-footer__title">Completion Proof</h3>
                <div className="kn-proof-checklist">
                    {Object.keys(STEPS_INFO).map((step) => (
                        <label key={step} className="kn-proof-item">
                            <input
                                type="checkbox"
                                checked={hasArtifact(step)}
                                readOnly
                            />
                            <span>Step {step}</span>
                        </label>
                    ))}
                </div>
            </footer>

        </div>
    );
}
