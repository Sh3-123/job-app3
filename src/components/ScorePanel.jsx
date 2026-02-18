import React, { useMemo } from 'react';
import { useResume } from '../context/ResumeContext';
import { calculateScore } from '../utils/scoringEngine';

const ScorePanel = () => {
    const { resumeData } = useResume();
    const { score, suggestions } = useMemo(() => calculateScore(resumeData), [resumeData]);

    const getScoreColor = (s) => {
        if (s >= 80) return 'var(--color-success)';
        if (s >= 50) return 'var(--color-warning)';
        return 'var(--color-accent)';
    };

    return (
        <div className="kn-card kn-mb-md">
            <div className="kn-flex-between">
                <h3 className="kn-card__title">ATS Readiness Score</h3>
                <span style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: getScoreColor(score)
                }}>
                    {score}/100
                </span>
            </div>

            <div style={{
                width: '100%',
                height: '8px',
                background: '#e0e0e0',
                borderRadius: '4px',
                margin: '10px 0'
            }}>
                <div style={{
                    width: `${score}%`,
                    height: '100%',
                    background: getScoreColor(score),
                    borderRadius: '4px',
                    transition: 'width 0.5s ease-in-out'
                }} />
            </div>

            {suggestions.length > 0 && (
                <ul className="kn-mt-sm" style={{ paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--color-muted)' }}>
                    {suggestions.map((s, i) => (
                        <li key={i}>{s}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ScorePanel;
