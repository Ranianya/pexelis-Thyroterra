import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './components/About';
import Hero from './components/Hero';
import Infos from './components/Infos';
import Footer from './components/Footer';
import Years from './pages/Years';
import Months from './pages/Months';
import Days from './pages/Days';
import SignIn from './pages/SignIn'

function App() {
  return (
    <div className='bg-[#5A7554]'>
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <Navbar /> 
              <About />
              <Hero />
              <Infos />
              <Footer />
            </>
          } 
        />
        
        <Route path="/years" element={<Years />} />
        <Route path="/months" element={<Months />} />
        <Route path="/days" element={<Days />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;