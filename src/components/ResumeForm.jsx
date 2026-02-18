import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';

const BuilderSection = ({ title, children, onAdd }) => (
    <div className="kn-card kn-mb-md">
        <div className="kn-flex-between kn-mb-sm">
            <h3 className="kn-card__title">{title}</h3>
            {onAdd && (
                <button onClick={onAdd} className="kn-btn kn-btn--secondary kn-btn--sm">
                    + Add
                </button>
            )}
        </div>
        <div className="kn-card__content">{children}</div>
    </div>
);

const InputField = ({ label, value, onChange, placeholder, type = 'text' }) => (
    <div className="kn-form-group">
        <label className="kn-form-label">{label}</label>
        <input
            type={type}
            className="kn-input"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
        />
    </div>
);

const TextAreaField = ({ label, value, onChange, placeholder }) => (
    <div className="kn-form-group">
        <label className="kn-form-label">{label}</label>
        <textarea
            className="kn-textarea"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
        />
    </div>
);

import ScorePanel from './ScorePanel';

export default function ResumeForm() {
    const { resumeData, updatePersonal, updateSection, addEntry, removeEntry, loadSampleData, clearData } = useResume();
    const [eduInput, setEduInput] = useState({ school: '', degree: '', year: '' });
    const [expInput, setExpInput] = useState({ company: '', role: '', duration: '', description: '' });
    const [projInput, setProjInput] = useState({ name: '', description: '' });

    // Handlers...
    const handleAddEducation = () => {
        if (eduInput.school) {
            addEntry('education', eduInput);
            setEduInput({ school: '', degree: '', year: '' });
        }
    };

    const handleAddExperience = () => {
        if (expInput.company) {
            addEntry('experience', expInput);
            setExpInput({ company: '', role: '', duration: '', description: '' });
        }
    };

    const handleAddProject = () => {
        if (projInput.name) {
            addEntry('projects', projInput);
            setProjInput({ name: '', description: '' });
        }
    };

    return (
        <div className="builder-form">
            <ScorePanel />
            <div className="kn-btn-group kn-mb-md">
                <button onClick={loadSampleData} className="kn-btn kn-btn--secondary kn-btn--full">
                    Load Sample Data
                </button>
                <button onClick={clearData} className="kn-btn kn-btn--secondary kn-btn--full kn-btn--warning" style={{ color: 'var(--color-accent)', borderColor: 'var(--color-accent)' }}>
                    Clear All
                </button>
            </div>

            {/* Personal Info */}
            <BuilderSection title="Personal Information">
                <InputField
                    label="Full Name"
                    value={resumeData.personal.fullName}
                    onChange={(v) => updatePersonal('fullName', v)}
                    placeholder="e.g. Alex Morgan"
                />
                <InputField
                    label="Email"
                    value={resumeData.personal.email}
                    onChange={(v) => updatePersonal('email', v)}
                    placeholder="e.g. alex@example.com"
                    type="email"
                />
                <InputField
                    label="Phone"
                    value={resumeData.personal.phone}
                    onChange={(v) => updatePersonal('phone', v)}
                    placeholder="e.g. +1 555-123-4567"
                />
                <InputField
                    label="Location"
                    value={resumeData.personal.location}
                    onChange={(v) => updatePersonal('location', v)}
                    placeholder="e.g. San Francisco, CA"
                />
            </BuilderSection>

            {/* Links */}
            <BuilderSection title="Links">
                <InputField
                    label="GitHub"
                    value={resumeData.personal.github}
                    onChange={(v) => updatePersonal('github', v)}
                    placeholder="github.com/..."
                />
                <InputField
                    label="LinkedIn"
                    value={resumeData.personal.linkedin}
                    onChange={(v) => updatePersonal('linkedin', v)}
                    placeholder="linkedin.com/in/..."
                />
            </BuilderSection>

            {/* Summary */}
            <BuilderSection title="Professional Summary">
                <TextAreaField
                    label="Summary"
                    value={resumeData.summary}
                    onChange={(v) => updateSection('summary', v)}
                    placeholder="Briefly describe your experience and goals..."
                />
            </BuilderSection>

            {/* Skills */}
            <BuilderSection title="Technical Skills">
                <TextAreaField
                    label="Skills (comma-separated)"
                    value={resumeData.skills}
                    onChange={(v) => updateSection('skills', v)}
                    placeholder="e.g. React, Node.js, Python, AWS..."
                />
            </BuilderSection>

            {/* Education */}
            <BuilderSection title="Education">
                {resumeData.education.length > 0 && (
                    <ul className="kn-mb-md">
                        {resumeData.education.map(ed => (
                            <li key={ed.id} className="kn-flex-between kn-proof-item kn-mb-xs">
                                <span>{ed.school} - {ed.degree}</span>
                                <button onClick={() => removeEntry('education', ed.id)} className="text-small text-muted">Remove</button>
                            </li>
                        ))}
                    </ul>
                )}
                <div className="kn-grid-2">
                    <InputField label="School / University" value={eduInput.school} onChange={v => setEduInput({ ...eduInput, school: v })} />
                    <InputField label="Degree" value={eduInput.degree} onChange={v => setEduInput({ ...eduInput, degree: v })} />
                    <InputField label="Year" value={eduInput.year} onChange={v => setEduInput({ ...eduInput, year: v })} />
                </div>
                <button onClick={handleAddEducation} className="kn-btn kn-btn--secondary kn-mt-sm">Add Education</button>
            </BuilderSection>

            {/* Experience */}
            <BuilderSection title="Experience">
                {resumeData.experience.length > 0 && (
                    <ul className="kn-mb-md">
                        {resumeData.experience.map(xp => (
                            <li key={xp.id} className="kn-flex-between kn-proof-item kn-mb-xs">
                                <span>{xp.role} at {xp.company}</span>
                                <button onClick={() => removeEntry('experience', xp.id)} className="text-small text-muted">Remove</button>
                            </li>
                        ))}
                    </ul>
                )}
                <InputField label="Company" value={expInput.company} onChange={v => setExpInput({ ...expInput, company: v })} />
                <InputField label="Role" value={expInput.role} onChange={v => setExpInput({ ...expInput, role: v })} />
                <InputField label="Duration" value={expInput.duration} onChange={v => setExpInput({ ...expInput, duration: v })} placeholder="e.g. Jan 2020 - Present" />
                <TextAreaField label="Description" value={expInput.description} onChange={v => setExpInput({ ...expInput, description: v })} placeholder="Describe your achievements..." />
                <button onClick={handleAddExperience} className="kn-btn kn-btn--secondary kn-mt-sm">Add Experience</button>
            </BuilderSection>

            {/* Projects */}
            <BuilderSection title="Projects">
                {resumeData.projects.length > 0 && (
                    <ul className="kn-mb-md">
                        {resumeData.projects.map(pj => (
                            <li key={pj.id} className="kn-flex-between kn-proof-item kn-mb-xs">
                                <span>{pj.name}</span>
                                <button onClick={() => removeEntry('projects', pj.id)} className="text-small text-muted">Remove</button>
                            </li>
                        ))}
                    </ul>
                )}
                <InputField label="Project Name" value={projInput.name} onChange={v => setProjInput({ ...projInput, name: v })} />
                <TextAreaField label="Description" value={projInput.description} onChange={v => setProjInput({ ...projInput, description: v })} placeholder="What did you build?" />
                <button onClick={handleAddProject} className="kn-btn kn-btn--secondary kn-mt-sm">Add Project</button>
            </BuilderSection>

        </div>
    );
}
