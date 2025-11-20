// import React, { useContext, useEffect, useState } from 'react'; 
// import { ShopContext } from '../context/ShopContext';
// import Title from '../components/Title';
// import axios from 'axios';

// const Orders = () => {
//   const { backendUrl, token, currency } = useContext(ShopContext);
  
//   const [orderData, setOrderData] = useState([]);
//   const [returnData, setReturnData] = useState(null); // State to track which order the user wants to return
//   const [reason, setReason] = useState(''); // State to handle return reason

//   const loadOrderData = async () => {
//     try {
//       if (!token) return; // Don't load if no token

//       const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } });
      
//       if (response.data.success) {
//         const allOrdersItem = response.data.orders.flatMap((order) =>
//           order.items.map((item) => ({
//             ...item,
//             status: order.status,
//             payment: order.payment,
//             paymentMethod: order.paymentMethod,
//             date: order.date,
//             orderId: order._id, // Storing order ID for later reference
//           }))
//         );
//         setOrderData(allOrdersItem.reverse()); // Reverse the array for most recent orders first
//       }
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//     }
//   };

//   const handleReturnRequest = (orderId) => {
//     setReturnData(orderId); // Set the current order ID for return
//   };

//   const submitReturnRequest = async () => {
//     if (!reason) {
//       alert('Please provide a reason for the return.');
//       return;
//     }
  
//     const requestData = {
//       orderId: returnData,
//       reason: reason,
//     };
  
//     console.log('Return Request Payload:', requestData); // Log the data
  
//     try {
//       const response = await axios.post(backendUrl + '/api/return/create', requestData , { withCredentials: true } , {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//       if (response.data.success) {
//         alert('Return request submitted successfully.');
//       } else {
//         alert('Failed to submit return request.');
//       }
//     } catch (error) {
//       if (error.response) {
//         console.error('Backend Error:', error.response.data);  // Detailed error message from backend
//         alert(`Error: ${error.response.data.message || 'Something went wrong!'}`);
//       } else {
//         console.error('Error:', error);
//         alert('Error submitting return request');
//       }
//     }
//   };
  
//   useEffect(() => {
//     if (token) loadOrderData(); // Only load orders if token exists
//   }, [token]);

//   return (
//     <div className="border-t pt-16">
//       <div className="text-2xl">
//         <Title text1={'MY'} text2={'ORDERS'} />
//       </div>
//       <div>
//         {orderData.map((item, index) => (
//           <div
//             className="py-4 border-t text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
//             key={index}
//           >
//             <div className="flex items-start gap-6 text-sm">
//               <img className="w-16 sm:w-20" src={item.image[0]} alt="" />
//               <div>
//                 <p className="sm:text-base font-medium">{item.name}</p>
//                 <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
//                   <p>{currency} {item.price}</p>
//                   <p>Quantity: {item.quantity}</p>
//                   <p>Size: {item.size}</p>
//                 </div>
//                 <p className="mt-1">Date: <span className="text-gray-500">{new Date(item.date).toDateString()}</span></p>
//                 <p className="mt-1">Payment: <span className="text-gray-500">{item.paymentMethod}</span></p>
//               </div>
//             </div>
//             <div className="md:w-1/2 flex justify-between">
//               <div className="flex items-center gap-2">
//                 <p className="min-w-2 h-2 rounded-full bg-orange-500"></p>
//                 <p className="text-sm md:text-base">{item.status}</p>
//               </div>
//               {item.status === 'Delivered' && (
//                 <button
//                   onClick={() => handleReturnRequest(item.orderId)}
//                   className="border px-4 py-2 text-sm font-medium rounded-sm"
//                 >
//                   Return
//                 </button>
//               )}
//               <button className="border px-4 py-2 text-sm font-medium rounded-sm">
//                 Track Order
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Conditionally Render Return Form */}
//       {returnData && (
//         <div className="mt-6">
//           <h3 className="text-lg font-medium">Return Request</h3>
//           <textarea
//             value={reason}
//             onChange={(e) => setReason(e.target.value)}
//             placeholder="Enter your reason for return"
//             className="w-full p-2 border mt-2"
//             rows={4}
//           />
//           <button
//             onClick={submitReturnRequest}
//             className="mt-4 border bg-blue-500 text-white px-4 py-2 rounded-sm"
//           >
//             Submit Return Request
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Orders;


