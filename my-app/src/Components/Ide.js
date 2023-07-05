import {useState} from 'react'

export default function JsIde() {
    const [js, setJs] = useState('console.log("hello")');
    const [html, setHtml] = useState('<h1>Hello 5S</h1>');
    const [css, setCss] = useState('h1{color:red}')
    const [srcDoc, setSrcDoc] = useState(''); //srcDoc is the html code the user will manipulate
    const [forceUpdate, setForceUpdate] = useState(0);

    function handleJs(e) {
        setJs(e.target.value);
    }
    
    function handleHtml(e) {
        setHtml(e.target.value);
    }

    function handleCss(e) {
        setCss(e.target.value);
    }

    function rerenderSrcDoc() {
        setSrcDoc(
            `
            <html>
                <body>
                    ${html}
                    <script>${js}</script>
                    <style>${css}</style>
                </body>
                
            </html>
                        `
        );
        setForceUpdate(forceUpdate + 1); 
    }
    return (
        <div className="ide">
            <div className="tabs">
                <button class="tablinks">js</button>
                <button class="tablinks">html</button>
                <button class="tablinks">css</button>
            </div>
            <textarea value={js} onChange={handleJs} />
            <button onClick={() => setJs('')}>
                Clear
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