import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/home';
import PrototypeA from './pages/prototype-a/prototype-a';
import PrototypeB from './pages/prototype-b/prototype-b';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/prototype-a" element={<PrototypeA />} />
        <Route path="/prototype-b" element={<PrototypeB />} />
      </Routes>
    </Router>
  );
}

export default App;
