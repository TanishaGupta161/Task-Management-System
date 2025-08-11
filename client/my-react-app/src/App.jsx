import React from 'react'
import './App.css'
import Home from './pages/Home'
import AllTask from './pages/AllTask'
import ImportantTask from './pages/ImportantTask'
import CompletedTask from './pages/CompletedTask'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import InCompletedTask from './pages/InCompletedTask'
function App() {

  return (
    <>
    <div className='bg-gray-900 text-white h-screen p-2'>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home/>}>
          <Route index  element={<AllTask/>}/>
          <Route path='/importantTask'  element={<ImportantTask/>}/>
          <Route path='/completedTask'  element={<CompletedTask/>}/>
          <Route path='/inCompletedTask'  element={<InCompletedTask/>}/>
          </Route>
         </Routes>
      </Router>
    </div>
    </>
  )
}

export default App


