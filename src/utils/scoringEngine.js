export const calculateScore = (data) => {
    let score = 0;
    const suggestions = [];

    // 1. Personal Info (20 pts)
    if (data.personal.fullName) score += 5;
    if (data.personal.email) score += 5;
    if (data.personal.phone) score += 5;
    if (data.personal.location) score += 5;

    // 2. Summary (10 pts)
    if (data.summary && data.summary.length > 50) {
        score += 10;
    } else if (!data.summary) {
        suggestions.push("Add a professional summary to highlight your goals.");
    } else {
        suggestions.push("Your summary is too short. Aim for 2-3 sentences.");
    }

    // 3. Experience (30 pts)
    if (data.experience.length > 0) {
        score += 10; // Has experience
        const hasDescriptions = data.experience.every(exp => exp.description && exp.description.length > 20);
        if (hasDescriptions) {
            score += 20;
        } else {
            score += 10;
            suggestions.push("Add detailed descriptions to your experience entries.");
        }
    } else {
        suggestions.push("Add work experience to boost your score significantly.");
    }

    // 4. Skills (20 pts)
    if (data.skills && data.skills.length > 10) {
        score += 20;
    } else {
        suggestions.push("List specific technical skills relevant to your role.");
    }

    // 5. Projects (10 pts)
    if (data.projects.length > 0) {
        score += 10;
    } else {
        suggestions.push("Include side projects to demonstrate hands-on ability.");
    }

    // 6. Education (10 pts)
    if (data.education.length > 0) {
        score += 10;
    }

    return {
        score: Math.min(100, score),
        suggestions: suggestions.slice(0, 3)
    };
};
