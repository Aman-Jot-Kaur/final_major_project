import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "./customer.css"
import axios from 'axios';
const CustomerPage = () => {
    const [cartOpen, setCartOpen] = useState(false);
    const [products, setProducts] = useState([

    ]);
    const [cart, setCart] = useState([

    ]);
    const [pic, setPic] = useState();
    const [filteredProducts, setfilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const handleCategorySelect = (category) => {
        setSelectedCategory(category.toLowerCase());
        setfilteredProducts(selectedCategory
            ? products.filter(
                (product) => product.category.toLowerCase() === selectedCategory
            )
            : products)
    };
    useEffect(() => {
        setfilteredProducts(
            selectedCategory
                ? products.filter(
                    (product) => product.category.toLowerCase() === selectedCategory
                )
                : products
        );
    }, [selectedCategory]);
    const navigate = useNavigate();
    const toggleCart = () => {
        setCartOpen(!cartOpen);
    };
    const [address, setAddress] = useState();
    useEffect(() => {
        const mail = localStorage.getItem("mail");
        console.log("mail", mail)
        axios.post("http://localhost:3001/getuser", { mail }).then(
            (res) => {
                const user = res.data;

                setAddress(user.address)
                console.log(user.profile,"pro")
                 user.profile.length != 0 && setPic(user.profile) 
                
                user.profile.length==0 && setPic("https://img.freepik.com/free-vector/cheerful-cute-girl-character-hand-drawn-cartoon-art-illustration_56104-968.jpg?w=2000")
                
                console.log("asd", address)
            })
    }, [])
    const handleLogoutbtn = () => {
        localStorage.setItem("mail", "");

        localStorage.setItem("loggedin", 'false');
        firebase.auth().signOut().then(function () {
            alert("signed out")
        }).catch(function (error) {
            alert(error)
        });
        navigate("/login")
    }
    const productclick = (product) => {
        localStorage.setItem("product", JSON.stringify(product));
        console.log(product)
        navigate("/productdetail")
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
    useEffect(() => {
        axios
            .get(`http://localhost:3001/getavailableproducts`).then((res) => {
                console.log("Vin2")
                setProducts(res.data)
            }).catch(error => {
                console.log(error)
            })
    }, [])


    const additemtocart = (product) => {

        let temporary = [...cart, product];
        console.log(temporary)
        const email = localStorage.getItem("mail");

        axios.post("http://localhost:3001/cart", { cart: temporary, email }).then(
            alert("cart updated")
        ).catch(error => {
            console.log(error)
        })


    }
    //getavailableproducts
    const cartpageopen = () => {
        navigate("/cart")
    }
    return (
        <div className='maindiv'>
            {/* Navbar */}
            <nav className="navbar">
                <div className="navbar-menu">
                    <img style={{ width: "200px", height: "150px", marginTop: "-20px" }} src="https://th.bing.com/th/id/OIP.9V_BtTHUgL3hGdNwLUbhgwHaFr?pid=ImgDet&w=235&h=180&rs=1" />





                    <button onClick={() => { navigate("/orderhistory") }} className='orderss'>Orders</button>

                    <div className="shopping-cart" style={{ display: "flex", gap: "10px" }}>
                        {/* Shopping cart */}

                        <div className="avatar">
                            {/* Avatar picture */}
                            {pic!==undefined &&  <img onClick={() => { navigate("/profile") }} style={{ marginTop: "-2%" }} src={pic} alt="Avatar" />}
                           
                        </div>

                        {address == undefined && <button className="new" onClick={() => { navigate("/profile") }} style={{ backgroundColor: "#749da1", color: "white" }}>Add address to view cart</button>}
                        {address != undefined && <img style={{ height: "60px" }} src="https://cdn3.iconfinder.com/data/icons/business-and-office-paper-vol-2/150/cart__shopping__baby__ecommerce-512.png"
                            onClick={cartpageopen}></img>}
                        {/* Cart content */}
                        {cartOpen && (
                            <div className="cart-content">
                                <button style={{ backgroundColor: "red", width: "30px", marginRight: "10%" }} onClick={toggleCart}>x</button>
                                <ul>
                                    {/* List of products in the cart */}
                                    {cart.map((product) => (
                                        <li key={product._id}>
                                            <div style={{ display: "flex", gap: "20px" }}>
                                                <p>{product.title}</p>
                                                <p> ${product.price}</p>
                                                <img style={{ backgroundColor: "#fff", marginBottom: "10px", right: "60px", height: "30px", width: "30px" }} className='addtocart' src="https://th.bing.com/th/id/OIP.Q9t4awyuirh3UwXfTFzGSgHaHa?pid=ImgDet&rs=1"></img>
                                                <button style={{ backgroundColor: "#d3d3d3", marginBottom: "10px", right: "60px", height: "40px", width: "70px" }} className='addtocart'>Buy</button>

                                            </div>



                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                    </div>
                </div>
                <button onClick={handleLogoutbtn} className="logout-button">Logout</button>
            </nav>

            <div className="displayimage" style={{ display: "flex", gap: "60px", textAlign: "center" }}>
                <img style={{ width: "100vw" }} src="https://i.pinimg.com/originals/6f/39/35/6f393516f4f2876c5ff1b8ddcf57c638.jpg"></img>


            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "60px", marginTop: "20px" , marginLeft:"10%"}}>
                <div className="category" style={{
                    width: "400px", height: "300px", boxShadow: '0 40px 80px #FBE4E0',
                    borderRadius: '14px', alignContent: "center"
                }} onClick={() => handleCategorySelect('arts')}>
                    <p>Arts</p>
                    <img style={{ width: "150px", height: "200px" }} src="https://th.bing.com/th/id/OIP.rRGeXimNK5RfUuOSPq9DsQHaH1?pid=ImgDet&rs=1" alt="Arts" />
                </div>
                <div className="category" style={{
                    width: "400px", height: "300px", boxShadow: '0 40px 80px #FBE4E0',
                    borderRadius: '14px'
                }} onClick={() => handleCategorySelect('fashion')}>
                    <p>Fashion</p>
                    <img style={{ width: "150px", height: "200px" }} src="https://i.pinimg.com/originals/ec/f1/e1/ecf1e1f80c28b4cce023e6b55bc0f0b1.jpg" alt="Fashion" />
                </div>
                <div className="category" style={{
                    width: "400px", height: "300px", boxShadow: '0 40px 80px #FBE4E0',
                    borderRadius: '14px'
                }} onClick={() => handleCategorySelect('tech')}>
                    <p>Tech</p>
                    <img style={{ width: "150px", height: "200px" }} src="https://th.bing.com/th/id/OIP.hxKWlnED8Suu3exNpJuTJgHaHa?w=218&h=218&c=7&r=0&o=5&pid=1.7" alt="Tech" />
                </div>
            </div>
            {filteredProducts.size != 0 && <div>
                <p style={{ marginLeft: "40%", fontSize: "32px" }}>{selectedCategory}</p>
                <div className="product-list">
                    {/* Display products in divs */}
                    {filteredProducts.map((product) => (
                        <div key={product._id} className="product">
                            <h2 style={{fontFamily:"cursive",color:"gray"}}>{product.title}</h2>
                            <p>In {product.category}</p>

                            <p>${product.price}</p>
                            <img src={product.images[0]} alt={product.name} />
                            {product.outofstock != "true" && <button  style={{ backgroundColor: "green" }} className='addtocart' onClick={() => { productclick(product) }}>view details</button>}
                            {product.outofstock != "true" && <button className='addtocart' onClick={() => additemtocart(product)}>Add to cart</button>}
                            {product.outofstock == "true" && <button className='outofstock' >Sorry out of stock</button>}
                        </div>
                    ))}</div>
            </div>}
            {/* Products */}
            {/* Products */}
            <p style={{ marginLeft: "40%", fontSize: "32px" }}>All products</p>
            <div className="product-list" >
                {/* Display products in divs */}
                {products.map((product) => (
                    <div key={product._id} className="product" >
                        <h2 style={{fontFamily:"cursive",color:"gray"}}>{product.title}</h2>
                        <p>In {product.category}</p>
                        <p>${product.price}</p>
                        <img src={product.images[0]} alt={product.title} />
                        {product.outofstock != "true" && <button style={{ backgroundColor: "green" }} className='addtocart' onClick={() => { productclick(product) }}>view details</button>}
                        {product.outofstock != "true" && <button className='addtocart' onClick={() => additemtocart(product)}>Add to cart</button>}
                        {product.outofstock == "true" && <button className='outofstock'>Sorry out of stock</button>}
                    </div>
                ))}
            </div>
        </div>

    );
};

export default CustomerPage;
