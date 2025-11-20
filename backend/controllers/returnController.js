// controllers/returnController.js
import Return from '../models/returnModel.js';

// Create a new return request
// export const createReturnRequest = async (req, res) => {
//     try {
//         const userId = req.body.userId; 
//         // Extract userId from req.body (set by the authUser middleware)
//         const {  orderId, reason } = req.body;

//         // Ensure userId is present (authUser middleware should handle this)
//         if (!userId) {
//             return res.status(401).json({ success: false, message: 'Unauthorized: Missing userId' });
//         }

//         // Validate required fields
//         if (!orderId || !reason) {
//             return res.status(400).json({ success: false, message: 'Missing required fields: orderId or reason' });
//         }

//         // Create a new return request
//         const newReturn = new Return({
//             userId, // Populated by authUser middleware
//             orderId,
//             reason,
//             status: 'Pending', // Default status
//         });

//         // Save the new return request in the database
//         const savedReturn = await newReturn.save();

//         // Return success response
//         res.status(201).json({ success: true, data: savedReturn });
//     } catch (error) {
//         console.error('Error:', error.message); // Debugging log for server-side errors
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

export const createReturnRequest = async (req, res) => {
    const { orderId, productId, reason } = req.body;
    const userId = req.body.userId;

    try {
        if (!orderId || !productId || !reason) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        const newReturn = new Return({
            userId,
            orderId,
            productId,
            reason,
            status: 'Pending', // Default status
        });

        const savedReturn = await newReturn.save();
        res.status(201).json({ success: true, data: savedReturn });
    } catch (error) {
        console.error('Error creating return request:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all return requests for the logged-in user
export const getReturnRequests = async (req, res) => {
    const userId = req.body.userId;

    try {
        const returnRequests = await Return.find({ userId });

        if (returnRequests.length === 0) {
            return res.status(404).json({ success: false, message: 'No return requests found' });
        }

        res.status(200).json({ success: true, data: returnRequests });
    } catch (error) {
        console.error('Error fetching return requests:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update return status (approve/reject)
export const updateReturnStatus = async (req, res) => {
    try {
        const { returnId, action } = req.body;

        if (!['approve', 'reject'].includes(action)) {
            return res.status(400).json({ success: false, message: 'Invalid action. Use "approve" or "reject".' });
        }

        const returnRequest = await Return.findById(returnId);

        if (!returnRequest) {
            return res.status(404).json({ success: false, message: 'Return request not found' });
        }

        returnRequest.status = action === 'approve' ? 'Approved' : 'Rejected';
        const updatedReturn = await returnRequest.save();

        res.status(200).json({
            success: true,
            message: `Return request successfully ${action}ed.`,
            data: updatedReturn,
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};
export const approveReturnRequest = async (req, res) => {
    try {
        const { id } = req.params; // Extract return request ID from params
        const returnRequest = await Return.findById(id);

        if (!returnRequest) {
            return res.status(404).json({ success: false, message: 'Return request not found' });
        }

        // Update status to "Approved"
        returnRequest.status = 'Approved';
        await returnRequest.save();

        res.status(200).json({ success: true, message: 'Return request approved' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
export const rejectReturnRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const returnRequest = await Return.findById(id);

        if (!returnRequest) {
            return res.status(404).json({ success: false, message: 'Return request not found' });
        }

        // Update status to "Rejected"
        returnRequest.status = 'Rejected';
        await returnRequest.save();

        res.status(200).json({ success: true, message: 'Return request rejected' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
// Get all return requests for the authenticated user

  
