import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './Components/Header/Header'
import LoginSignup from './Components/LoginSignup/LoginSignup'
import AddProduct from './Components/AddProduct/AddProduct'
import Products from './Components/Products/Products'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './Components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import { BagProvider } from './context/BagContext' 
import Home from './Pages/Home'
import Favorites from './Components/Favorites/Favorites'
import Bag from './Components/Bag/Bag'
import Profile from './/Components/Profile/Profile'

function App() {
  return (
    <AuthProvider>
      <BagProvider>
        <Router>
          <Header />

          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/bag" element={<Bag />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/products" element={<Products />} />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              <Route path="/login" element={<LoginSignup />} />
            </Routes>
          </div>
        </Router>
      </BagProvider>
    </AuthProvider>
  )
}

export default App
