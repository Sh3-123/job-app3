import React, { useContext } from 'react';
import { useResume } from '../context/ResumeContext';

const ResumePreview = () => {
    const { resumeData } = useResume();

    // Basic styling for the resume layout
    const styles = {
        container: {
            backgroundColor: 'white',
            padding: '40px',
            minHeight: '100%',
            color: '#000',
            fontFamily: "'Times New Roman', Times, serif", // Fallback or imported serif
            fontSize: '11pt',
            lineHeight: '1.4',
            margin: '0 auto',
            width: '100%',
            maxWidth: '800px',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)'
        },
        header: {
            textAlign: 'center',
            borderBottom: '1px solid #000',
            paddingBottom: '10px',
            marginBottom: '20px'
        },
        name: {
            fontSize: '24pt',
            fontWeight: 'bold',
            marginBottom: '5px',
            textTransform: 'uppercase'
        },
        contact: {
            fontSize: '10pt',
            fontStyle: 'italic'
        },
        section: {
            marginBottom: '15px'
        },
        sectionTitle: {
            fontSize: '12pt',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            borderBottom: '1px solid #000',
            marginBottom: '10px',
            marginTop: '10px'
        },
        entryTitle: {
            fontWeight: 'bold'
        },
        entrySubtitle: {
            fontStyle: 'italic'
        },
        date: {
            float: 'right',
            fontStyle: 'italic'
        },
        list: {
            paddingLeft: '20px',
            marginTop: '5px'
        }
    };

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
                        <div key={exp.id} >
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
                        <div key={proj.id} >
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
                        <div key={edu.id} >
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
