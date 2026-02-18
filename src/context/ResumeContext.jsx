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
            description: 'A real-time analytics dashboard for online retailers built with Next.js and Tailwind CSS.'
        }
    ],
    skills: 'JavaScript, React, Node.js, TypeScript, CSS3, HTML5, Git, Agile'
};

const INITIAL_STATE = {
    personal: { fullName: '', email: '', phone: '', location: '', github: '', linkedin: '' },
    summary: '',
    education: [],
    experience: [],
    projects: [],
    skills: ''
};

export function ResumeProvider({ children }) {
    const [resumeData, setResumeData] = useState(() => {
        const saved = localStorage.getItem('ai_resume_data');
        return saved ? JSON.parse(saved) : INITIAL_STATE;
    });

    useEffect(() => {
        localStorage.setItem('ai_resume_data', JSON.stringify(resumeData));
    }, [resumeData]);

    const updatePersonal = (field, value) => {
        setResumeData(prev => ({
            ...prev,
            personal: { ...prev.personal, [field]: value }
        }));
    };

    const updateSection = (section, value) => {
        setResumeData(prev => ({ ...prev, [section]: value }));
    };

    const addEntry = (section, entry) => {
        setResumeData(prev => ({
            ...prev,
            [section]: [...prev[section], { ...entry, id: Date.now() }]
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

    return (
        <ResumeContext.Provider value={{
            resumeData,
            updatePersonal,
            updateSection,
            addEntry,
            removeEntry,
            loadSampleData
        }}>
            {children}
        </ResumeContext.Provider>
    );
}

export const useResume = () => useContext(ResumeContext);
