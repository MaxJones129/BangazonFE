'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { checkout } from '../../api/cartData';
import { getUserProfile } from '../../api/userData';
import getPayments from '../../api/paymentData';

export default function Checkout() {
  const [address, setAddress] = useState('');
  const [paymentId, setPaymentId] = useState(null);
  const [userData, setUserData] = useState({});
  const [paymentTypes, setPaymentTypes] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  // const searchParams = useSearchParams();

  useEffect(() => {
    getUserProfile(user.uid).then(setUserData);
    getPayments().then(setPaymentTypes);
  }, []);

  const userId = userData.id; // Get userId from query params

  if (!userId) {
    return <h2>Error: Missing User ID</h2>; // Handle missing userId
  }

  const handleCheckout = () => {
    checkout(userId, { address, paymentId })
      .then(() => {
        alert('Checkout successful!');
        router.push('/');
      })
      .catch((err) => console.error('Checkout failed:', err));
  };

  return (
    <div>
      <h2>Checkout</h2>
      <input type="text" placeholder="Shipping Address" value={address} onChange={(e) => setAddress(e.target.value)} />
      {/* Payment Type Dropdown */}
      <Form.Group>
        <Form.Label>Payment Method</Form.Label>
        <Form.Select onChange={(e) => setPaymentId(e.target.value)}>
          <option value="">Select a Payment Method</option>
          {paymentTypes.map((payment) => (
            <option key={payment.id} value={payment.id}>
              {payment.paymentName}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Button onClick={handleCheckout}>Complete Purchase</Button>
    </div>
  );
}
