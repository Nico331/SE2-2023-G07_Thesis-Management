import React, {useState} from "react";



// @ts-ignore
const MessageText = ({ text }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const collapsedStyle = {
        display: '-webkit-box',
        WebkitLineClamp: 5,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        // cursor: 'pointer',
        whiteSpace: 'pre-wrap',
        // marginBottom: '1em',
    };

    const handleTextClick = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div
            tabIndex="0"
            style={isExpanded ? { whiteSpace: 'pre-wrap' } : collapsedStyle}
            onClick={handleTextClick}
            onKeyDown={(event) => {
                if (event.key === 'Enter') {
                    handleTextClick();
                }
            }}
        >
            {text}
        </div>
    );
};

export default MessageText
