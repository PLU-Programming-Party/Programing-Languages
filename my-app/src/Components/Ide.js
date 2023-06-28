import {useState} from 'react'

export default function JsIde() {
    const [text, setText] = useState('write js here');
    const [srcDoc, setSrcDoc] = useState(''); //srcDoc is the html code the user will manipulate
    const [forceUpdate, setForceUpdate] = useState(0);

    function handleChange(e) {
        setText(e.target.value);
    }

    function rerenderSrcDoc() {
        setSrcDoc(
            `
            <html>
                <body>
                    <h1>Hello 5S</h1>
                    <script>${text}</script>
                </body>
                
            </html>
                        `
        );
        setForceUpdate(forceUpdate + 1); 
    }
    return (
        <div className="ide">
            <textarea value={text} onChange={handleChange} />
            <button onClick={() => setText('write js here')}>
                Reset
            </button>
            
            <button onClick={rerenderSrcDoc}>Run</button>

            <div className="output">
                <iframe
                key={forceUpdate} //makes it so the iframe "changes" for a rerender 
                sandbox="allow-scripts"
                srcDoc={srcDoc}
                title="output"
                />
            </div>
        </div>
    );
}