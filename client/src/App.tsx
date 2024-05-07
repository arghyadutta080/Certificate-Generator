import './App.css'
import AuthPage from "./pages/AuthPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}

export default App
