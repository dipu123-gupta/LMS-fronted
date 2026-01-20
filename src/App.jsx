import { Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/HomePage.jsx';

function App() {
  return (
    <>
    {/* <h1>ffgjhcfhgv</h1> */}
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
