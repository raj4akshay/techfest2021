import React from 'react';

// import CaPortal from './Pages/Caportal';
import Navbar from './components/header/Navbar';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Home/>
      {/* <CaPortal/> */}
      <Footer/>
    </div>
  );
}

export default App;
