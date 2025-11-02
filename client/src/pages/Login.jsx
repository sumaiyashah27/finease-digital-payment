// import React, { useState } from 'react';
// import api from '../services/api';
// import { useAuth } from '../hooks/useAuth';
// import { useNavigate } from 'react-router-dom';

// export default function Login() {
//   const [email, setEmail] = useState('demo@example.com');
//   const [password, setPassword] = useState('password123');
//   const [name, setName] = useState('Demo User');
//   const [mode, setMode] = useState('login');
//   const [error, setError] = useState(null);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const submit = async (e) => {
//     e.preventDefault();
//     setError(null);

//     try {
//       if (mode === 'register') {
//         await api.post('/auth/register', { name, email, password });
//       }

//       const { data } = await api.post('/auth/login', { email, password });

//       if (data?.token) {
//         login(data.token);
//         localStorage.setItem('token', data.token);
//         navigate('/dashboard');
//       } else {
//         throw new Error('No token returned from server');
//       }
//     } catch (err) {
//       console.error('Login error:', err);
//       setError(
//         err.response?.data?.message || err.message || 'Something went wrong'
//       );
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto">
//       <div className="card">
//         <h1 className="text-2xl font-semibold mb-4">
//           {mode === 'login' ? 'Login' : 'Create account'}
//         </h1>

//         <form onSubmit={submit} className="space-y-3">
//           {mode === 'register' && (
//             <label className="block">
//               <span className="sr-only">Name</span>
//               <input
//                 aria-label="Name"
//                 className="input w-full"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Name"
//                 required
//               />
//             </label>
//           )}

//           <label className="block">
//             <span className="sr-only">Email</span>
//             <input
//               aria-label="Email"
//               className="input w-full"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Email"
//               type="email"
//               required
//             />
//           </label>

//           <label className="block">
//             <span className="sr-only">Password</span>
//             <input
//               aria-label="Password"
//               className="input w-full"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Password"
//               type="password"
//               required
//             />
//           </label>

//           {error && (
//             <p className="text-red-600" role="alert">
//               {error}
//             </p>
//           )}

//           <button className="btn btn-primary w-full" type="submit">
//             {mode === 'login' ? 'Login' : 'Register & Login'}
//           </button>
//         </form>

//         <button
//           className="mt-3 underline"
//           onClick={() =>
//             setMode(mode === 'login' ? 'register' : 'login')
//           }
//         >
//           {mode === 'login'
//             ? 'Create an account'
//             : 'Have an account? Login'}
//         </button>
//       </div>
//     </div>
//   );
// }
import React, { useState } from 'react';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, UserPlus, RefreshCw, Wallet } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('Demo User');
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (mode === 'register') {
        await api.post('/auth/register', { name, email, password });
      }

      const { data } = await api.post('/auth/login', { email, password });

      if (data?.token) {
        login(data.token);
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        throw new Error('No token returned from server');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      {/* --- Form Section (Left) --- */}
      <div className="flex w-full flex-col justify-center bg-white px-6 py-12 shadow-xl md:w-1/2 lg:w-5/12">
        <div className="mx-auto w-full max-w-md">
          {/* Logo (Mobile) */}
          <div className="flex justify-center md:hidden mb-6">
            <Wallet className="h-10 w-10 text-indigo-600" />
          </div>
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 md:text-left">
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h2>

          <form className="space-y-6 mt-10" onSubmit={submit}>
            {mode === 'register' && (
              <div className="relative">
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <UserPlus className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="block w-full rounded-md border-0 py-2.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            )}

            <div className="relative">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="demo@example.com"
                className="block w-full rounded-md border-0 py-2.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="block w-full rounded-md border-0 py-2.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 text-center" role="alert">
                {error}
              </p>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded-xl bg-indigo-600 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-700 transition disabled:opacity-50"
              >
                {isLoading ? (
                  <RefreshCw className="h-5 w-5 animate-spin" />
                ) : mode === 'login' ? (
                  'Sign in'
                ) : (
                  'Create account & Sign in'
                )}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            {mode === 'login' ? 'Not a member?' : 'Already have an account?'}
            <button
              onClick={() => {
                setMode(mode === 'login' ? 'register' : 'login');
                setError(null);
              }}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-1"
            >
              {mode === 'login' ? 'Create an account' : 'Sign in'}
            </button>
          </p>

          <p className="mt-4 text-center text-sm text-gray-500">
            <button
              onClick={() => navigate('/')}
              type="button"
              className="font-semibold leading-6 text-gray-500 hover:text-indigo-600 flex items-center gap-1 mx-auto text-xs"
            >
              Back to Home
            </button>
          </p>
        </div>
      </div>

      {/* --- Branding Section (Right) --- */}
      <div className="relative hidden w-full flex-col items-center justify-center bg-gradient-to-br from-indigo-700 to-indigo-900 p-12 text-white md:flex md:w-1/2 lg:w-7/12">
        <div className="flex items-center gap-3 mb-4">
          <Wallet className="h-12 w-12" />
          <span className="text-5xl font-bold">FinEase</span>
        </div>
        <p className="text-lg text-indigo-200 max-w-sm text-center">
          A secure and scalable digital payments platform for the modern web.
        </p>

        {/* Decorative Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-white/5 rounded-full blur-3xl opacity-50" />
      </div>
    </div>
  );
}
