'use client';

import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getProducts } from '../api/productData';
import ProductCard from '../components/ProductCard';
import { addToCart, getCartByUser, createCart } from '../api/cartData';
import { getUserProfile } from '../api/userData';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const [products, setProducts] = useState([]);
  const [userData, setUserData] = useState({});
  const [cart, setCart] = useState({}); // Store cartId separately
  const { user } = useAuth();

  useEffect(() => {
    getProducts().then(setProducts);
    getUserProfile(user.uid).then(setUserData);
  }, []);

  useEffect(() => {
    if (userData && userData.id) {
      getCartByUser(userData.id)
        .then((Cart) => setCart(Cart || {})) // Ensure cart is never undefined
        .catch((error) => console.error('Error fetching cart:', error));
    }
  }, [userData]);

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

  const getProductsAgain = () => {
    getProducts().then(setProducts);
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
      <div className="d-flex flex-wrap justify-content-md-center">
        {products.map((product) => (
          <ProductCard key={product.id} productObj={product} onUpdate={getProductsAgain}>
            <Button onClick={() => handleAddToCart(product.id)}>Add to Cart</Button>
          </ProductCard>
        ))}
      </div>
    </div>
  );
}

export default Home;

// 'use client';

// import React, { useEffect, useState } from 'react';
// import { Button } from 'react-bootstrap';
// // import Link from 'next/link';
// // import { firebase } from '../utils/client';
// import { getProducts } from '../api/productData';
// import ProductCard from '../components/ProductCard';
// import { addToCart, getCart } from '../api/cartData';
// import { getUserProfile } from '../api/userData';
// import { useAuth } from '../utils/context/authContext';

// function Home() {
//   const [products, setProducts] = useState([]);
//   const [userData, setUserData] = useState({});
//   const [cartId, setCartId] = useState(null);
//   const { user } = useAuth();
//   // const [userCart, setCartProducts] = useState([]);
//   // const [user, setUser] = useState(null);

//   const getAllProducts = () => {
//     getProducts().then(setProducts);
//   };

//   const getUserInfo= () => {
//     getUserProfile(user.uid).then(setUserData);
//   };

//   useEffect(() => {
//     getAllProducts();
//     getUserInfo();
//   }, []);

//   const handleAddToCart = (id, productId) => {
//     getCart(id, userData.id)  // Ensure user has a cart
//       .then((cartData) => {
//         if (!cartData || !cartData.id) {
//           throw new Error("Cart creation failed.");
//         }
//         return addToCart(cartData.id, productId);
//       })
//       .then(() => alert('Product added to cart!'))
//       .catch((error) => console.error("Error adding to cart:", error));
//   };

//   return (
//     <div
//       className="text-center d-flex flex-column justify-content-center align-content-center"
//       style={{
//         height: '90vh',
//         padding: '30px',
//         maxWidth: '400px',
//         margin: '0 auto',
//       }}
//     >
//       <div className="d-flex flex-wrap justify-content-md-center">
//         {products.map((product) => (
//           <ProductCard key={product.id} productObj={product} onUpdate={getAllProducts}>
//             <Button onClick={() => handleAddToCart(cartData.id, product.id)}>
//               Add to Cart
//             </Button>
//           </ProductCard>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Home;
