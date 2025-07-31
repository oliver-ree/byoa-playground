import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/home';
import DiagnosticsLite from './pages/diagnostics-lite/diagnostics-lite';
import PrototypeB from './pages/prototype-b/prototype-b';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/diagnostics-lite" element={<DiagnosticsLite />} />
        <Route path="/prototype-b" element={<PrototypeB />} />
      </Routes>
    </Router>
  );
}

export default App;
