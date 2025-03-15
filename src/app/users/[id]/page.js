'use client';

import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'next/navigation';
import { useAuth } from '../../../utils/context/authContext';
import { getSingleUser, getUserProfile } from '../../../api/userData';
import { addToCart, createCart, getCartByUser } from '../../../api/cartData';
import { getUserProducts } from '../../../api/productData';
import MiniProductCard from '../../../components/MiniProductCard';

export default function UserProfile() {
  const [userData, setUserData] = useState([]);
  const [yourUserData, setYourUserData] = useState([]);
  const [cart, setCart] = useState({}); // Store cartId separately
  const [userProducts, setUserProducts] = useState([]);
  const { user } = useAuth();
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
    getUserProfile(user.uid).then(setYourUserData);
  }, []);

  useEffect(() => {
    if (yourUserData && yourUserData.id) {
      getCartByUser(yourUserData.id)
        .then((Cart) => setCart(Cart || {})) // Ensure cart is never undefined
        .catch((error) => console.error('Error fetching cart:', error));
    }
  }, [yourUserData]);

  const handleAddToCart = (productId) => {
    let cartId = cart.id;

    // If no cart exists, create a new one
    if (!cartId) {
      console.log('No cart ID found. Creating a new cart...');

      createCart(userData.id) // Pass userId correctly
        .then((newCart) => {
          cartId = newCart.id;
          return addToCart(cartId, productId);
        })
        .then(() => alert('Product added to cart!'))
        .catch((error) => console.error('Error adding to cart:', error));
    } else {
      // If cart exists, add the product directly
      addToCart(cartId, productId)
        .then(() => alert('Product added to cart!'))
        .catch((error) => console.error('Error adding to cart:', error));
    }
  };

  return (
    <div className="profile">
      <div className="profile-username">{userData.username}&apos;s Profile</div>
      <div className="profile-email">{userData.email}</div>
      <div className="profile-address">Shipping Address: {userData.address || 'None Provided'}</div>
      {/* <button className="orders-btn" type="button" onClick={() => router.push('/user/orders')}>View Past Orders</button> */}
      <div className="d-flex flex-wrap justify-content-md-center">
        {userProducts.map((product) => (
          <MiniProductCard key={product.id} productObj={product} onUpdate={getUserData}>
            <Button onClick={() => handleAddToCart(product.id)}>Add to Cart</Button>
          </MiniProductCard>
        ))}
      </div>
    </div>
  );
}
