// // import React from 'react';
// // import { Routes, Route, Navigate, Link } from 'react-router-dom';
// // import Login from './pages/Login.jsx';
// // import Dashboard from './pages/Dashboard.jsx';
// // import Payments from './pages/Payments.jsx';
// // import { useAuth } from './hooks/useAuth.jsx';

// // export default function App() {
// //   const { token, logout } = useAuth();

// //   return (
// //     <div className="min-h-screen">
// //       <nav className="bg-white border-b">
// //         <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
// //           <Link to="/" className="font-bold text-xl">FinEase</Link>
// //           <div className="space-x-4">
// //             {token ? (
// //               <>
// //                 <Link to="/dashboard" className="btn btn-primary">Dashboard</Link>
// //                 <Link to="/payments" className="btn">Payments</Link>
// //                 <button onClick={logout} className="btn">Logout</button>
// //               </>
// //             ) : (
// //               <Link to="/login" className="btn btn-primary">Login</Link>
// //             )}
// //           </div>
// //         </div>
// //       </nav>
// //       <main className="max-w-6xl mx-auto p-4">
// //         <Routes>
// //           <Route path="/" element={<Navigate to={token ? '/dashboard' : '/login'} />} />
// //           <Route path="/login" element={<Login />} />
// //           <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
// //           <Route path="/payments" element={token ? <Payments /> : <Navigate to="/login" />} />
// //         </Routes>
// //       </main>
// //     </div>
// //   );
// // }
// import React from 'react';
// import { Routes, Route, Navigate, Link } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";
// import Login from './pages/Login.jsx';
// import Dashboard from './pages/Dashboard.jsx';
// import Payments from './pages/Payments.jsx';
// import LandingPage from './pages/LandingPage.jsx'; 
// import { useAuth } from './hooks/useAuth.jsx';

// export default function App() {
//   const { token, logout } = useAuth();
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen">
//       <nav className="bg-white border-b">
//         <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
//           <Link to="/" className="font-bold text-xl">FinEase</Link>
//           <div className="space-x-4">
//             {token ? (
//               <>
//                 <Link to="/dashboard" className="btn btn-primary">Dashboard</Link>
//                 <Link to="/payments" className="btn">Payments</Link>
//                 {/* <button onClick={logout} className="btn">Logout</button> */}
//                 <button
//                   onClick={() => { logout(); navigate("/");}} className="btn"
//                 >Logout
//                 </button>
//               </>
//             ) : (
//               <Link to="/login" className="btn btn-primary">Login</Link>
//             )}
//           </div>
//         </div>
//       </nav>

//       <main className="max-w-6xl mx-auto p-4">
//         <Routes>
//           {/* 👇 Change this line */}
//           <Route path="/" element={<LandingPage />} />  

//           <Route path="/login" element={<Login />} />
//           <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
//           <Route path="/payments" element={token ? <Payments /> : <Navigate to="/login" />} />
//         </Routes>
//       </main>
//     </div>
//   );
// }
import React from 'react';
import { Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Payments from './pages/Payments.jsx';
import LandingPage from './pages/LandingPage.jsx';
import { useAuth } from './hooks/useAuth.jsx';
import { Wallet, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function App() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* --- Logo --- */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            onClick={() => setMenuOpen(false)}
          >
            <Wallet className="h-7 w-7 text-indigo-600" />
            <span className="text-2xl font-extrabold text-gray-900 group-hover:text-indigo-600 transition-colors">
              FinEase
            </span>
          </Link>

          {/* --- Desktop Nav --- */}
          <div className="hidden md:flex items-center gap-4">
            {token ? (
              <>
                <Link
                  to="/dashboard"
                  className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:border-indigo-300 transition-all"
                >
                  Dashboard
                </Link>
                <Link
                  to="/payments"
                  className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:border-indigo-300 transition-all"
                >
                  Payments
                </Link>
                <button
                  onClick={handleLogout}
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700 active:scale-95 transition-all"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700 active:scale-95 transition-all"
              >
                Login
              </Link>
            )}
          </div>

          {/* --- Mobile Menu Toggle --- */}
          <button
            className="md:hidden flex items-center text-gray-700 hover:text-indigo-600 transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* --- Mobile Dropdown Menu --- */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-sm shadow-inner">
            <div className="flex flex-col px-6 py-4 space-y-3">
              {token ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="text-gray-800 font-medium hover:text-indigo-600"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/payments"
                    onClick={() => setMenuOpen(false)}
                    className="text-gray-800 font-medium hover:text-indigo-600"
                  >
                    Payments
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 font-semibold text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-indigo-600 font-semibold"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-12">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={token ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/payments"
            element={token ? <Payments /> : <Navigate to="/login" />}
          />
        </Routes>
      </main>
    </div>
  );
}
