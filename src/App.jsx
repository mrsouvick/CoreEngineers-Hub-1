import React, { useState } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Notes from './pages/Notes';
import About from './pages/About';
import Contact from './pages/Contact';

// Popup Component
import PopupImage from './components/PopupImage';

// Your actual image inside public/assets/
const POPUP_IMAGE_PATH = "/assets/pop-up.png";

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onPageChange={setCurrentPage} />;
      case 'notes':
        return <Notes onPageChange={setCurrentPage} />;
      case 'about':
        return <About onPageChange={setCurrentPage} />;
      case 'contact':
        return <Contact onPageChange={setCurrentPage} />;
      default:
        return <Home onPageChange={setCurrentPage} />;
    }
  };

  return (
    <div className="App">
      <Header currentPage={currentPage} onPageChange={setCurrentPage} />

      {/* Popup Image */}
      <PopupImage 
        image={POPUP_IMAGE_PATH}
        delay={1500}  // show after 1.5 sec
      />

      <main>
        {renderPage()}
      </main>

      <Footer onPageChange={setCurrentPage} />
    </div>
  );
}

export default App;
