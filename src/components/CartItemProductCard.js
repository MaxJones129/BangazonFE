'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

function CartItemProductCard({ productObj, children }) {
  return (
    <Card className="podcastCards" style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{productObj.product.name}</Card.Title>
        <Card.Title>{productObj.product.description}</Card.Title>
        <Card.Title>{productObj.product.price}</Card.Title>
        <Card.Title>{productObj.product.stockQuantity}</Card.Title>
        <Card.Title>{productObj.product.createdAt}</Card.Title>
        {children}
      </Card.Body>
    </Card>
  );
}

CartItemProductCard.propTypes = {
  productObj: PropTypes.shape({
    product: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      price: PropTypes.number,
      stockQuantity: PropTypes.number,
      createdAt: PropTypes.string,
    }),
    // user: PropTypes.shape({
    //   id: PropTypes.number,
    //   username: PropTypes.string,
    // }),
  }),
  children: PropTypes.shape({}).isRequired,
  // onUpdate: PropTypes.func.isRequired,
  // productUser: PropTypes.number.isRequired,
};

export default CartItemProductCard;