import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 // Import useRouter for navigation

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const navigate = useNavigate();

  const [orderData, setOrderData] = useState([]);
  const [returnData, setReturnData] = useState(null); // State to track which order the user wants to return
  const [reason, setReason] = useState(''); // State to handle return reason
  const [returnSuccess, setReturnSuccess] = useState(false); // State to track if return is successful

  const loadOrderData = async () => {
    try {
      if (!token) {
        console.log('No token found');
        navigate('/login'); // Redirect to login if no token
        return;
      }
  
      console.log('Fetching orders with token:', token);
      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Correct header format
          },
        }
      );
  
      console.log('API Response:', response.data);
      if (response.data.success) {
        const allOrdersItem = response.data.orders.flatMap((order) =>
          order.items.map((item) => ({
            ...item,
            status: order.status,
            payment: order.payment,
            paymentMethod: order.paymentMethod,
            date: order.date,
            orderId: order._id,
          }))
        );
        setOrderData(allOrdersItem.reverse());
      } else {
        console.log('No orders found.');
        navigate('/login'); // Redirect to login on unauthorized access
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      if (error.response?.status === 401) {
        alert('Session expired. Please log in again.');
        navigate('/login'); // Redirect to login
      }
    }
  };
  

  const handleReturnRequest = (orderId) => {
    setReturnData(orderId); // Set the current order ID for return
  };

  const submitReturnRequest = async () => {
    if (!reason) {
      alert('Please provide a reason for the return.');
      return;
    }
  
    // Find the product details from the orderData using returnData (orderId)
    const product = orderData.find((item) => item.orderId === returnData);
  
    if (!product) {
      alert('Product not found.');
      return;
    }
  
    const requestData = {
      orderId: returnData, // The order ID
      productId: product._id, // The product ID (make sure this exists in your `orderData`)
      reason: reason, // The reason for return
    };
  
    console.log('Return Request Payload:', requestData); // Log the data
  
    try {
      const response = await axios.post(
        `${backendUrl}/api/return/create`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        alert('Return request submitted successfully.');
        setReturnSuccess(true); // Set success flag
      } else {
        alert('Failed to submit return request.');
      }
    } catch (error) {
      if (error.response) {
        console.error('Backend Error:', error.response.data); // Detailed error message from backend
        alert(
          `Error: ${error.response.data.message || 'Something went wrong!'}`
        );
      } else {
        console.error('Error:', error);
        alert('Error submitting return request');
      }
    }
  };

  useEffect(()=>{
    loadOrderData()
  })

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      <div>
        {orderData.map((item, index) => (
          <div
            className="py-4 border-t text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            key={index}
          >
            <div className="flex items-start gap-6 text-sm">
              <img className="w-16 sm:w-20" src={item.image[0]} alt="" />
              <div>
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                  <p>
                    {currency} {item.price}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className="mt-1">
                  Date:{' '}
                  <span className="text-gray-500">
                    {new Date(item.date).toDateString()}
                  </span>
                </p>
                <p className="mt-1">
                  Payment:{' '}
                  <span className="text-gray-500">{item.paymentMethod}</span>
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-orange-500"></p>
                <p className="text-sm md:text-base">{item.status}</p>
              </div>
              {item.status === 'Delivered' && (
                <button
                  onClick={() => handleReturnRequest(item.orderId)}
                  className="border px-4 py-2 text-sm font-medium rounded-sm"
                >
                  Return
                </button>
              )}
              <button className="border px-4 py-2 text-sm font-medium rounded-sm">
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Conditionally Render Return Form */}
      {returnData && !returnSuccess && (
        <div className="mt-6">
          <h3 className="text-lg font-medium">Return Request</h3>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter your reason for return"
            className="w-full p-2 border mt-2"
            rows={4}
          />
          <button
            onClick={submitReturnRequest}
            className="mt-4 border bg-blue-500 text-white px-4 py-2 rounded-sm"
          >
            Submit Return Request
          </button>
        </div>
      )}

      {returnSuccess && (
        <div className="mt-6 text-center">
          <h3 className="text-lg font-medium text-green-600">
            Return Request Submitted Successfully!
          </h3>
          <button
            onClick={() => navigate('/userdashboard')}
            className="mt-4 border bg-blue-500 text-white px-4 py-2 rounded-sm"
          >
            Go to Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default Orders;
