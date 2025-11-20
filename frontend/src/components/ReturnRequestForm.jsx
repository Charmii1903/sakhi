import React, { useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const ReturnRequestForm = ({ orderId, productId }) => {
    const { token, backendUrl } = useContext(ShopContext);
    const [reason, setReason] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const submitReturnRequest = async (e) => {
        e.preventDefault();
        if (!reason) {
            setError('Reason for return is required');
            return;
        }

        try {
            const response = await axios.post(
                `${backendUrl}api/return/create`,
                {
                    orderId,
                    productId,
                    reason,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.success) {
                setSuccess('Return request submitted successfully!');
                setReason('');
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            console.error(error);
            setError('Error submitting return request');
        }
    };

    return (
        <form onSubmit={submitReturnRequest}>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Reason for return"
                className="border p-2"
                rows="4"
            ></textarea>
            <button type="submit" className="bg-orange-500 text-white p-2 mt-2">
                Submit Return Request
            </button>
        </form>
    );
};

export default ReturnRequestForm;
