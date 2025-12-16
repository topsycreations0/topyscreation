import OrderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Placing orders using COD Method
const placeOrder = async (req,res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new OrderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Stripe temporarily disabled (stub)
const placeOrderStripe = async (_req, res) => {
  return res.status(501).json({ success: false, message: "Stripe payments are disabled" });
};

const verifyStripe = async (_req, res) => {
  return res.status(501).json({ success: false, message: "Stripe payments are disabled" });
};

// All Orders data for Admin Panel
const allOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// User Order Data for Frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await OrderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update Order Status from Admin Panel
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body

        await OrderModel.findByIdAndUpdate(orderId, { status })
        res.json({success:true,message:'Status updated'})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { verifyStripe, placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus };
