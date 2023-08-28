import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Auth from './components/authentication';
import Notespage from './components/notespage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element= {<Auth />}/>
    <Route path='/notespage' element= {<Notespage />}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
