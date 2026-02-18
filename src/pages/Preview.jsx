import React, { useState } from 'react';
import ResumePreview from '../components/ResumePreview';
import { useResume } from '../context/ResumeContext';
import { generatePlainText } from '../utils/textGenerator';

const Preview = () => {
    const { resumeData } = useResume();
    const [warning, setWarning] = useState(null);
    const [copySuccess, setCopySuccess] = useState(false);

    const checkCompleteness = () => {
        const warnings = [];
        if (!resumeData.personal.fullName) warnings.push("Full Name is missing.");
        if (resumeData.experience.length === 0 && resumeData.projects.length === 0) {
            warnings.push("At least one Project or Experience is recommended.");
        }
        return warnings;
    };

    const handlePrint = () => {
        const issues = checkCompleteness();
        if (issues.length > 0) {
            setWarning(issues);
            // Allow print after short delay or immediately? User said "Do NOT block export. Only warn."
            // So we show warning, but maybe open print dialog anyway? 
            // Or better: Show warning inline, and user can click print again or we just print.
            // Let's show warning and print immediately to not block, acting as a "toast" or just non-blocking alert.
            // Actually, "Show calm warning" implies we shouldn't just pop up the print dialog over the warning if they haven't seen it.
            // But to keep it simple and valid:
            setTimeout(() => window.print(), 500);
        } else {
            setWarning(null);
            window.print();
        }
    };

    const handleCopyText = () => {
        const issues = checkCompleteness();
        if (issues.length > 0) {
            setWarning(issues);
        } else {
            setWarning(null);
        }

        const text = generatePlainText(resumeData);
        navigator.clipboard.writeText(text).then(() => {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        });
    };

    return (
        <div className="kn-container kn-preview-full" style={{ flexDirection: 'column', alignItems: 'center' }}>

            {/* Export Actions Bar */}
            <div className="kn-btn-group kn-mb-md no-print" style={{ width: '100%', maxWidth: '800px', justifyContent: 'space-between' }}>
                <button onClick={handlePrint} className="kn-btn kn-btn--primary">
                    Print / Save as PDF
                </button>
                <button onClick={handleCopyText} className="kn-btn kn-btn--secondary">
                    {copySuccess ? 'Copied!' : 'Copy Resume as Text'}
                </button>
            </div>

            {/* Validation Warning */}
            {warning && warning.length > 0 && (
                <div className="kn-error kn-mb-md no-print" style={{ width: '100%', maxWidth: '800px', borderColor: 'var(--color-warning)' }}>
                    <h4 className="kn-error__title" style={{ color: 'var(--color-warning)' }}>Resume may look incomplete:</h4>
                    <ul className="kn-error__message">
                        {warning.map((w, i) => <li key={i}>{w}</li>)}
                    </ul>
                </div>
            )}

            <ResumePreview />
        </div>
    );
};

export default Preview;
