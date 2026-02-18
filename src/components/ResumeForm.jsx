import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import TagInput from './TagInput';
import ScorePanel from './ScorePanel';
import { checkBullet } from '../utils/bulletAnalyzer';

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

const InputField = ({ label, value, onChange, placeholder, type = 'text', maxLength }) => (
    <div className="kn-form-group">
        <label className="kn-form-label">{label}</label>
        <input
            type={type}
            className="kn-input"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            maxLength={maxLength}
        />
    </div>
);

const TextAreaField = ({ label, value, onChange, placeholder, maxLength }) => (
    <div className="kn-form-group">
        <div className="kn-flex-between">
            <label className="kn-form-label">{label}</label>
            {maxLength && (
                <span className="text-small text-muted">{value?.length || 0}/{maxLength}</span>
            )}
        </div>
        <textarea
            className="kn-textarea"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            maxLength={maxLength}
        />
    </div>
);

const Suggestion = ({ text }) => {
    if (!text) return null;
    const suggestions = checkBullet(text);
    if (!suggestions || suggestions.length === 0) return null;

    return (
        <div className="kn-mt-xs text-small" style={{ color: 'var(--color-warning)' }}>
            💡 {suggestions.join(" ")}
        </div>
    );
};

export default function ResumeForm() {
    const { resumeData, updatePersonal, updateSection, updateSkills, addEntry, removeEntry, loadSampleData, clearData, template, setTemplate } = useResume();
    const [eduInput, setEduInput] = useState({ school: '', degree: '', year: '' });
    const [expInput, setExpInput] = useState({ company: '', role: '', duration: '', description: '' });

    // Project Input State including techStack
    const [projInput, setProjInput] = useState({ name: '', description: '', liveUrl: '', githubUrl: '', techStack: [] });

    // Skills Suggestion State
    const [isSuggesting, setIsSuggesting] = useState(false);

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
            setProjInput({ name: '', description: '', liveUrl: '', githubUrl: '', techStack: [] });
        }
    };

    const handleSuggestSkills = () => {
        setIsSuggesting(true);
        setTimeout(() => {
            const suggestions = {
                technical: ["TypeScript", "React", "Node.js", "PostgreSQL", "GraphQL"],
                soft: ["Team Leadership", "Problem Solving"],
                tools: ["Git", "Docker", "AWS"]
            };

            // Merge unique skills
            const merge = (current, incoming) => [...new Set([...current, ...incoming])];

            updateSkills('technical', merge(resumeData.skills.technical || [], suggestions.technical));
            updateSkills('soft', merge(resumeData.skills.soft || [], suggestions.soft));
            updateSkills('tools', merge(resumeData.skills.tools || [], suggestions.tools));

            setIsSuggesting(false);
        }, 1000);
    };

    return (
        <div className="builder-form">
            <ScorePanel />

            <div className="kn-card kn-mb-md">
                <h3 className="kn-card__title">Choose Template</h3>
                <div className="kn-btn-group" style={{ marginTop: '10px' }}>
                    {['classic', 'modern', 'minimal'].map(t => (
                        <button
                            key={t}
                            onClick={() => setTemplate(t)}
                            className={`kn-btn ${template === t ? 'kn-btn--primary' : 'kn-btn--secondary'}`}
                            style={{ textTransform: 'capitalize' }}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

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

            {/* Skills Accordion Style */}
            <BuilderSection title="Skills & Expertise">
                <div className="kn-mb-md">
                    <button
                        onClick={handleSuggestSkills}
                        className="kn-btn kn-btn--secondary kn-btn--sm"
                        disabled={isSuggesting}
                    >
                        {isSuggesting ? 'Optimizing...' : '✨ Suggest Skills'}
                    </button>
                </div>

                <div className="kn-form-group">
                    <label className="kn-form-label">Technical Skills ({resumeData.skills.technical?.length || 0})</label>
                    <TagInput
                        tags={resumeData.skills.technical || []}
                        onAdd={(tag) => updateSkills('technical', [...(resumeData.skills.technical || []), tag])}
                        onRemove={(tag) => updateSkills('technical', (resumeData.skills.technical || []).filter(t => t !== tag))}
                        placeholder="Type skill & press Enter..."
                    />
                </div>

                <div className="kn-form-group">
                    <label className="kn-form-label">Soft Skills ({resumeData.skills.soft?.length || 0})</label>
                    <TagInput
                        tags={resumeData.skills.soft || []}
                        onAdd={(tag) => updateSkills('soft', [...(resumeData.skills.soft || []), tag])}
                        onRemove={(tag) => updateSkills('soft', (resumeData.skills.soft || []).filter(t => t !== tag))}
                        placeholder="Type skill & press Enter..."
                    />
                </div>

                <div className="kn-form-group">
                    <label className="kn-form-label">Tools & Technologies ({resumeData.skills.tools?.length || 0})</label>
                    <TagInput
                        tags={resumeData.skills.tools || []}
                        onAdd={(tag) => updateSkills('tools', [...(resumeData.skills.tools || []), tag])}
                        onRemove={(tag) => updateSkills('tools', (resumeData.skills.tools || []).filter(t => t !== tag))}
                        placeholder="Type skill & press Enter..."
                    />
                </div>
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
                <Suggestion text={expInput.description} />
                <button onClick={handleAddExperience} className="kn-btn kn-btn--secondary kn-mt-sm">Add Experience</button>
            </BuilderSection>

            {/* Projects - Accordion Style */}
            <BuilderSection title="Projects">
                <div className="kn-mb-md">
                    {resumeData.projects.map(pj => (
                        <div key={pj.id} className="kn-card kn-mb-sm" style={{ borderLeft: '4px solid var(--color-accent)' }}>
                            <div className="kn-flex-between">
                                <span style={{ fontWeight: 600 }}>{pj.name}</span>
                                <button onClick={() => removeEntry('projects', pj.id)} className="text-small text-muted kn-btn--secondary" style={{ border: 'none' }}>🗑️</button>
                            </div>
                            <div className="text-small text-muted kn-mt-xs">
                                {pj.description?.substring(0, 50)}...
                            </div>
                        </div>
                    ))}
                </div>

                <div className="kn-panel-section" style={{ background: '#fcfcfc' }}>
                    <h4 className="kn-text-base" style={{ fontWeight: 600, marginBottom: '10px' }}>Add New Project</h4>
                    <InputField
                        label="Project Title"
                        value={projInput.name}
                        onChange={v => setProjInput({ ...projInput, name: v })}
                        placeholder="e.g. AI Content Generator"
                    />

                    <TextAreaField
                        label="Description"
                        value={projInput.description}
                        onChange={v => setProjInput({ ...projInput, description: v })}
                        placeholder="What problem did you solve?"
                        maxLength={200}
                    />
                    <Suggestion text={projInput.description} />

                    <div className="kn-form-group">
                        <label className="kn-form-label">Tech Stack</label>
                        <TagInput
                            tags={projInput.techStack}
                            onAdd={(tag) => setProjInput(prev => ({ ...prev, techStack: [...prev.techStack, tag] }))}
                            onRemove={(tag) => setProjInput(prev => ({ ...prev, techStack: prev.techStack.filter(t => t !== tag) }))}
                            placeholder="Add tech (e.g. React)..."
                        />
                    </div>

                    <div className="kn-grid-2">
                        <InputField label="Live URL" value={projInput.liveUrl} onChange={v => setProjInput({ ...projInput, liveUrl: v })} placeholder="https://..." />
                        <InputField label="GitHub URL" value={projInput.githubUrl} onChange={v => setProjInput({ ...projInput, githubUrl: v })} placeholder="https://github.com/..." />
                    </div>

                    <button onClick={handleAddProject} className="kn-btn kn-btn--secondary kn-mt-sm kn-btn--full">Add Project</button>
                </div>
            </BuilderSection>

        </div>
    );
}
