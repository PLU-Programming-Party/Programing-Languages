import {useState} from 'react'

export default function JsIde() {
    const [js, setJs] = useState('console.log("hello")');
    const [html, setHtml] = useState('<h1>Hello 5S</h1>');
    const [css, setCss] = useState('h1{color:red}')
    const [srcDoc, setSrcDoc] = useState(''); //srcDoc is the html code the user will manipulate
    const [forceUpdate, setForceUpdate] = useState(0);
    
    function clear () {
        setJs('');
        setCss('');
        setHtml('');
    }
    function openTab(evt, tabName) {
        console.log('works!');
        // Declare all variables
        var i, tabcontent, tablinks;
        // Get all elements with class="tabcontent" and hide them
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
         }

      // Get all elements with class="tabcontent" and hide them
      //tabcontent = document.getElementsByClassName("tabcontent");

      // Get all elements with class="tablinks" and remove the class "active"
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
      // Show the current tab, and add an "active" class to the button that opened the tab
      document.getElementById(tabName).style.display = "block";
      evt.currentTarget.className += " active";
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
            <div className="tabs">
                <button className="tablinks" onClick={event => openTab(event, 'js')} id="defaultOpen">js</button>
                <button className="tablinks"  onClick={event => openTab(event, 'html')}>html</button>
                <button className="tablinks"  onClick={event => openTab(event, 'css')}>css</button>
            </div> 
            <div id="js" className="tabcontent">
                <textarea value={js} onChange={handleJs} />

            </div>
            <div id="html" className="tabcontent">
                <textarea value={html} onChange={handleHtml} />

            </div>
            <div id="css" className="tabcontent">
                <textarea value={css} onChange={handleCss} />
            </div>
            
            <button onClick={clear}>
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