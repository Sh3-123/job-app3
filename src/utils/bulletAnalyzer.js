// Bullet Analysis Helpers

export const ACTION_VERBS = [
    'built', 'developed', 'designed', 'implemented', 'led', 'improved',
    'created', 'optimized', 'automated', 'managed', 'engineered',
    'architected', 'reduced', 'increased', 'generated', 'initiated',
    'collaborated', 'delivered', 'launched', 'scale'
];

export const checkBullet = (text) => {
    if (!text) return null;
    const lower = text.trim().toLowerCase();

    // 1. Action Verb Check
    const firstWord = lower.split(' ')[0];
    const hasActionVerb = ACTION_VERBS.some(verb => firstWord.includes(verb));

    // 2. Metric Check
    const hasMetric = /\d+|%|\$|k\b/i.test(lower);

    const suggestions = [];
    if (!hasActionVerb) suggestions.push("Start with a strong action verb.");
    if (!hasMetric) suggestions.push("Add measurable impact (numbers).");

    return suggestions;
};
