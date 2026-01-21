import { Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/HomePage.jsx';
import AboutUs from './Pages/AboutUs.jsx';
import NotFound from './Pages/NotFound.jsx';
import Signup from './Pages/Signup.jsx';

function App() {
  return (
    <>
    {/* <h1>ffgjhcfhgv</h1> */}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/signup' element={<Signup />} />



      </Routes>
    </>
  );
}

export default App;
