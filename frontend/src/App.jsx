

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ThyroterraDashboard from './components/ThyroterraDashboard.';
import MonthlyProgress from './components/MonthlyProgress';
import CheckList from './components/CheckList';
import FAQSystem from './pages/FAQSystem';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ThyroterraDashboard />} />
        <Route path="/thyroterra" element={<ThyroterraDashboard />} />
        <Route path="/FAQ" element={<FAQSystem />} />
        <Route path="/monthly-progress" element={<MonthlyProgress />} />
        <Route path="/checklist" element={<CheckList />} />
      </Routes>
    </Router>
  );
}

export default App;
