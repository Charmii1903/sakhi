// import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { useState } from 'react';
import { useEffect } from 'react';

const ManageReturns = () => {
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReturns = async () => {
      try {
        const response = await axios.get(backendUrl + '/api/return');
        if (Array.isArray(response.data.data)) {
          setReturns(response.data.data);
        } else {
          setReturns([]);
        }
      } catch (error) {
        console.error('Error fetching return requests:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReturns();
  }, []);

  const handleApprove = async (id) => {
    try {
      console.log("ID to approve:", id); // Log the ID
      const response = await axios.put(backendUrl + '/api/return/:id/approve', { withCredentials: true });
      if (response.data.success) {
        alert('Return request approved');
        setReturns((prevReturns) => prevReturns.filter((item) => item._id !== id)); // Remove from list after approval
      }
    } catch (error) {
      console.error('Error approving return request:', error.message);
      alert('Failed to approve the return request. Please try again.');
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await axios.put(backendUrl + '/api/return/:id/reject', { withCredentials: true });
      if (response.data.success) {
        alert('Return request rejected');
        setReturns();
      }
    } catch (error) {
      console.error('Error rejecting return request:', error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin border-t-4 border-orange-500 rounded-full h-16 w-16 border-4"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-700">Manage Returns</h1>
      
      {returns.length === 0 ? (
        <p className="text-center text-gray-500">No return requests available.</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-2 text-left">Order ID</th>
                <th className="px-4 py-2 text-left">User ID</th>
                <th className="px-4 py-2 text-left">Reason</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {returns.map((returnRequest) => (
                <tr key={returnRequest._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{returnRequest.orderId}</td>
                  <td className="px-4 py-2">{returnRequest.userId}</td>
                  <td className="px-4 py-2">{returnRequest.reason}</td>
                  <td className="px-4 py-2">{returnRequest.status}</td>
                  <td className="px-4 py-2 flex space-x-2">
                    <button
                      onClick={() => handleApprove(returnRequest._id)}
                      className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600 focus:outline-none transition duration-200"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(returnRequest._id)}
                      className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 focus:outline-none transition duration-200"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageReturns;
