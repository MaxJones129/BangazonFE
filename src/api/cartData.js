import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const addToCart = (cartId, productId) =>
  new Promise((resolve, reject) => {
    // First, fetch the active cart for the user
    fetch(`${endpoint}/carts/${cartId}`)
      .then((cartResponse) => {
        if (!cartResponse.ok) {
          throw new Error(`Error fetching cart: ${cartResponse.status} ${cartResponse.statusText}`);
        }
        return cartResponse.json();
      })
      .then((cart) => {
        if (!cart?.id) {
          throw new Error('No active cart found');
        }

        // Now, add the item to the existing cart
        return fetch(`${endpoint}/cart/${cart.id}/add/${productId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId, quantity: 1 }),
        });
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error adding to cart: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch(reject);
  });

const removeFromCart = (userId, productId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/cart/${userId}/remove-product/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, productId }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch(reject);
  });

const createCart = (userId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/carts`, {
      // Ensure the correct API path
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, totalCost: 0, completionDate: null, address: 'Default Address' }),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const getCart = (cartId, userId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/carts/${cartId}`, {
      // Ensure correct API path
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if (response.status === 404) {
          console.warn(`Cart not found for user ${userId}, creating a new one.`);
          return createCart(userId); // Automatically create a new cart
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch(reject);
  });

const getCartByUser = (userId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/carts/user/${userId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if (response.status === 404) {
          console.warn(`Cart not found for user ${userId}`);
          resolve(null); // Resolve with null instead of rejecting
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch(reject);
  });

const getCartItems = (cartId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/cartItems/${cartId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const checkout = (userId, data) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/cart/${userId}/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((Data) => resolve(Data))
      .catch(reject);
  });

export { addToCart, getCart, checkout, getCartItems, removeFromCart, getCartByUser, createCart };
