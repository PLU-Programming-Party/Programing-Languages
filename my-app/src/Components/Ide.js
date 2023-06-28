import {useState} from 'react'
export default function JsIde() {
    const [text, setText] = useState('write js here');
    
    const srcDoc = 
    `
    <html>
        <body>
            <h1>Hello 5S</h1>
            <script>${text}</script>
        </body>
        
    </html>
    `

    function handleChange(e) {
        setText(e.target.value);
    }

    return (
        <div className="ide">
            <textarea value={text} onChange={handleChange} />
            <button onClick={() => setText('write js here')}>
                Reset
            </button>

            <div className="output">
                <iframe
                sandbox="allow-scripts"
                srcDoc={srcDoc}
                title="output"
                />
            </div>
        </div>
    );
}