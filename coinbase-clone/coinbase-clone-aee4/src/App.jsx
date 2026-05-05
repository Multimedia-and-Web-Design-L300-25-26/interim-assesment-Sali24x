import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import AssetDetail from "./pages/AssetDetail";
import Learn from "./pages/Learn";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SignUpType from "./pages/SignUpType";
import Profile from "./pages/Profile";
import ScrollToTop from "./components/common/ScrollToTop";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>

          {/* Pages with Navbar + Footer */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/assets/:id" element={<AssetDetail />} />
            <Route path="/learn" element={<Learn />} />
            
            {/* Protected profile route */}
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
          </Route>

          {/* Auth pages WITHOUT layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUpType />} />
          <Route path="/signup/details" element={<SignUp />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;