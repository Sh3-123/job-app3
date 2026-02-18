import React, { useState } from 'react';

const TagInput = ({ tags = [], onAdd, onRemove, placeholder }) => {
    const [input, setInput] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const val = input.trim();
            if (val && !tags.includes(val)) {
                onAdd(val);
                setInput('');
            }
        }
    };

    return (
        <div className="kn-tag-input-container" style={{
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--border-radius)',
            padding: '8px',
            background: 'var(--color-surface)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            alignItems: 'center'
        }}>
            {tags.map((tag, i) => (
                <span key={i} className="kn-badge kn-badge--default" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {tag}
                    <button
                        onClick={() => onRemove(tag)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: '12px', lineHeight: 1 }}
                    >
                        ✕
                    </button>
                </span>
            ))}
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={tags.length === 0 ? placeholder : ''}
                style={{
                    border: 'none',
                    outline: 'none',
                    flex: 1,
                    minWidth: '120px',
                    fontFamily: 'inherit',
                    fontSize: 'var(--text-base)'
                }}
            />
        </div>
    );
};

export default TagInput;
