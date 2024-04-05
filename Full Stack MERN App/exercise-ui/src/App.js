import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import CreatePage from './pages/CreatePage'
import EditPage from './pages/EditPage'
import HomePage from './pages/HomePage'
import Navigation from './components/Navigation'
import {useState} from 'react';

function App() {
  const [exerciseToEdit,setExerciseToEdit] = useState([]);
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Navigation />
          <header><h1>Exercise Tracker</h1></header>
          <p>Create and edit a log of exercises that you have done.</p>
          <Routes>
            <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit}/>}></Route>
            <Route path="/edit" element={<EditPage exerciseToEdit={exerciseToEdit}/>}></Route>
            <Route path="/create" element={ <CreatePage />}></Route>
          </Routes>
        </Router>
      </header>
      <footer><p>© 2024 Brandon Nguyen</p></footer>
    </div>
  );
}

export default App;