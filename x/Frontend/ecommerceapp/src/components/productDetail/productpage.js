import React, { useState, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';
import { useNavigate } from 'react-router-dom';
import 'react-image-gallery/styles/css/image-gallery.css';
import './productpage.css';
import axios from 'axios';
const Productdetail = () => {
  const getRandomImageUrl = () => {
    // Replace this logic with your own to fetch random images from the internet
    const images = [
      {
        original: 'https://picsum.photos/id/1018/1000/600/',
        thumbnail: 'https://picsum.photos/id/1018/250/150/',
      },
      {
        original: 'https://picsum.photos/id/1015/1000/600/',
        thumbnail: 'https://picsum.photos/id/1015/250/150/',
      },
      {
        original: 'https://picsum.photos/id/1019/1000/600/',
        thumbnail: 'https://picsum.photos/id/1019/250/150/',
      },
    ];
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  const generateRandomImages = () => {
    const images = [];
    for (let i = 0; i < 3; i++) {
      const imageUrl = getRandomImageUrl();
      images.push({
        original: imageUrl,
        thumbnail: imageUrl,
      });
    }
    return images;
  };

  const [images, setImages] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(9.99);
  const [cart, setCart] = useState([]);
  const product = JSON.parse(localStorage.getItem("product"))
  const imageslink = [
    {
      original: product.images[0],
      thumbnail: product.images[0],
      originalClass: 'image-gallery-image',
      thumbnailClass: 'image-gallery-thumbnail',
    },
    {
      original: product.images[1],
      thumbnail: product.images[1],
      originalClass: 'image-gallery-image',
      thumbnailClass: 'image-gallery-thumbnail',
    },
    {
      original: product.images[2],
      thumbnail: product.images[2],
      originalClass: 'image-gallery-image',
      thumbnailClass: 'image-gallery-thumbnail',
    },
  ];
  const vendorName = product.vendor;
  const p = product.price * 1;
  const expectedDeliveryDate = 'July 20, 2023';
  const handleAddToCart = () => {
    let temporary = [...cart, product];
    console.log(temporary)
    const email = localStorage.getItem("mail");

    axios.post("http://localhost:3001/cart", { cart: temporary, email }).then(
      alert("cart updated")
    ).catch(error => {
      console.log(error)
    })
  }
  useEffect(() => {
    console.log("Vin")
    const email = localStorage.getItem("mail");
    axios
      .get(`http://localhost:3001/getcart?q=${email}`).then((res) => {
        console.log("Vin")
        setCart[res.data.cart]

      }).catch(error => {
        console.log(error)
      })
  }, []);
  const handleQuantityChange = (event) => {
    const newQuantity = Number(event.target.value);
    setQuantity(newQuantity);

  };

  const navigate = useNavigate();

  return (
    <div style={{ display: "flex" }}>
      <div className="slider-page">

        <div className="content">
          <div className="slider-container">
            <ImageGallery showPlayButton={false} items={imageslink} />
          </div>
          <div className="sidebar" style={{ fontSize: "20px" }}>
            <h2>Product Details</h2>
            <h3>Title : {product.title}</h3>
            <p>Vendor: {product.vendor}</p>
            <p>Description:{product.description}</p>
            <p>Cost:{p * quantity}$</p>
            <p>Category : {product.category}</p>
            <div className="quantity-input">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
              />
            </div>
            <button style={{ backgroundColor: "Green" }} onClick={handleAddToCart}>Add to Cart</button>
            <button style={{ backgroundColor: "gray" }} onClick={() => { navigate(-1) }}>Continue browsing</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productdetail;
