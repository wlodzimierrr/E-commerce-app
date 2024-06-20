import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import Incrementer from '../components/incrementer';
import { addItem } from '../store/cart/cart.actions';
import { loadProduct } from '../store/products/products.action';
import { Card, Breadcrumb, Button } from 'antd';

function ProductDetails() {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const product = products[productId];
  const imageUrls = product?.img_link ?? [];
  const [heroImg, setHeroImg] = useState(imageUrls.length > 0 ? imageUrls[0] : 'path/to/placeholder.jpg');

  useEffect(() => {
    if (!products[productId]) {
      (async function load() {
        await dispatch(loadProduct(productId));
      })();
    }
  }, [dispatch, productId, products]);

  function handleAddToCart() {
    if (product && quantity > 0) {
      dispatch(addItem({ product, quantity }))
      .catch(err => console.error("Failed to add item to cart", err));
    } else {
      console.error('Product or quantity is undefined or quantity is less than 1', { product, quantity });
    }
  }

  return (
    <div className="p-4 md:p-12">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Product</Breadcrumb.Item>
      </Breadcrumb>
      <section className="flex flex-col md:flex-row">
        <div className="flex-1">
          <div className="flex justify-center mt-2.5">
            <img src={heroImg} className="max-w-full max-h-96" alt="" />
          </div>
          <div className="flex flex-row justify-center gap-2.5 mt-5">
            {imageUrls.map((url, index) => (
              <div key={index} className="cursor-pointer" onClick={() => setHeroImg(url)}>
                <img src={url} alt={`Thumbnail ${index}`} className="w-24 h-auto" />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:ml-10">
          <Card title={<Typography variant="h5">{product?.name}</Typography>} className="w-full">
            <Typography variant="subtitle1">{product?.description}</Typography>
          </Card>
          <Card className="mt-5">
            <Typography variant="h6">Buy now: {product?.price}</Typography>
            <Incrementer onDecrement={() => setQuantity(Math.max(1, quantity - 1))} onIncrement={() => setQuantity(quantity + 1)} value={quantity} />
            <Button type="primary" ghost onClick={handleAddToCart} className="mt-2.5">
              Add to Cart
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
}

export default ProductDetails;
