import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './Components/ProtectedRoute';

import Home from './Pages/Home';
import Favorites from './Pages/Favorites';
import Bag from './Pages/Bag';
import Profile from './Pages/Profile';

function App() {
  return (
    <Router>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/bag" element={<Bag />} />
          <Route path="/profile" element={<ProtectedRoute> <Profile/> </ProtectedRoute>} />
          <Route path="/login" element={<LoginSignup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
