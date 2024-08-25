import React from 'react';
import Posts from '../components/Posts';
import Footer from '../components/Footer';
import TopNavbar from '../components/Navbar';
import { WindowContextProvider } from '../components/contexts/WindowContext';

export default function HomePage() {
  return (
    <WindowContextProvider>
      <div
        style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      >
        <TopNavbar />
        <div
          style={{
            margin: '60px 0px 20px',
          }}
        >
          <Posts />
        </div>
        <Footer />
      </div>
    </WindowContextProvider>
  );
}
