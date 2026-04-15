import express from 'express';
import Order from '../models/Order.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/dashboard
// @desc    Get dashboard metrics
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const totalOrdersCount = await Order.countDocuments({});
    
    const orders = await Order.find({});
    const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);

    const statusBreakdown = await Order.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const formattedStatusBreakdown = statusBreakdown.map(status => ({
      status: status._id,
      count: status.count
    }));

    const recentOrders = await Order.find({}).sort({ createdAt: -1 }).limit(5);

    res.json({
      totalOrders: totalOrdersCount,
      totalRevenue,
      statusBreakdown: formattedStatusBreakdown,
      recentOrders
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;