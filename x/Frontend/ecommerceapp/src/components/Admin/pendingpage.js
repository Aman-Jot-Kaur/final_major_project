import React, { useState,useEffect } from 'react';
import "./adminpage.css"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const PendingPage = () => {
    const [cartOpen, setCartOpen] = useState(false);
    const [products, setProducts] = useState([
    ]);
    const [cart, setCart] = useState([

    
    ]);
    const toggleCart = () => {
        setCartOpen(!cartOpen);
    };
    const navigate=useNavigate();
    useEffect(() => {
      
        const email=localStorage.getItem("mail");
        axios
        .get(`http://localhost:3001/getapproval`).then((res)=>{
            console.log("Vin")
             setProducts(res.data)
             console.log(res.data)
        }).catch(error => {
            console.log( error)
          })
      }, []);
      useEffect(() => {
      
        const email=localStorage.getItem("mail");
        axios
        .get(`http://localhost:3001/getapproval`).then((res)=>{
            console.log("Vin")
             setProducts(res.data)
             console.log(res.data)
        }).catch(error => {
            console.log( error)
          })
      }, [products]);


      const additemtoproducts=(product)=>{
        console.log(product)
        var index = products.indexOf(product)
        setProducts([
            ...products.slice(0, index),
            ...products.slice(index + 1)
          ]);
    axios.post("http://localhost:3001/approveproduct",product).then(
        alert("sent product for approval request")
        
    ) .catch(
        (error)=>{console.log(error)}
       )
    }
    
const user=localStorage.getItem("mail");
    return (
        <div className='maindiv'>
            {/* Navbar */}
            <nav className="navbar">
                <div className="navbar-menu">
                   
                   <button onClick={()=>{navigate(-1)}}>Back</button>
                   
                </div>
            </nav>

            {/* Products */}
            <div className="product-list">
                {/* Display products in divs */}
                {products.length==0 && <h1>No products found</h1>}
                {products.length!=0 && products.map((product) => (
                    <div key={product.id} className="product">
                        <h4>{product.title}</h4>
                        <p>In {product.category}</p>
                        <p>${product.price}</p>
                        <img src={product.images[0]} alt={product.name} />
                        <button className='addtocart' onClick={()=>additemtoproducts(product)}>Add to products</button>
                    </div>
                ))}
            </div>
            

            
        </div>
    );
};

export default PendingPage