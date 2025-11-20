



import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// placing order using cod method

const placeOrder = async(req, res)=>{

    try {
        
        const { userId, items, amount, address} = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        res.json({ success: true, message: "Order Placed"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// placing order using stripe method

const placeOrderStripe = async(req, res)=>{
    
}

// placing order using razorpay method

const placeOrderRazorpay = async(req, res)=>{
    
}

//  all orders data for admin panel
const allOrders = async (req, res)=>{
    try {
        
        const orders = await orderModel.find({})
        res.json({success : true, orders})


    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

//  user order data for frontend
const userOrders = async (req, res)=>{
    try {
        
        const { userId } = req.body
        const orders = await orderModel.find({ userId })
        res.json({success: true, orders})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// update order status from Admin Panel
const updateStatus = async (req, res)=>{
    try {
        const { orderId, status } = req.body

        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({success: true, message: 'Status Updated'})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// Sales data aggregation by month
const getSalesData = async (req, res) => {
    try {
        const salesData = await orderModel.aggregate([
            {
                $project: {
                    year: { $year: { $toDate: "$date" } }, // Extract year
                    month: { $month: { $toDate: "$date" } }, // Extract month
                    amount: 1,
                },
            },
            {
                $group: {
                    _id: { year: "$year", month: "$month" }, // Group by year and month
                    totalSales: { $sum: "$amount" }, // Sum the order amounts
                },
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1 }, // Sort by year and month
            },
        ]);

        // Format the sales data
        const formattedData = salesData.map(item => ({
            month: `${item._id.month}-${item._id.year}`,  // Format month-year
            totalSales: item.totalSales,
        }));

        res.json({ success: true, data: formattedData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

//  export const getMonthlySales = async (req, res) => {
//     try {
//         // Aggregating sales by month
//         const salesData = await orderModel.aggregate([
//             {
//                 // Project the date field to a month-year format (e.g., 2024-01)
//                 $project: {
//                     month: { $month: { $toDate: "$date" } }, // Extract month
//                     year: { $year: { $toDate: "$date" } },   // Extract year
//                     amount: 1, // Include the amount field in the projection
//                 },
//             },
//             {
//                 // Group by year and month
//                 $group: {
//                     _id: { year: "$year", month: "$month" },
//                     totalSales: { $sum: "$amount" }, // Sum the amount field for each group
//                 },
//             },
//             {
//                 // Sort by year and month
//                 $sort: { "_id.year": 1, "_id.month": 1 },
//             },
//             {
//                 // Format the result to return a more readable date format
//                 $project: {
//                     month: "$_id.month",
//                     year: "$_id.year",
//                     totalSales: 1,
//                     _id: 0,
//                 },
//             },
//         ]);

//         // Send the response with the sales data
//         res.json({
//             success: true,
//             data: salesData,
//         });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };

  

  
export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, getSalesData}