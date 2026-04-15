import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Filter } from 'lucide-react';
import { cn } from '../lib/utils';

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const fetchOrders = async () => {
    try {
      setLoading(true);
      let url = 'http://localhost:5000/api/orders?';
      if (search) url += `search=${search}&`;
      if (statusFilter) url += `status=${statusFilter}`;
      
      const res = await axios.get(url);
      setOrders(res.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // debounce search
    const delayDebounceFn = setTimeout(() => {
      fetchOrders();
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [search, statusFilter]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/orders/${orderId}/status`, { status: newStatus });
      setOrders(orders.map(order => order._id === orderId ? { ...order, status: newStatus } : order));
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'RECEIVED': return 'bg-muted text-foreground border-border';
      case 'PROCESSING': return 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 border-amber-200 dark:border-amber-500/30';
      case 'READY': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30';
      case 'DELIVERED': return 'bg-primary/10 text-primary border-primary/20';
      default: return 'bg-muted text-foreground border-border';
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animation-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Orders Management</h1>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search customer, phone..."
              className="block w-full pl-10 pr-3 py-2 border border-input rounded-lg leading-5 bg-background placeholder-muted-foreground text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-all shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="relative inline-block text-left">
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border border-input focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-lg shadow-sm bg-background text-foreground"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="RECEIVED">Received</option>
              <option value="PROCESSING">Processing</option>
              <option value="READY">Ready</option>
              <option value="DELIVERED">Delivered</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-card shadow-sm rounded-2xl border border-border overflow-hidden">
        {loading && orders.length === 0 ? (
          <div className="p-10 text-center text-muted-foreground flex justify-center items-center gap-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
            Loading orders...
          </div>
        ) : (
          <div className="overflow-x-auto min-h-[400px]">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-muted/50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Order ID & Date</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Customer Info</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Items & Total</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Delivery Date</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status Actions</th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-border">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-foreground">...{order._id.slice(-6)}</div>
                      <div className="text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-foreground">{order.customerName}</div>
                      <div className="text-sm text-muted-foreground">{order.phoneNumber}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-foreground">{order.garments.length} item(s)</div>
                      <div className="text-sm font-bold text-emerald-500">${order.totalAmount.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                      {new Date(order.estimatedDeliveryDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        className={cn(
                          "block w-full pl-3 pr-8 py-1.5 text-sm font-medium rounded-full border-0 shadow-sm focus:ring-2 focus:ring-primary appearance-none cursor-pointer",
                          getStatusColor(order.status)
                        )}
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      >
                        <option value="RECEIVED">Received</option>
                        <option value="PROCESSING">Processing</option>
                        <option value="READY">Ready</option>
                        <option value="DELIVERED">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                   <tr>
                     <td colSpan="5" className="px-6 py-12 text-center text-muted-foreground text-lg">
                        <div className="flex flex-col items-center justify-center gap-2">
                           <Filter className="h-8 w-8 opacity-50" />
                           <span>No orders match your criteria.</span>
                        </div>
                     </td>
                   </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersList;
