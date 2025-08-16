import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { useState } from 'react';
import Intro from './screens/Intro';
import Main from './screens/Main';
import SquadDetailScreen from './screens/SquadDetailScreen';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/main" element={<Main />} />
        <Route path="/squad/:teamName" element={<SquadDetailScreen />} />
      </Routes>
    </Router>
  );
}

export default App;