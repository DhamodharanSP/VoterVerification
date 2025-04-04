// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import Home from "./components/Home";
// import Profile from "./components/Profile";
// import VoterVerification from "./components/VoterVerification";  // Import the new component
// import ProtectedRoute from "./components/ProtectedRoutes";

// function App() {
//     return (
//         <Router>
//             <Routes>
//                 {/* Public Routes */}
//                 <Route path="/" element={<Login />} />
//                 <Route path="/register" element={<Register />} />

//                 {/* Protected Routes */}
//                 <Route 
//                     path="/home" 
//                     element={
//                         <ProtectedRoute>
//                             <Home />
//                         </ProtectedRoute>
//                     } 
//                 />
//                 <Route 
//                     path="/profile" 
//                     element={
//                         <ProtectedRoute>
//                             <Profile />
//                         </ProtectedRoute>
//                     } 
//                 />
//                 <Route 
//                     path="/verify-voters" 
//                     element={
//                         <ProtectedRoute>
//                             <VoterVerification />
//                         </ProtectedRoute>
//                     } 
//                 />
//             </Routes>
//         </Router>
//     );
// }

// export default App;


// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './components/admin/AdminDashboard';
import CreatePollingHead from './components/admin/CreatePollingHead';
import VoterVerification from './components/verification/VoterVerification';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        
        {/* Super Admin Routes */}
        <Route 
          path="/admin" 
          element={<ProtectedRoute allowedRoles={['super_admin']}><AdminDashboard /></ProtectedRoute>} 
        />
        <Route 
          path="/create-polling-head" 
          element={<ProtectedRoute allowedRoles={['super_admin']}><CreatePollingHead /></ProtectedRoute>} 
        />
        
        {/* Polling Station Head Routes */}
        <Route 
          path="/verify-voters" 
          element={<ProtectedRoute allowedRoles={['polling_station_head']}><VoterVerification /></ProtectedRoute>} 
        />
      </Routes>
    </Router>
  );
}

export default App; 