export const generatePlainText = (data) => {
    let text = "";

    // Name
    if (data.personal.fullName) text += `${data.personal.fullName.toUpperCase()}\n`;

    // Contact
    const contactParts = [];
    if (data.personal.location) contactParts.push(data.personal.location);
    if (data.personal.phone) contactParts.push(data.personal.phone);
    if (data.personal.email) contactParts.push(data.personal.email);
    if (data.personal.linkedin) contactParts.push(data.personal.linkedin);
    if (data.personal.github) contactParts.push(data.personal.github);

    if (contactParts.length > 0) text += `${contactParts.join(" | ")}\n\n`;

    // Summary
    if (data.summary) {
        text += "PROFESSIONAL SUMMARY\n";
        text += "--------------------\n";
        text += `${data.summary}\n\n`;
    }

    // Work Experience
    if (data.experience.length > 0) {
        text += "EXPERIENCE\n";
        text += "----------\n";
        data.experience.forEach(exp => {
            text += `${exp.role} at ${exp.company}`;
            if (exp.duration) text += ` (${exp.duration})`;
            text += "\n";
            if (exp.description) text += `${exp.description}\n`;
            text += "\n";
        });
    }

    // Projects
    if (data.projects.length > 0) {
        text += "PROJECTS\n";
        text += "--------\n";
        data.projects.forEach(proj => {
            text += `${proj.name}\n`;
            if (proj.description) text += `${proj.description}\n`;
            text += "\n";
        });
    }

    // Education
    if (data.education.length > 0) {
        text += "EDUCATION\n";
        text += "---------\n";
        data.education.forEach(edu => {
            text += `${edu.school} - ${edu.degree}`;
            if (edu.year) text += ` (${edu.year})`;
            text += "\n";
        });
        text += "\n";
    }

    // Skills
    if (data.skills) {
        text += "SKILLS\n";
        text += "------\n";
        text += `${data.skills}\n`;
    }

    return text;
};
