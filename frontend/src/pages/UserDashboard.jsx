
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useContext } from 'react';
// import { ShopContext } from '../context/ShopContext';

// const UserDashboard = () => {
//     const { token, backendUrl } = useContext(ShopContext);
//     const [returnRequests, setReturnRequests] = useState([]);

//     const loadReturnRequests = async () => {
//         try {
//             const response = await axios.get(backendUrl + '/api/return', {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             if (response.data.success) {
//                 setReturnRequests(response.data.data);
//             }
//         } catch (error) {
//             console.error('Error fetching return requests:', error);
//         }
//     };

//     useEffect(() => {
//         if (token) loadReturnRequests();
//     }, [token]);

//     return (
//         <div>
//             <h2>Your Return Requests</h2>
//             {returnRequests.length === 0 ? (
//                 <p>No return requests found.</p>
//             ) : (
//                 <div>
//                     {returnRequests.map((request) => (
//                         <div key={request._id}>
//                             <p>Order ID: {request.orderId}</p>
//                             <p>Status: {request.status}</p>
//                             <p>Reason: {request.reason}</p>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default UserDashboard;

import React from 'react'

const UserDashboard = () => {
  return (
    <div>UserDashboard</div>
  )
}

export default UserDashboard
