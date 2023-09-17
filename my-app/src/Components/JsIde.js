import {useState, useEffect} from 'react'
import { Box, Tabs, Tab, Button } from '@mui/material';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-monokai";

import "ace-builds/src-noconflict/ext-language_tools";
import ace from 'ace-builds';
ace.config.set('workerPath', 'boguspath');

export default function JsIde() {
    //gets stored code 
    const storedJs = JSON.parse(localStorage.getItem('js'));
    const storedHtml = JSON.parse(localStorage.getItem('html'));
    const storedCss = JSON.parse(localStorage.getItem('css'));
    //default values is the stored state
    const [activeTab, setActiveTab] = useState(1); // 0 for js, 1 for html, 2 for css
    const [js, setJs] = useState(storedJs);
    const [html, setHtml] = useState(storedHtml);
    const [css, setCss] = useState(storedCss);
    const [srcDoc, setSrcDoc] = useState(''); //srcDoc is the  code the user will manipulate
    const [forceUpdate, setForceUpdate] = useState(0);
    

    function clear () {
        switch(activeTab) {
            case 0: 
                setJs('');
                break;
            case 1: 
                setHtml('');
                break;
            case 2: 
                setCss('');
                break;
            default:
        }
    }
    
   
    

    function handleJs(value) {
        setJs(value);
    }
    
    function handleHtml(value) {
        setHtml(value);
    }

    function handleCss(value) {
        setCss(value);
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
    
    //stores code 
    useEffect(() => {
        localStorage.setItem('js', JSON.stringify(js));
        localStorage.setItem('html', JSON.stringify(html));
        localStorage.setItem('css', JSON.stringify(css));
    }, [js, html, css]);

    return (
        <Box sx={{
            width: "50%",
            height: "100vh",
            overflowY: "auto",
            overflowX: "hidden",  // Ensure no horizontal scrolling
            gap: "2",
            borderRight: "1px solid gray",
            padding: "0 20px" // Add some padding to ensure content doesn't touch the edges
        }}> 
            <Box sx={{
                display: "flex",
                justifyContent: "space-between"
            }}>
                <Tabs 
                value={activeTab} 
                onChange={(event, newValue) => setActiveTab(newValue)}
                sx={{
                    '& .MuiTabs-indicator': {
                        backgroundColor: 'primary.light', // Color of the underline
                    }
                }}
                >
                    <Tab label="javascript" sx={{ 
                        color: 'primary.light',
                        '&.Mui-selected': {
                            color: 'primary.dark' // Change this to your desired color for the active tab
                        }
                    }} />
                    <Tab label="html" sx={{ 
                        color: 'primary.light',
                        '&.Mui-selected': {
                            color: 'primary.dark' // Change this to your desired color for the active tab
                        }
                    }} />
                    <Tab label="css" sx={{ 
                        color: 'primary.light',
                        '&.Mui-selected': {
                            color: 'primary.dark' // Change this to your desired color for the active tab
                        }
                    }} />
                </Tabs>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    padding: 1
                }}>
                    <Button variant="outlined" onClick={clear} color="light">Clear</Button>
                    <Button variant='contained' onClick={rerenderSrcDoc}  color="success">Run</Button>

                </Box>
            </Box>
            

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box hidden={activeTab !== 0}>
                <AceEditor
                    mode="javascript"
                    theme="monokai"
                    onChange={handleJs}
                    value={js}
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{ $blockScrolling: true }}
                    setOptions={{
                        useWorker: false
                    }}
                    fontSize={14}
                    style={{
                        width: "100%"
                    }}
                />
                </Box>
                <Box hidden={activeTab !== 1}>
                <AceEditor
                    mode="html"
                    theme="monokai"
                    onChange={handleHtml}
                    value={html}
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{ $blockScrolling: true }}
                    setOptions={{
                        useWorker: false
                    }}
                    fontSize={14}
                    style={{
                        width: "100%"
                    }}
                />
                </Box>
                <Box hidden={activeTab !== 2}>
                    <AceEditor
                        mode="css"
                        theme="monokai"
                        onChange={handleCss}
                        value={css}
                        name="UNIQUE_ID_OF_DIV"
                        editorProps={{ $blockScrolling: true }}
                        setOptions={{
                            useWorker: false
                        }}
                        fontSize={14}
                        style={{
                            width: "100%"
                        }}
                    />
                </Box>
            </Box>
            <Box sx={{
                width: "100%",
                border: "1px solid",
                marginTop: 2,
                bgcolor: "primary.light",
            }}>
                <iframe
                key={forceUpdate} //makes it so the iframe "changes" for a rerender 
                sandbox="allow-scripts"
                srcDoc={srcDoc}
                title="output"
                style={{ width: '100%', height: '280px', border: 'none' }}
                />
            </Box>
        </Box>
        
    );
}