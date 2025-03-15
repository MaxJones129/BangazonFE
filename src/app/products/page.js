// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import ProductCard from '../../components/ProductCard';
// import { getSingleProduct } from '../../api/productData';
// import { useAuth } from '../../utils/context/authContext';
// import { addToCart } from '../../api/orderProductData';

// export default function ProductViewer() {
//   const [products, setProduct] = useState({});
//   const router = useRouter();
//   const { user } = useAuth();

//   const onUpdate = () => {
//     getSingleProduct(router.query.id, user.id).then(setProduct);
//   };

//   const onCartAdd = () => {
//     if (products.inCart < products.quantity) {
//       addToCart(user.id, products.id).then(onUpdate);
//     }
//   };

//   useEffect(() => {
//     onUpdate();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [router.query.id, user]);

//   return (
//     <>
//     <div className="d-flex flex-wrap justify-content-md-center">
//             {products.map((product) => (
//               <ProductCard key={product.id} productObj={product} onCartAdd={onCartAdd} />
//             ))}
//           </div>
//       {/* {product.id && (<ProductDetails product={product} onCartAdd={onCartAdd} />)} */}
//     </>
//   );
// }
