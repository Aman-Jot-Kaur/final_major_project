import React, { useState, useEffect } from "react";
import "./Vendor.css";
import axios from "axios";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getStorage } from "firebase/storage";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

import { useNavigate } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyBlM7dACgX8QSRPU8PsZe7UVtvTqD4saeY",
  authDomain: "ecommerce-e81ca.firebaseapp.com",
  projectId: "ecommerce-e81ca",
  storageBucket: "ecommerce-e81ca.appspot.com",
  messagingSenderId: "518888859936",
  appId: "1:518888859936:web:39d1cacdc4abbbf37e0f45",
  measurementId: "G-QS80JQYRL6",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const VendorProductPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(1);
  const [discounted, setDiscounted] = useState(1);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
 const [imageindex,setimageindex]=useState(0);
 const [images,setimages]=useState([]);
 const [updatedimages,updatedsetimages]=useState([images]);
  const openEditForm = (product) => {
    setSelectedProduct(product);
    setEditFormOpen(true);
  };

  const closeEditForm = () => {
    setSelectedProduct(null);
    setEditFormOpen(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Implement the logic to update the product details on the backend
    // You can use this function to call the backend API to update the product
    const _id = selectedProduct._id;
    if (updatedimages.length != 4) {
      alert("kindly wait as images upload ")
    }
    else{
    axios.post("http://localhost:3001/updateproduct", { _id, title, description, price, discounted, images }).then(
      (res) => {

        console.log("user updated")
      }
      , []).then(() => {
        console.log("added product");
        setTitle("");
        setDescription("");
        setDiscounted();
        setCategory("");
        setPrice();
        toggleCart();
        setCart([]);
        alert("product added");
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("Product edited", selectedProduct);
    closeEditForm();}
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const navigate = useNavigate();

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value * 1);
  };

  const handleDiscountedChange = (e) => {
    setDiscounted(e.target.value * 1);
  };


  const [cartOpen, setCartOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState([

  ]);

  useEffect(() => {
    const email = localStorage.getItem("mail");
    axios
      .get(`http://localhost:3001/getproducts?q=${email}`)
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    const email = localStorage.getItem("mail");
    axios
      .get(`http://localhost:3001/getproducts?q=${email}`)
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [images]);
  useEffect(() => {
    const email = localStorage.getItem("mail");

    axios
      .get(`http://localhost:3001/getproducts?q=${email}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [cart]);

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  function handleUpload(file) {
    if (!file) return;

    const storageRef = ref(storage, `/files/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          images.push(url);
          console.log(images,"images in handle upload");
        });
      }
    );
  }
function handleUpload2(file) {
    if (!file) return;

    const storageRef = ref(storage, `/files/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          let temp_image=[];
         for(let i=0;i<4;i++){
          if(i!==imageindex)
          temp_image.push(images[i])
          else
          temp_image.push(url)
         }
         setimages(temp_image);
        updatedsetimages(images);
          console.log(updatedimages);
          setimages([])
        });
      }
    );
  }
  const handlesubmit = (e) => {
    e.preventDefault();
    console.log(images)
    if (images.length != 4) {
      alert("kindly wait as images upload ")
    }
    else {
      axios.post("http://localhost:3001/addproduct", { images, title, description, category, price, discounted, approved: false, vendor: localStorage.getItem("mail") }).then(() => {
        console.log("added product")
        setTitle('')
        setDescription('')
        setDiscounted()
        setCategory('')
        setPrice()
        toggleCart();
        setCart([]);
        alert("product added")
      }


      ).catch(
        (error) => { console.log(error) }
      )
    }
    return;
  };

  const vendor = () => {
    localStorage.getItem("mail");
    axios
      .post("http://localhost:3001/addproduct", {
        title,
        description,
        category,
        price,
        discounted,
        approved: false,
        vendor,
        images,
      })
      .then(() => {
        console.log("added product");
        setTitle("");
        setDescription("");
        setDiscounted();
        setCategory("");
        setPrice();
        toggleCart();
        setCart([]);
        alert("product added");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const markoutofstock = (product) => {
    console.log(product);
    axios
      .post("http://localhost:3001/markoutofstock", { _id: product._id })
      .then(alert("product marked out of stock"))
      .catch((error) => {
        console.log(error);
      });
  };

  const additemtoproducts = (product) => {
    console.log(product);
    axios
      .post("http://localhost:3001/sendforapproval", product)
      .then(alert("sent product for approval request"))
      .catch((error) => {
        console.log(error);
      });
  };

  // JSX code
  return (
    <div className="maindiv">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-menu">
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="outofstock"
          >
            Back
          </button>
          <div className="shopping-cart">
            {/* Shopping cart */}
            <button className="navbutton" onClick={toggleCart}>
              Add new product
            </button>
            {/* Cart content */}
            {cartOpen && (
              <div
                style={{ padding: "20px", background: "white",marginTop:"120%" }}
                className="edit-form-container"
                id="addproductform"
              >
                <button className="close-button" onClick={toggleCart}>
                  Close
                </button>
                <form onSubmit={handlesubmit}>
                  <input
                    onChange={handleTitleChange}
                    type="text"
                    name="title"
                    required
                    placeholder="product title"
                  ></input>
                  <input
                    onChange={handleDescriptionChange}
                    type="text"
                    name="description"
                    placeholder="product description"
                  ></input>
                  <input
                    onChange={handleCategoryChange}
                    type="text"
                    name="category"
                    placeholder="product category"
                  ></input>

                  <input
                    style={{ width: "255px", height: "40px" }}
                    className="numinput"
                    onChange={handlePriceChange}
                    type="number"
                    required
                    name="price"
                    placeholder="product price"
                  ></input>
                  <input
                    style={{ width: "255px", height: "40px" }}
                    className="numinput"
                    onChange={handleDiscountedChange}
                    type="number"
                    name="discounted"
                    placeholder="discounted price"
                  ></input>
                  <div style={{ width: "200px" }}>
                   
                    <input
                      type="file"
                      onChange={(e) => handleUpload(e.target.files[0])}
                      accept="image/*"
                    />
                    <input
                      type="file"
                      onChange={(e) => handleUpload(e.target.files[0])}
                      accept="image/*"
                    />
                    <input
                      type="file"
                      onChange={(e) => handleUpload(e.target.files[0])}
                      accept="image/*"
                    />
                    <input
                      type="file"
                      onChange={(e) => handleUpload(e.target.files[0])}
                      accept="image/*"
                    />
                  </div>
                  <input type="submit"></input>
                </form>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Products */}
      <div className="product-list">
        {/* Display products in divs */}
        {products.length == 0 && <h1>no products yet</h1>}
        {products.length != 0 &&
          products.map((product) => (
            <div key={product._id} className="product">
              {!product.approved && (
                <button className="editing-button" onClick={() => openEditForm(product)}>
                  Edit
                </button>
              )}
              <h4>{product.title}</h4>
              <p>In {product.category}</p>
              <p>${product.price}</p>

              <img src={product.images[0]} alt={product.title} />
              {console.log(products)}
              {product.approved == false && product.outofstock != "true" ? (
                <button
                  className="addtocart"
                  onClick={() => additemtoproducts(product)}
                >
                  Send for approval
                </button>
              ) : (
                <button
                  className="vendorbutton"
                  style={{ backgroundColor: "green" }}
                >
                  approved
                </button>
              )}
              {product.approved == true && product.outofstock != "true" && (
                <button
                  className="vendorbutton"
                  onClick={() => markoutofstock(product)}
                  style={{ backgroundColor: "black" }}
                >
                  Mark out of stock
                </button>
              )}
              {product.approved == true && product.outofstock == "true" && (
                <button className="addtocart" style={{ backgroundColor: "gray" }}>
                  out of stock
                </button>
              )}
            </div>
          ))}
      </div>
      {
        editFormOpen && selectedProduct && (
          <div className="edit-form-container">
            <form onSubmit={handleEditSubmit}>
              <h3>Edit Product</h3>
              <label htmlFor="title">Title:</label>
              <input
                onChange={handleTitleChange}
                type="text"
                name="title"
                value={selectedProduct.title}
                required
                placeholder="Product Title"
              />
              <label htmlFor="description">Description:</label>
              <input
                onChange={handleDescriptionChange}
                type="text"
                name="description"
                value={selectedProduct.description}
                placeholder="Product Description"
              />
              <label htmlFor="category">Category:</label>
              <input
                onChange={handleCategoryChange}
                type="text"
                name="category"
                value={selectedProduct.category}
                placeholder="fashion/tech/arts"
              />
              <label htmlFor="price">Price:</label>
              <input
                onChange={handlePriceChange}
                type="number"
                name="price"
                value={selectedProduct.price}
                required
                placeholder="Product Price"
              />
              <label htmlFor="discounted">Discounted Price:</label>
              <input
                onChange={handleDiscountedChange}
                type="number"
                name="discounted"
                value={selectedProduct.discounted}
                placeholder="Discounted Price"
              />
              <div >
                <div ><img src={selectedProduct.images[0]} style={{margin:"5px",width:"100px",height:"100px"}}></img>
                <img src={selectedProduct.images[1]} style={{width:"100px",height:"100px"}}></img>
                 <img src={selectedProduct.images[2]} style={{width:"100px",height:"100px"}}></img>
                  <img src={selectedProduct.images[3]} style={{width:"100px",height:"100px"}}></img></div>
                 <div>
                <input

                  type="file"
                  onChange={(e) => {handleUpload2(e.target.files[0]);
                    setimageindex(0);
                 }}
                  accept="image/*"
                />
                 
                <input

                  type="file"
                  onChange={(e) => {handleUpload2(e.target.files[0]);     setimageindex(1);}}
                  accept="image/*"
                />
                
                <input

                  type="file"
                  onChange={(e) => {handleUpload2(e.target.files[0]);     setimageindex(2);}}
                  accept="image/*"
                />
                
                <input

                  type="file"
                  onChange={(e) => {handleUpload2(e.target.files[0]);     setimageindex(3);}}
                  accept="image/*"
                />
                </div>
                {/* Add input fields for other images if needed */}
              </div>
              <div className="edit-form-buttons">
                <button type="submit">Save</button>
                <button onClick={closeEditForm}>Cancel</button>
              </div>
            </form>
          </div>
        )
      }
    </div>
  );
}

export default VendorProductPage;

