import './styles/App.css';
import NavBar from './Components/NavBar';
import NoMatch from './Pages/NoMatch';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home'
import StudyPlan from './Pages/StudyPlan'

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/studyplan" element={<StudyPlan />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
    /*
    <div className="App">
        <div className="ide">
          <Input/>
        </div>
        
    </div>
    */
  );
}

export default App;
