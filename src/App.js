import React from 'react';
import{ Route, Routes} from 'react-router-dom';
import{Landing,Exam,Scores} from './exportFile'
import "./app.css";

const App = () => {
  return (
    <div className='App'>
    
        <Routes>
      <Route exact path='/' element={<Landing />} />
      <Route exact path='/exams' element={<Exam />} />

      <Route exact path='/scores' element={<Scores />} />
      </Routes>
      
   
    
  
  
     
    
      
      
    </div>
  )
}

export default App
