import {useState} from 'react'

export default function JsIde() {
    const [text, setText] = useState('write js here');
    const [srcDoc, setSrcDoc] = useState('');

    function handleChange(e) {
        setText(e.target.value);
    }
    return (
        <div className="ide">
            <textarea value={text} onChange={handleChange} />
            <button onClick={() => setText('write js here')}>
                Reset
            </button>
            
            <button onClick={() => setSrcDoc(
                `
                <html>
                    <body>
                        <h1>Hello 5S</h1>
                        <script>${text}</script>
                    </body>
                    
                </html>
                            `
            )}>Run</button>

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