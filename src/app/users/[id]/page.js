'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getSingleUser } from '../../../api/userData';
import { getUserProducts } from '../../../api/productData';
import MiniProductCard from '../../../components/MiniProductCard';

export default function UserProfile() {
  const [userData, setUserData] = useState([]);
  const [userProducts, setUserProducts] = useState([]);

  const { id } = useParams();

  const getUserProductData = () => {
    getUserProducts(id).then(setUserProducts);
  };

  const getUserData = () => {
    getSingleUser(id).then(setUserData);
  };

  useEffect(() => {
    getUserData();
    getUserProductData();
  }, []);

  return (
    <div className="profile">
      <div className="header">Your Profile</div>
      <div className="profile-username">{userData.username}</div>
      <div className="profile-email">{userData.email}</div>
      <div className="profile-address">Shipping Address: {userData.address || 'None Provided'}</div>
      {/* <button className="orders-btn" type="button" onClick={() => router.push('/user/orders')}>View Past Orders</button> */}
      <div className="d-flex flex-wrap justify-content-md-center">
        {userProducts.map((product) => (
          <MiniProductCard key={product.id} productObj={product} onUpdate={getUserData} />
        ))}
      </div>
    </div>
  );
}
