import React, { useState, useEffect } from 'react';
import { auth } from './Services/FirebaseConfig'
import NavBar from './Components/NavBar';
import NoMatch from './Pages/NoMatch';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home'
import Dashboard from './Pages/Dashboard'
import Lesson from './Pages/Lesson';
import UserContext from './Services/UserContext';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);


  return (
    <>
    <UserContext.Provider value={user}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/lesson/:topic" element={<Lesson />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
    </UserContext.Provider>
    </>
  );
}

export default App;
