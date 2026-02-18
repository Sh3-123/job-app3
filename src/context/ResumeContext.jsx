import React, { createContext, useContext, useState, useEffect } from 'react';

const ResumeContext = createContext();

const SAMPLE_DATA = {
    personal: {
        fullName: 'Alex Morgan',
        email: 'alex.morgan@example.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        github: 'github.com/alexmorgan',
        linkedin: 'linkedin.com/in/alexmorgan'
    },
    summary: 'Creative and detail-oriented Full Stack Developer with 5+ years of experience in building scalable web applications. Passionate about UI/UX and writing clean, maintainable code.',
    education: [
        {
            id: 1,
            school: 'University of Technology',
            degree: 'B.S. Computer Science',
            year: '2018'
        }
    ],
    experience: [
        {
            id: 1,
            company: 'Tech Solutions Inc.',
            role: 'Senior Frontend Engineer',
            duration: '2020 - Present',
            description: 'Led a team of 5 developers to rebuild the core product using React and TypeScript. Improved performance by 40%.'
        },
        {
            id: 2,
            company: 'WebCraft Agency',
            role: 'Web Developer',
            duration: '2018 - 2020',
            description: 'Developed responsive websites for diverse clients using HTML, CSS, and JavaScript. Collaborated closely with designers.'
        }
    ],
    projects: [
        {
            id: 1,
            name: 'E-commerce Dashboard',
            description: 'A real-time analytics dashboard for online retailers built with Next.js and Tailwind CSS.',
            techStack: ['Next.js', 'Tailwind', 'Redux'],
            liveUrl: 'https://demo-dashboard.com',
            githubUrl: 'https://github.com/alex/dashboard'
        }
    ],
    skills: {
        technical: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'CSS3', 'HTML5'],
        soft: ['Team Leadership', 'Agile', 'Mentoring'],
        tools: ['Git', 'Jira', 'Figma']
    }
};

const INITIAL_STATE = {
    personal: { fullName: '', email: '', phone: '', location: '', github: '', linkedin: '' },
    summary: '',
    education: [],
    experience: [],
    projects: [],
    skills: { technical: [], soft: [], tools: [] }
};

export function ResumeProvider({ children }) {
    const [resumeData, setResumeData] = useState(() => {
        try {
            const saved = localStorage.getItem('ai_resume_data');
            // Migration logic for old skills string format
            if (saved) {
                const parsed = JSON.parse(saved);
                if (typeof parsed.skills === 'string') {
                    parsed.skills = { technical: parsed.skills.split(',').map(s => s.trim()).filter(Boolean), soft: [], tools: [] };
                }
                // Migration logic for old projects format
                if (parsed.projects && parsed.projects.length > 0 && !parsed.projects[0].techStack) {
                    parsed.projects = parsed.projects.map(p => ({ ...p, techStack: [], liveUrl: '', githubUrl: '' }));
                }
                return parsed;
            }
            return INITIAL_STATE;
        } catch (e) {
            console.error("Failed to load resume data", e);
            return INITIAL_STATE;
        }
    });

    const [template, setTemplate] = useState(() => {
        return localStorage.getItem('ai_resume_template') || 'classic';
    });

    useEffect(() => {
        try {
            localStorage.setItem('ai_resume_data', JSON.stringify(resumeData));
        } catch (e) {
            console.error("Failed to save resume data", e);
        }
    }, [resumeData]);

    useEffect(() => {
        localStorage.setItem('ai_resume_template', template);
    }, [template]);

    const updatePersonal = (field, value) => {
        setResumeData(prev => ({
            ...prev,
            personal: { ...prev.personal, [field]: value }
        }));
    };

    const updateSection = (section, value) => {
        setResumeData(prev => ({ ...prev, [section]: value }));
    };

    // New: Specific updater for nested skills
    const updateSkills = (category, value) => {
        setResumeData(prev => ({
            ...prev,
            skills: { ...prev.skills, [category]: value }
        }));
    };

    const addEntry = (section, entry) => {
        setResumeData(prev => ({
            ...prev,
            [section]: [...prev[section], { ...entry, id: Date.now() }]
        }));
    };

    const updateEntry = (section, id, field, value) => {
        setResumeData(prev => ({
            ...prev,
            [section]: prev[section].map(item => item.id === id ? { ...item, [field]: value } : item)
        }));
    };

    const removeEntry = (section, id) => {
        setResumeData(prev => ({
            ...prev,
            [section]: prev[section].filter(item => item.id !== id)
        }));
    };

    const loadSampleData = () => {
        setResumeData(SAMPLE_DATA);
    };

    const clearData = () => {
        setResumeData(INITIAL_STATE);
    };

    return (
        <ResumeContext.Provider value={{
            resumeData,
            updatePersonal,
            updateSection,
            updateSkills,
            updateEntry,
            addEntry,
            removeEntry,
            loadSampleData,
            clearData,
            template,
            setTemplate
        }}>
            {children}
        </ResumeContext.Provider>
    );
}

export const useResume = () => useContext(ResumeContext);
