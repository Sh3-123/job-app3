import React from 'react';
import { useResume } from '../context/ResumeContext';

const ResumePreview = () => {
    const { resumeData, template } = useResume();

    // Template-specific styles
    const getStyles = () => {
        const base = {
            container: {
                backgroundColor: 'white',
                padding: '40px',
                minHeight: '100%',
                color: '#000',
                margin: '0 auto',
                width: '100%',
                maxWidth: '800px',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                lineHeight: '1.4'
            },
            header: { textAlign: 'center', marginBottom: '20px' },
            name: { fontWeight: 'bold', textTransform: 'uppercase' },
            contact: { fontSize: '10pt' },
            section: { marginBottom: '15px' },
            sectionTitle: { fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '10px' },
            entryTitle: { fontWeight: 'bold' },
            entrySubtitle: { fontStyle: 'italic' },
            date: { float: 'right', fontStyle: 'italic' }
        };

        if (template === 'modern') {
            return {
                ...base,
                container: { ...base.container, fontFamily: "'Inter', sans-serif", fontSize: '10pt' },
                name: { ...base.name, fontSize: '28pt', color: '#2c3e50', letterSpacing: '1px' },
                sectionTitle: { ...base.sectionTitle, fontSize: '12pt', color: '#2c3e50', borderBottom: '2px solid #2c3e50' },
                header: { ...base.header, textAlign: 'left', borderBottom: 'none' }
            };
        } else if (template === 'minimal') {
            return {
                ...base,
                container: { ...base.container, fontFamily: "'Courier New', Courier, monospace", fontSize: '10pt' },
                name: { ...base.name, fontSize: '20pt', textAlign: 'left' },
                sectionTitle: { ...base.sectionTitle, fontSize: '11pt', borderBottom: '1px solid #000' },
                header: { ...base.header, textAlign: 'left', paddingBottom: '0', borderBottom: 'none' }
            };
        } else {
            // Classic (Default)
            return {
                ...base,
                container: { ...base.container, fontFamily: "'Times New Roman', Times, serif", fontSize: '11pt' },
                name: { ...base.name, fontSize: '24pt' },
                sectionTitle: { ...base.sectionTitle, fontSize: '12pt', borderBottom: '1px solid #000' },
                header: { ...base.header, borderBottom: '1px solid #000', paddingBottom: '10px' }
            };
        }
    };

    const styles = getStyles();

    return (
        <div className="resume-preview-container" style={styles.container}>
            {/* Header */}
            <header style={styles.header}>
                <div style={styles.name}>{resumeData.personal.fullName || 'YOUR NAME'}</div>
                <div style={styles.contact}>
                    {resumeData.personal.location && <span>{resumeData.personal.location} | </span>}
                    {resumeData.personal.phone && <span>{resumeData.personal.phone} | </span>}
                    {resumeData.personal.email && <span>{resumeData.personal.email}</span>}
                    {resumeData.personal.linkedin && <span> | {resumeData.personal.linkedin}</span>}
                    {resumeData.personal.github && <span> | {resumeData.personal.github}</span>}
                </div>
            </header>

            {/* Summary */}
            {resumeData.summary && (
                <section style={styles.section}>
                    <div style={styles.sectionTitle}>Professional Summary</div>
                    <p>{resumeData.summary}</p>
                </section>
            )}

            {/* Experience */}
            {resumeData.experience.length > 0 && (
                <section style={styles.section}>
                    <div style={styles.sectionTitle}>Experience</div>
                    {resumeData.experience.map(exp => (
                        <div key={exp.id} style={{ marginBottom: '10px' }}>
                            <div style={styles.entryTitle}>
                                {exp.role}
                                <span style={styles.date}>{exp.duration}</span>
                            </div>
                            <div style={styles.entrySubtitle}>{exp.company}</div>
                            <p>{exp.description}</p>
                        </div>
                    ))}
                </section>
            )}

            {/* Projects */}
            {resumeData.projects.length > 0 && (
                <section style={styles.section}>
                    <div style={styles.sectionTitle}>Projects</div>
                    {resumeData.projects.map(proj => (
                        <div key={proj.id} style={{ marginBottom: '10px' }}>
                            <div style={styles.entryTitle}>{proj.name}</div>
                            <p>{proj.description}</p>
                        </div>
                    ))}
                </section>
            )}

            {/* Education */}
            {resumeData.education.length > 0 && (
                <section style={styles.section}>
                    <div style={styles.sectionTitle}>Education</div>
                    {resumeData.education.map(edu => (
                        <div key={edu.id} style={{ marginBottom: '10px' }}>
                            <div style={styles.entryTitle}>
                                {edu.school}
                                <span style={styles.date}>{edu.year}</span>
                            </div>
                            <div style={styles.entrySubtitle}>{edu.degree}</div>
                        </div>
                    ))}
                </section>
            )}

            {/* Skills */}
            {resumeData.skills && (
                <section style={styles.section}>
                    <div style={styles.sectionTitle}>Technical Skills</div>
                    <p>{resumeData.skills}</p>
                </section>
            )}

        </div>
    );
};

export default ResumePreview;
