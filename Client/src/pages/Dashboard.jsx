import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ShoppingBag, DollarSign, Activity, PackageCheck, Clock, CheckCircle, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

const Dashboard = () => {
  const [data, setData] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    statusBreakdown: [],
    recentOrders: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get('/api/dashboard');
        setData(res.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'RECEIVED': return <Activity className="text-secondary-foreground" size={20} />;
      case 'PROCESSING': return <Clock className="text-amber-500" size={20} />;
      case 'READY': return <CheckCircle className="text-emerald-500" size={20} />;
      case 'DELIVERED': return <Truck className="text-primary" size={20} />;
      default: return <PackageCheck className="text-muted-foreground" size={20} />;
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto animation-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard Overview</h1>
        <Link 
          to="/orders/new" 
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-primary-foreground bg-primary hover:bg-primary/90 transition-all"
        >
          New Order
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Metric Card 1 */}
        <div className="bg-card overflow-hidden rounded-2xl shadow-sm border border-border hover:shadow-md transition-all group">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-primary/10 rounded-xl p-3 group-hover:scale-110 transition-transform">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-muted-foreground truncate">Total Orders</dt>
                  <dd className="text-3xl font-semibold text-card-foreground">{data.totalOrders}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Metric Card 2 */}
        <div className="bg-card overflow-hidden rounded-2xl shadow-sm border border-border hover:shadow-md transition-all group">
          <div className="p-6">
            <div className="flex items-center">
               <div className="flex-shrink-0 bg-emerald-500/10 rounded-xl p-3 group-hover:scale-110 transition-transform">
                <DollarSign className="h-6 w-6 text-emerald-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-muted-foreground truncate">Total Revenue</dt>
                  <dd className="text-3xl font-semibold text-card-foreground">${data.totalRevenue.toFixed(2)}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
          <div className="px-6 py-5 border-b border-border bg-muted/50">
            <h3 className="text-lg leading-6 font-medium text-card-foreground">Recent Orders</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-card">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Customer</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Amount</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                  <th scope="col" className="relative px-6 py-3"><span className="sr-only">View</span></th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-border">
                {data.recentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-muted/50 transition-colors cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-card-foreground">{order.customerName}</div>
                      <div className="text-sm text-muted-foreground">{order.phoneNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-card-foreground">
                      ${order.totalAmount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={cn("px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border", getStatusColor(order.status))}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to="/orders" className="text-primary hover:text-primary/80">View</Link>
                    </td>
                  </tr>
                ))}
                {data.recentOrders.length === 0 && (
                   <tr>
                     <td colSpan="4" className="px-6 py-10 text-center text-muted-foreground">
                        No orders found.
                     </td>
                   </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Status Breakdown */}
        <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
          <div className="px-6 py-5 border-b border-border bg-muted/50">
            <h3 className="text-lg leading-6 font-medium text-card-foreground">Order Status</h3>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              {['RECEIVED', 'PROCESSING', 'READY', 'DELIVERED'].map((status) => {
                const countObj = data.statusBreakdown.find(s => s.status === status);
                const count = countObj ? countObj.count : 0;
                const percentage = data.totalOrders > 0 ? Math.round((count / data.totalOrders) * 100) : 0;
                
                return (
                  <li key={status}>
                    <div className="flex items-center justify-between mb-2">
                       <div className="flex items-center gap-2">
                         {getStatusIcon(status)}
                         <span className="text-sm font-medium text-card-foreground capitalize">{status.toLowerCase()}</span>
                       </div>
                       <span className="text-sm text-muted-foreground font-medium">{count} ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={cn("h-2 rounded-full", getStatusColor(status).split(' ')[0])} 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
