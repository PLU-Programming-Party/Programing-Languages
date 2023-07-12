import {useState, useEffect} from 'react'
import '../styles/Ide.css';

export default function JsIde() {
    //gets stored code 
    const storedJs = JSON.parse(localStorage.getItem('js'));
    const storedHtml = JSON.parse(localStorage.getItem('html'));
    const storedCss = JSON.parse(localStorage.getItem('css'));
    //default values is the stored state
    const [js, setJs] = useState(storedJs);
    const [html, setHtml] = useState(storedHtml);
    const [css, setCss] = useState(storedCss);
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
    function openTab(tabName) {
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
        document.getElementById(tabName+"button").className += " active";
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

    //defaults to js tab on load 
    useEffect(() => {
        document.getElementById('jsbutton').click();
      }, []);
    
    //stores code 
    useEffect(() => {
        localStorage.setItem('js', JSON.stringify(js));
        localStorage.setItem('html', JSON.stringify(html));
        localStorage.setItem('css', JSON.stringify(css));
    }, [js, html, css]);

    return (
        <div className="ide">
            <div className="ideTitle">Choose a tab below</div>
            <div className="inputArea">
                <div className="tabs">
                    <button className="tablinks" onClick={() => openTab('js')} id="jsbutton">js</button>
                    <button className="tablinks"  onClick={() => openTab('html')} id="htmlbutton">html</button>
                    <button className="tablinks"  onClick={() => openTab('css')} id="cssbutton">css</button>
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