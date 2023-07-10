import {useState} from 'react'
import '../styles/Ide.css';

export default function JsIde() {
    //default values for the IDE's
    const [js, setJs] = useState('console.log("hello")');
    const [html, setHtml] = useState('<h1>Hello 5S</h1>');
    const [css, setCss] = useState('h1{color:red}')
    const [srcDoc, setSrcDoc] = useState(''); //srcDoc is the  code the user will manipulate
    const [forceUpdate, setForceUpdate] = useState(0);
    


    function clear () {
        setJs('');
        setCss('');
        setHtml('');
    }
    
    /**
     * Shows a singular tab 
     * first deactivates and hides all tabs and then activates the one target tab
     * @param event: click event object that triggered openTab
     * @param tabName: the name of tab being opened
     */
    function openTab(event, tabName) {
        let tabcontent, tablinks;

        // Get all elements with class="tabcontent" and hide them
        tabcontent = document.getElementsByClassName("tabcontent");
        for (let i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
         }

        // Resets all buttons by removing active class 
        tablinks = document.getElementsByClassName("tablinks");
        for (let i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        // Shows the current tab, and add an "active" class to that button tab
        document.getElementById(tabName).style.display = "block";
        event.currentTarget.className += " active";
    }

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
            <div className="ideTitle">Choose a tab below</div>
            <div className="inputArea">
                <div className="tabs">
                    <button className="tablinks" onClick={event => openTab(event, 'js')} id="defaultOpen">js</button>
                    <button className="tablinks"  onClick={event => openTab(event, 'html')}>html</button>
                    <button className="tablinks"  onClick={event => openTab(event, 'css')}>css</button>
                </div> 

                <div className="tabBox">
                
                    <div id="js" className="tabcontent">
                        <textarea value={js} onChange={handleJs} />
                    </div>
                    <div id="html" className="tabcontent">
                        <textarea value={html} onChange={handleHtml} />

                    </div>
                    <div id="css" className="tabcontent">
                        <textarea value={css} onChange={handleCss} />
                    </div>
                </div>
            </div>
            
            <div className = "IdeButtons">
                <button id="clear" onClick={clear}>Clear</button>
                <button id="run" onClick={rerenderSrcDoc}>Run</button>
            </div>

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