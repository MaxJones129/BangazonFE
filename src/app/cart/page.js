'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from 'react-bootstrap';
// import Link from 'next/link';
// import { firebase } from '../utils/client';
// import { getProducts } from '../../api/productData';
import CartItemProductCard from '../../components/CartItemProductCard';
import { getCart, getCartItems, removeFromCart, getCartByUser } from '../../api/cartData';
import { getUserProfile } from '../../api/userData';
import { useAuth } from '../../utils/context/authContext';

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [userData, setUserData] = useState({});
  const { user } = useAuth();
  const router = useRouter();
  // const [userCart, setCartProducts] = useState([]);
  // const [user, setUser] = useState(null);

  const handleCheckout = () => {
    router.push('/checkout'); // Navigate to checkout page
  };

  const getCartItemInfo = () => {
    getCartItems(cart.id).then(setProducts);
  };

  useEffect(() => {
    if (user?.uid) {
      getUserProfile(user.uid).then(setUserData);
    }
  }, [user]); // Runs only when `user` changes

  useEffect(() => {
    if (userData && userData.id) {
      // Ensure userData and userData.id exist
      getCartByUser(userData.id)
        .then(setCart)
        .catch((error) => console.error('Error fetching cart:', error));
    }
  }, [userData]);

  // useEffect(() => {
  //   if (userData?.id) {
  //     getCart(cart.id).then(setCart)
  //   }
  // }, [userData]);// Runs only when `userData` changes // Runs only when `userData` is set

  useEffect(() => {
    if (!cart?.id) {
      console.warn('Cart not found');
    }
    if (cart?.id) {
      getCartItems(cart.id).then(setProducts);
    }
  }, [cart]); // Runs only when `cart` is set

  const handleRemoveFromCart = (id, productId) => {
    removeFromCart(id, productId)
      .then(() => {
        getCartItemInfo(); // Refresh cart items
        getCart(userData.id).then(setCart); // Refresh cart itself in case it's empty
      })
      .catch((error) => console.error('Error removing product:', error));
  };

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      {products.length === 0 ? (
        <h1>Your Cart is Empty</h1>
      ) : (
        <>
          <h3>Current Cart ID: {cart?.id}</h3>
          <div className="d-flex flex-wrap justify-content-md-center">
            {products.map((product) => (
              <CartItemProductCard key={product.id} productObj={product} onUpdate={getCartItemInfo}>
                <Button onClick={() => handleRemoveFromCart(userData.id, product.product.id)}>Remove from Cart</Button>
              </CartItemProductCard>
            ))}
          </div>
          <Button variant="success" onClick={handleCheckout} style={{ marginTop: '20px', width: '100%' }}>
            Proceed to Checkout
          </Button>
        </>
      )}
    </div>
  );
}
