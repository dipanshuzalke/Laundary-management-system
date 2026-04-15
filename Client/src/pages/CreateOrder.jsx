import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Trash2, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

const CreateOrder = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    estimatedDeliveryDate: '',
  });
  
  const [garments, setGarments] = useState([
    { type: 'Shirt', quantity: 1, price: 5 }
  ]);

  const GARMENT_TYPES = [
    { name: 'Shirt', defaultPrice: 5 },
    { name: 'Pants', defaultPrice: 6 },
    { name: 'Suit', defaultPrice: 15 },
    { name: 'Dress', defaultPrice: 12 },
    { name: 'Bed Sheet', defaultPrice: 8 },
    { name: 'Blanket', defaultPrice: 20 },
    { name: 'Other', defaultPrice: 0 }
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGarmentChange = (index, field, value) => {
    const newGarments = [...garments];
    newGarments[index][field] = value;
    
    // Auto-update price based on type
    if (field === 'type') {
      const typeInfo = GARMENT_TYPES.find(t => t.name === value);
      if (typeInfo) {
        newGarments[index]['price'] = typeInfo.defaultPrice;
      }
    }
    
    setGarments(newGarments);
  };

  const addGarment = () => {
    setGarments([...garments, { type: 'Shirt', quantity: 1, price: 5 }]);
  };

  const removeGarment = (index) => {
    if (garments.length > 1) {
      const newGarments = garments.filter((_, i) => i !== index);
      setGarments(newGarments);
    }
  };

  const totalAmount = garments.reduce((acc, curr) => acc + (Number(curr.quantity) * Number(curr.price)), 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const payload = {
      ...formData,
      garments,
      totalAmount
    };

    try {
      await axios.post('/api/orders', payload);
      setSuccess(true);
      setTimeout(() => {
        navigate('/orders');
      }, 1500);
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order.');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] animation-fade-in">
        <CheckCircle2 className="w-20 h-20 text-emerald-500 mb-4" />
        <h2 className="text-3xl font-bold text-foreground mb-2">Order Created!</h2>
        <p className="text-muted-foreground">Redirecting to orders list...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animation-fade-in">
      <div className="mb-8 font-semibold">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Create New Order</h1>
        <p className="text-muted-foreground mt-1">Enter customer information and garment details.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Customer Information Section */}
        <div className="bg-card shadow-sm rounded-2xl border border-border p-6 sm:p-8">
          <h2 className="text-xl font-medium text-card-foreground mb-6 border-b border-border pb-2">Customer Information</h2>
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            <div>
              <label htmlFor="customerName" className="block text-sm font-medium text-foreground">Full Name</label>
              <div className="mt-1">
                <input
                  type="text"
                  name="customerName"
                  id="customerName"
                  required
                  className="block w-full shadow-sm rounded-lg bg-background text-foreground border-input px-4 py-2 border focus:ring-primary focus:border-primary sm:text-sm"
                  value={formData.customerName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-foreground">Phone Number</label>
              <div className="mt-1">
                <input
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  required
                  className="block w-full shadow-sm rounded-lg bg-background text-foreground border-input px-4 py-2 border focus:ring-primary focus:border-primary sm:text-sm"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="estimatedDeliveryDate" className="block text-sm font-medium text-foreground">Estimated Delivery Date</label>
              <div className="mt-1">
                <input
                  type="date"
                  name="estimatedDeliveryDate"
                  id="estimatedDeliveryDate"
                  required
                  className="block w-full shadow-sm rounded-lg bg-background text-foreground border-input px-4 py-2 border focus:ring-primary focus:border-primary sm:text-sm"
                  value={formData.estimatedDeliveryDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Garments Section */}
        <div className="bg-card shadow-sm rounded-2xl border border-border p-6 sm:p-8 relative overflow-hidden">
          {/* Decorative subtle background for bill section */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex items-center justify-between mb-6 border-b border-border pb-2 relative z-10">
             <h2 className="text-xl font-medium text-card-foreground">Garments</h2>
             <button
                type="button"
                onClick={addGarment}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-full shadow-sm text-secondary-foreground bg-secondary hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-colors"
             >
                <PlusCircle size={16} className="mr-1.5" />
                Add Item
             </button>
          </div>

          <div className="space-y-4 relative z-10">
            {garments.map((garment, index) => (
              <div key={index} className="flex flex-col sm:flex-row items-center gap-4 bg-muted/30 p-4 rounded-xl border border-border transition-all hover:border-input">
                <div className="w-full sm:w-1/3">
                  <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Item Type</label>
                  <select
                    className="block w-full shadow-sm rounded-lg bg-background text-foreground border-input px-3 py-2 border focus:ring-primary focus:border-primary sm:text-sm"
                    value={garment.type}
                    onChange={(e) => handleGarmentChange(index, 'type', e.target.value)}
                  >
                    {GARMENT_TYPES.map(type => (
                      <option key={type.name} value={type.name}>{type.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="w-full sm:w-1/4">
                  <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    className="block w-full shadow-sm rounded-lg bg-background text-foreground border-input px-3 py-2 border focus:ring-primary focus:border-primary sm:text-sm"
                    value={garment.quantity}
                    onChange={(e) => handleGarmentChange(index, 'quantity', Number(e.target.value))}
                  />
                </div>

                <div className="w-full sm:w-1/4">
                  <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Unit Price ($)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className="block w-full shadow-sm rounded-lg bg-background text-foreground border-input px-3 py-2 border focus:ring-primary focus:border-primary sm:text-sm"
                    value={garment.price}
                    onChange={(e) => handleGarmentChange(index, 'price', Number(e.target.value))}
                  />
                </div>

                <div className="w-full sm:w-auto h-full flex items-end justify-center pb-1">
                  <button
                    type="button"
                    title="Remove item"
                    disabled={garments.length === 1}
                    onClick={() => removeGarment(index)}
                    className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-border flex items-center justify-between relative z-10">
            <span className="text-lg font-medium text-muted-foreground">Total Estimated Bill:</span>
            <span className="text-3xl font-extrabold text-emerald-500 block">
               ${totalAmount.toFixed(2)}
            </span>
          </div>

        </div>

        {/* Global Save Action */}
        <div className="flex justify-end pt-5">
           <button
            type="submit"
            disabled={loading || garments.length === 0}
            className="inline-flex justify-center py-3 px-8 border border-transparent shadow-md shadow-primary/20 text-lg font-medium rounded-xl text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Create Order'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateOrder;
