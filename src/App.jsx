import { Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/HomePage.jsx';
import AboutUs from './Pages/AboutUs.jsx';

function App() {
  return (
    <>
    {/* <h1>ffgjhcfhgv</h1> */}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutUs />} />

      </Routes>
    </>
  );
}

export default App;
