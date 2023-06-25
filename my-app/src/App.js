import './App.css';
import Input from './Input'
import Output from './Output'

function App() {
  const srcDoc = //what the output will be displaying
    `
    <html>
      <body>
        <h1>testing</h1>
      </body>
    </html>
    `;

  return (
    <div className="App">
        <div className="ide">
          <Input/>
          <Output srcDoc={srcDoc}/>
        </div>
        
    </div>
  );
}

export default App;
