// import React from 'react';
// import { useEffect, useState } from 'react';
// import api from '../services/api';

// export default function Dashboard() {
//   const [me, setMe] = useState(null);
//   const [tx, setTx] = useState([]);

//   useEffect(() => {
//     (async () => {
//       const who = await api.get('/users/me');
//       setMe(who.data);
//       const t = await api.get('/payments/transactions');
//       setTx(t.data);
//     })();
//   }, []);

//   return (
//     <div className="space-y-6">
//       <div className="grid md:grid-cols-3 gap-4">
//         <div className="card">
//           <p className="text-gray-500">Security</p>
//           <p className="text-3xl font-bold">91%</p>
//         </div>
//         <div className="card">
//           <p className="text-gray-500">Usability</p>
//           <p className="text-3xl font-bold">88%</p>
//         </div>
//         <div className="card">
//           <p className="text-gray-500">Stability</p>
//           <p className="text-3xl font-bold">90%</p>
//         </div>
//       </div>

//       <div className="card">
//         <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
//         <div className="overflow-x-auto">
//           <table className="w-full text-left">
//             <thead>
//               <tr className="text-gray-600">
//                 <th className="py-2">ID</th>
//                 <th>Amount</th>
//                 <th>Status</th>
//                 <th>Created</th>
//               </tr>
//             </thead>
//             <tbody>
//               {tx.map(row => (
//                 <tr key={row._id} className="border-t">
//                   <td className="py-2">{row.stripePaymentIntentId || 'mock'}</td>
//                   <td>${(row.amount/100).toFixed(2)}</td>
//                   <td>{row.status}</td>
//                   <td>{new Date(row.createdAt).toLocaleString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function Dashboard() {
  const [me, setMe] = useState(null);
  const [tx, setTx] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const who = await api.get('/users/me');
        setMe(who.data);
        const t = await api.get('/payments/transactions');
        setTx(t.data);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      }
    })();
  }, []);

  const StatusBadge = ({ status }) => {
    const base = "px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch (status.toLowerCase()) {
      case 'succeeded':
        return <span className={`${base} bg-green-100 text-green-800`}>Succeeded</span>;
      case 'pending':
        return <span className={`${base} bg-yellow-100 text-yellow-800`}>Pending</span>;
      case 'failed':
        return <span className={`${base} bg-red-100 text-red-800`}>Failed</span>;
      default:
        return <span className={`${base} bg-gray-100 text-gray-800`}>{status}</span>;
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* --- Header --- */}
        <header>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {me?.name || 'User'}!
          </h1>
          <p className="text-gray-600 mt-1">
            Here's your financial overview for today.
          </p>
        </header>

        {/* --- Stat Cards --- */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <p className="text-sm font-medium text-gray-500">Security</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">91%</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <p className="text-sm font-medium text-gray-500">Usability</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">88%</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <p className="text-sm font-medium text-gray-500">Stability</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">90%</p>
          </div>
        </div>

        {/* --- Recent Transactions Table --- */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-5">
            <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
            <p className="text-sm text-gray-500 mt-1">Your latest deposits and withdrawals.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className="text-gray-600">
                  <th className="py-3 px-6 text-xs font-semibold uppercase tracking-wider">Transaction ID</th>
                  <th className="py-3 px-6 text-xs font-semibold uppercase tracking-wider">Amount</th>
                  <th className="py-3 px-6 text-xs font-semibold uppercase tracking-wider">Status</th>
                  <th className="py-3 px-6 text-xs font-semibold uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tx.length > 0 ? (
                  tx.map((row) => (
                    <tr key={row._id} className="hover:bg-gray-50 transition">
                      <td className="py-4 px-6 text-sm text-gray-600">
                        {row.stripePaymentIntentId || 'N/A'}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">
                        ${((row.amount || 0) / 100).toFixed(2)}
                      </td>
                      <td className="py-4 px-6">
                        <StatusBadge status={row.status || 'unknown'} />
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">
                        {new Date(row.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-12 text-gray-500">
                      No transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
