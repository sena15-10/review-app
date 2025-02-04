import React, { useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css';

const CodeBlock = ({ code }) => {
    const codeRef = useRef(null);

    useEffect(() => {
        if (codeRef.current) {
            hljs.highlightElement(codeRef.current);
        }
    }, [code]);

    return (
        <div className='codeField'>
            <pre>
                <code ref={codeRef} className="javascript">
                    {code.trim()}
                </code>
            </pre>
        </div>
    );
};

export default CodeBlock;