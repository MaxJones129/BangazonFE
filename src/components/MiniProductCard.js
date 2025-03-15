'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

function MiniProductCard({ productObj }) {
  return (
    <Card className="podcastCards" style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{productObj.name}</Card.Title>
        <Card.Title>{productObj.description}</Card.Title>
        <Card.Title>{productObj.price}</Card.Title>
        <Card.Title>{productObj.stockQuantity}</Card.Title>
        <Card.Title>{productObj.createdAt}</Card.Title>
      </Card.Body>
    </Card>
  );
}

MiniProductCard.propTypes = {
  productObj: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    stockQuantity: PropTypes.number,
    createdAt: PropTypes.string,
    // user: PropTypes.shape({
    //   id: PropTypes.number,
    //   username: PropTypes.string,
    // }),
  }).isRequired,
  // onUpdate: PropTypes.func.isRequired,
  // productUser: PropTypes.number.isRequired,
};

export default MiniProductCard;
