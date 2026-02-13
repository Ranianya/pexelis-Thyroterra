

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ThyroterraDashboard from './components/ThyroterraDashboard.';
import MonthlyProgress from './components/MonthlyProgress';
import CheckList from './components/CheckList';
import FAQSystem from './pages/FAQSystem';
function App() {
  return (
    <Router>
      <Routes className="font-pixel">
        <Route path="/" element={<ThyroterraDashboard />} />
        <Route path="/dashboard" element={<ThyroterraDashboard />} />
        <Route path="/FAQ" element={<FAQSystem />} />
        <Route path="/monthly-progress" element={<MonthlyProgress />} />
        <Route path="/checklist" element={<CheckList />} />
      </Routes>
    </Router>
  );
}

export default App;




// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// function App() {
//   return (
//     <div className="font-pixel">
//        <p className="text-center text-2xl mt-10">Welcome to Thyroterra!</p>
//     </div>

//   );
// }

// export default App;
