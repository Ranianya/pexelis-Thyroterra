import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './components/About';
import Hero from './components/Hero';
import Infos from './components/Infos';
import Footer from './components/Footer';
import Years from './pages/Years';
import Months from './pages/Months';
import Days from './pages/Days';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp'; // ✅ Fixed: Renamed from SignIn to SignUp
import ThyroterraDashboard from './components/ThyroterraDashboard.';
import MonthlyProgress from './components/MonthlyProgress';
import CheckList from './components/CheckList';
import FAQSystem from './pages/FAQSystem';
// ✅ Ensure the route includes the :spotId parameter

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
        // In your Routes definition



        <Route path="/years" element={<Years />} />
        <Route path="/months" element={<Months />} />
        <Route path="/days" element={<Days />} />
        <Route path="/days/:spotId" element={<Days />} />
        <Route path="/checklist" element={<CheckList />} />
        {/* Auth Routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* Dashboard Routes */}
        <Route path="/dashboard/:dayId" element={<ThyroterraDashboard />} />
        <Route path="/dashboard" element={<ThyroterraDashboard />} />
        <Route path="/FAQ" element={<FAQSystem />} />
        <Route path="/monthly-progress" element={<MonthlyProgress />} />
        <Route path="/checklist" element={<CheckList />} />
      </Routes>
    </div>
  );
}

export default App;