'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';
import Link from 'next/link';
// import { useAuth } from '../utils/context/authContext';
// import { addToCart } from '../api/cartData';

// function ProductCard({ productObj, onUpdate, podcastUser }) {
function ProductCard({ productObj, children }) {
  // const { user } = useAuth();

  // const deleteThisPodcast = () => {
  //   if (window.confirm(`Delete ${podObj.title}?`)) {
  //     deletePod(podObj.id).then(() => onUpdate());
  //   }
  // };

  // const handleAddToCart = (id, productId) => {
  //   addToCart(id, productId).then(() => alert('Product added to cart!'));
  // };

  return (
    <Card className="podcastCards" style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{productObj.name}</Card.Title>
        <Card.Title>{productObj.description}</Card.Title>
        <Card.Title>${productObj.price}</Card.Title>
        <Card.Title># In Stock {productObj.stockQuantity}</Card.Title>
        {/* <Card.Title>{productObj.createdAt}</Card.Title> */}
        <Link passHref href={`/users/${productObj.user.id}`}>
          {productObj.user.username}
        </Link>
        <div>{children}</div>
        {/* <Button onClick={() => handleAddToCart(user.id, productObj.id)}>
          Add to Cart
        </Button> */}
      </Card.Body>
    </Card>
  );
}

ProductCard.propTypes = {
  productObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    stockQuantity: PropTypes.number,
    createdAt: PropTypes.string,
    user: PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string,
    }),
  }),
  children: PropTypes.shape({}).isRequired,
  // onUpdate: PropTypes.func.isRequired,
  // productUser: PropTypes.number.isRequired,
};

export default ProductCard;
