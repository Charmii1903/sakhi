
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewReturnRequests = () => {
  const [returns, setReturns] = useState([]);

  useEffect(() => {
    const fetchReturns = async () => {
      const response = await axios.get('api/return');
      setReturns(response.data.data);
    };

    fetchReturns();
  }, []);

  return (
    <div>
      <h2>Your Return Requests</h2>
      <ul>
        {returns.map((returnRequest) => (
          <li key={returnRequest._id}>
            Order ID: {returnRequest.orderId} | Reason: {returnRequest.reason} | Status: {returnRequest.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewReturnRequests;
