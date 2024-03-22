import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Incrementer from '../components/incrementer';
import { addItem } from '../store/cart/cart.actions';
import { loadProduct } from '../store/products/products.action';
import { Card, Breadcrumb, Layout, Button } from 'antd';

const { Content } = Layout;

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

    <Content
    style={{
      padding: '0 48px',
    }}
  >
    <Breadcrumb
      style={{
        margin: '16px 0',
      }}
    >
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>Product</Breadcrumb.Item>
      <Breadcrumb.Item></Breadcrumb.Item>
    </Breadcrumb>
    <section className="product-details-container">
      <div className="product-img-container">
        <div className="product-hero-img" style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <img className="hero-img" src={heroImg} style={{ maxWidth: '50%', maxHeight: '50%' }} alt="" />
        </div>
        <div className="product-img-bar" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
          {imageUrls.map((url, index) => (
            <div key={index} className="alt-product-img-container" onClick={() => setHeroImg(url)} style={{ cursor: 'pointer' }}>
              <img src={url} alt={`Thumbnail ${index}`} style={{ width: '100px', height: 'auto' }} />
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '20px', gap: '10px' }}>
        <div className="product-info-container" style={{ flexGrow: 1 }}>
          <Card title={<Typography variant="h3">{product.name}</Typography>} style={{ width: '100%' }}>
            <Typography variant="h6">{product.description}</Typography>
          </Card>
        </div>
        <div className="product-price-container" style={{ flexShrink: 0, width: 300 }}>
          {product && (
            <Card>
              <Typography variant="h6">Buy now: {product.price}</Typography>
              <Incrementer onDecrement={() => setQuantity(quantity - 1)} onIncrement={() => setQuantity(quantity + 1)} value={quantity} />
              <Button type="primary" ghost onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </Card>
          )}
        </div>
      </div>
    </section>
  </Content>
  );
}

export default ProductDetails;
