// 'use client'
// import React, { useState, useEffect } from 'react';
// import { fetchAllSubscriptions } from '@/APIServices/Subscription/subscription'; // Adjust the import path as necessary

// interface Subscription {
//   PlanID: number;
//   PlanName: string;
//   Price: number;
//   Features: string;
//   PlanType: string;
// }

// const SubscriptionPage: React.FC = () => {
//   const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const loadSubscriptions = async () => {
//       setLoading(true);
//       const result = await fetchAllSubscriptions();
//       console.log('Subscriptions fetched:', result); // Debugging line
//       if (result.success) {
//         setSubscriptions(result.data || []);
//         setError(null);
//       } else {
//         setError(result.message);
//         setSubscriptions([]);
//       }
//       setLoading(false);
//     };
//     loadSubscriptions();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
//       <h1 className="text-4xl font-bold text-gray-800 mb-8">Choose Your Subscription Plan</h1>

//       {loading && (
//         <div className="text-gray-600 text-lg">Loading subscriptions...</div>
//       )}

//       {error && (
//         <div className="text-red-500 text-lg mb-4">Error: {error}</div>
//       )}

//       {/* {!loading && !error && subscriptions.length === 0 && (
//         <div className="text-gray-600 text-lg">No subscriptions available.</div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full px-4">
//           console.log('Rendering subscription:', subscriptions); // Debugging line
//         {subscriptions.map((subscription) => (

//             // Using subscription.PlanID as the key for each subscription card

//           <div
//             key={subscription.PlanID}
//             className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between transform hover:scale-105 transition-transform duration-300"
//           >
//             <div>
//               <h2 className="text-2xl font-semibold text-gray-800 mb-2">
//                 {subscription.PlanName}
//               </h2>
//               <p className="text-3xl font-bold text-blue-600 mb-4">
//   {typeof subscription.Price === 'number'
//     ? `$${subscription.Price.toFixed(2)} / month`
//     : 'Price unavailable'}
// </p>
//               <p className="text-sm text-gray-500 mb-4">
//                 Plan Type: {subscription.PlanType}
//               </p>
//               <ul className="text-gray-600 mb-6">
//                 {subscription.Features.split(',').map((feature, index) => (
//                   <li key={index} className="flex items-center mb-2">
//                     <svg
//                       className="w-5 h-5 text-green-500 mr-2"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M5 13l4 4L19 7"
//                       />
//                     </svg>
//                     {feature.trim()}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <button
//               className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-200"
//               onClick={() => alert(`Subscribe to ${subscription.PlanName}`)}
//             >
//               Subscribe Now
//             </button>
//           </div>
//         ))}
//       </div> */}



// {!loading && !error && subscriptions.length === 0 && (
//   <div className="text-gray-600 text-lg">No subscriptions available.</div>
// )}

// <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full px-4">
//   {subscriptions.map((subscription) => (
//     <div
//       key={subscription.PlanID}
//       className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between transform hover:scale-105 transition-transform duration-300"
//     >
//       <div>
//         <h2 className="text-2xl font-semibold text-gray-800 mb-2">
//           {subscription.PlanName}
//         </h2>
//         <p className="text-3xl font-bold text-blue-600 mb-4">
//           {typeof subscription.Price === 'number'
//             ? `$${subscription.Price.toFixed(2)} / month`
//             : 'Price unavailable'}
//         </p>
//         <p className="text-sm text-gray-500 mb-4">
//           Plan Type: {subscription.PlanType}
//         </p>
//         <ul className="text-gray-600 mb-6">
//           {(subscription.Features || '').split(',').map((feature, index) => (
//             <li key={index} className="flex items-center mb-2">
//               <svg
//                 className="w-5 h-5 text-green-500 mr-2"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M5 13l4 4L19 7"
//                 />
//               </svg>
//               {feature.trim()}
//             </li>
//           ))}
//         </ul>
//       </div>
//       <button
//         className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-200"
//         onClick={() => alert(`Subscribe to ${subscription.PlanName}`)}
//       >
//         Subscribe Now
//       </button>
//     </div>
//   ))}
// </div>

//     </div>
//   );
// };

// export default SubscriptionPage;


'use client'
import React, { useState, useEffect } from 'react';
import { fetchAllSubscriptions } from '@/APIServices/Subscription/subscription';

interface Subscription {
  PlanID: number;
  PlanName: string;
  Price: number;
  Features: string;
  PlanType: string;
}

const SubscriptionPage: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true); // Ensure the component is mounted on the client
    const loadSubscriptions = async () => {
      setLoading(true);
      const result = await fetchAllSubscriptions();
      console.log('Subscriptions fetched:', result);
      if (result.success) {
        setSubscriptions(result.data || []);
        setError(null);
      } else {
        setError(result.message);
        setSubscriptions([]);
      }
      setLoading(false);
    };
    loadSubscriptions();
  }, []);

  // Avoid rendering anything during SSR to prevent hydration mismatch
  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Choose Your Subscription Plan</h1>

      {loading && (
        <div className="text-gray-600 text-lg">Loading subscriptions...</div>
      )}

      {error && (
        <div className="text-red-500 text-lg mb-4">Error: {error}</div>
      )}

      {!loading && !error && subscriptions.length === 0 && (
        <div className="text-gray-600 text-lg">No subscriptions available.</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full px-4">
        {subscriptions.map((subscription) => (
          <div
            key={subscription.PlanID}
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between transform hover:scale-105 transition-transform duration-300"
          >
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {subscription.PlanName}
              </h2>
              <p className="text-3xl font-bold text-blue-600 mb-4">
                {typeof subscription.Price === 'number'
                  ? `$${subscription.Price.toFixed(2)} / month`
                  : 'Price unavailable'}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Plan Type: {subscription.PlanType}
              </p>
              <ul className="text-gray-600 mb-6">
                {(subscription.Features || '').split(',').map((feature, index) => (
                  <li key={index} className="flex items-center mb-2">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature.trim()}
                  </li>
                ))}
              </ul>
            </div>
            <button
              className="bg-blue-600 text-white font-semibold py-2

 px-4 rounded hover:bg-blue-700 transition-colors duration-200"
              onClick={() => alert(`Subscribe to ${subscription.PlanName}`)}
            >
              Subscribe Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPage;