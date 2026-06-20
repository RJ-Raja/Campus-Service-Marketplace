import React, { useEffect, useState } from 'react';
import orderAPI from '../api/orderAPI';

const OrderWorkspace: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const res = await orderAPI.getMyActiveOrders();
      setOrders(res.data.data || []);
    })();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Order Workspace</h1>
      <div className="space-y-4">
        {orders.map((o) => (
          <div key={o._id} className="border rounded p-4">
            <h3 className="font-semibold">Service: {o.serviceId?.title || o.serviceId}</h3>
            <p>Price: ${o.agreedPrice}</p>
            <p>Status: {o.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderWorkspace;
