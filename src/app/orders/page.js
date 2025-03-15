'use client';

import React, { useEffect, useState } from 'react';
// import { useRouter } from "next/navigation";
import { useAuth } from '../../utils/context/authContext';
import getCompletedOrders from '../../api/orderData';

export default function PreviousOrders() {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();
  // const router = useRouter();

  useEffect(() => {
    if (user?.uid) {
      getCompletedOrders(user.uid)
        .then(setOrders)
        .catch((err) => {
          console.error('Failed to fetch orders:', err);
        });
    }
  }, [user]);

  return (
    <div>
      <h2>Your Previous Orders</h2>
      {orders.length === 0 ? (
        <p>No previous orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
            <h4>Order ID: {order.id}</h4>
            <p>
              <strong>Completion Date:</strong> {new Date(order.completionDate).toLocaleDateString()}
            </p>
            <h5>Products:</h5>
            <ul>
              {order.cartItems.map((item) => (
                <li key={item.id}>
                  {item.product.name} - ${item.product.price} - {item.product.description}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
