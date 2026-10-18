import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import { ListingsProvider } from './context/ListingsContext';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import GuestRoute from './components/GuestRoute';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import Profile from './pages/Profile';
import Offers from './pages/Offers';
import Category from './pages/Category';
import Listing from './pages/Listing';
import CreateListing from './pages/CreateListing';
import EditListing from './pages/EditListing';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <ListingsProvider>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/offers" element={<Offers />} />
              <Route path="/category/:categoryName" element={<Category />} />
              <Route path="/category/:categoryName/:listingId" element={<Listing />} />
              <Route
                path="/login"
                element={
                  <GuestRoute>
                    <Login />
                  </GuestRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <GuestRoute>
                    <Register />
                  </GuestRoute>
                }
              />
              <Route
                path="/reset-password"
                element={
                  <GuestRoute>
                    <ResetPassword />
                  </GuestRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/create-listing"
                element={
                  <PrivateRoute>
                    <CreateListing />
                  </PrivateRoute>
                }
              />
              <Route
                path="/edit-listing/:listingId"
                element={
                  <PrivateRoute>
                    <EditListing />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
          <ToastContainer position="bottom-center" theme="colored" autoClose={2500} />
        </Router>
      </ListingsProvider>
    </AuthProvider>
  );
}

export default App;
