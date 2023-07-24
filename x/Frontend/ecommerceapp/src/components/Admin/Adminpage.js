import React, { useState, useEffect } from 'react';
import "./adminpage.css"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const AdminPage = () => {
    const [cartOpen, setCartOpen] = useState(false);
    const [products, setProducts] = useState([

    ]);
    const navigate = useNavigate();
    const [cart, setCart] = useState([

    ]);
    const [address, setAddress] = useState();
    const [pic, setPic] = useState();

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [filteredProducts, setfilteredProducts] = useState([]);
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
    useEffect(() => {
        const mail = localStorage.getItem("mail");
        console.log("mail", mail)
        axios.post("http://localhost:3001/getuser", { mail }).then(
            (res) => {
                const user = res.data;

                setAddress(user.address)
                { user.profile != undefined && setPic(user.profile) }
                {
                    user.profile == undefined && setPic("https://img.freepik.com/free-vector/cheerful-cute-girl-character-hand-drawn-cartoon-art-illustration_56104-968.jpg?w=2000")
                }
                console.log("asd", address)
            })
    }, [])
    const toggleCart = () => {
        setCartOpen(!cartOpen);
    };

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
        const mail = localStorage.getItem("mail");
        console.log("mail", mail)
        axios.post("http://localhost:3001/getuser", { mail }).then(
            (res) => {
                const user = res.data;

                setAddress(user.address)
                console.log("asd", address)
            })
    }, [])
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
    const productClick = (product) => {
        localStorage.setItem("product", JSON.stringify(product));
        console.log(product)
        navigate("/productdetail")
    }
    const handleLogoutbtnn = () => {
        localStorage.setItem("mail", "");

        localStorage.setItem("loggedin", 'false');
        firebase.auth().signOut().then(function () {
            alert("signed out")
        }).catch(function (error) {
            alert(error)
        });
        navigate("/login")
    }

    return (
        <div className='maindiv'>
            {/* Navbar */}
            <nav className="navbar">
                <div className="navbar-menu">
                    <img style={{ width: "200px", height: "150px", marginTop: "-20px" }} src="https://th.bing.com/th/id/OIP.9V_BtTHUgL3hGdNwLUbhgwHaFr?pid=ImgDet&w=235&h=180&rs=1" />






                    <button onClick={() => { navigate("/vendorprofile") }} className='myproducts'>Vendor list</button>
                    <button onClick={() => { navigate("/pending") }} className='myproducts'>Pending approvals</button>
                    <button onClick={() => { navigate("/orderhistory") }} className='myproducts'>Personal Orders</button>
                    <div className="shopping-cart" style={{ display: "flex", gap: "10px" }}>
                        {/* Shopping cart */}

                        <div className="avatar">
                            {/* Avatar picture */}

                            <img onClick={() => { navigate("/profile") }} style={{ marginLeft: "40px", marginTop: "-2%" }} src={pic} alt="Profile" />
                        </div>
                        {address != undefined && <img style={{ height: "60px" }} src="https://cdn3.iconfinder.com/data/icons/business-and-office-paper-vol-2/150/cart__shopping__baby__ecommerce-512.png"
                            onClick={cartpageopen}></img>}
                        {address == undefined && <button onClick={() => { navigate("/profile") }} style={{ backgroundColor: "brown", color: "white" }}>Add address to view cart</button>}
                        {/* Cart content */}
                        {cartOpen && (
                            <div className="cart-content">
                                <ul>
                                    {/* List of products in the cart */}
                                    {cart.map((product) => (
                                        <li key={product._id}>
                                            {product.title} - ${product.price}
                                            <button>Buy</button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                    </div>
                </div>
                <button onClick={handleLogoutbtnn} className="logout-button">Logout</button>
            </nav>
            <div className="displayimage" style={{ display: "flex", gap: "60px", textAlign: "center" }}>
                <img style={{ width: "100vw" }} src={"https://i.pinimg.com/originals/6f/39/35/6f393516f4f2876c5ff1b8ddcf57c638.jpg"}></img>


            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "60px", marginTop: "20px",marginLeft:"10%" }}>
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
                            <img src={product.images[0]} alt={product.title} />
                            {product.outofstock != "true" && <button className='addtocart' style={{ backgroundColor: "green" }} onClick={() => { productClick(product) }}>view details</button>}
                            {product.outofstock != "true" && <button className='addtocart' onClick={() => additemtocart(product)}>Add to cart</button>}
                            {product.outofstock == "true" && <button className='outofstock' >Sorry out of stock</button>}
                        </div>
                    ))}</div>
            </div>}
            {/* Products */}
            <p style={{ marginLeft: "40%", fontSize: "32px" }}>All products</p>
            <div className="product-list">
                {/* Display products in divs */}
                {products.map((product) => (
                    <div key={product._id} className="product">
                       <h2 style={{fontFamily:"cursive",color:"gray"}}>{product.title}</h2>
                        <p>In {product.category}</p>

                        <p>${product.price}</p>
                        <img src={product.images[0]} alt={product.title} />
                        {product.outofstock != "true" && <button className='addtocart' style={{ backgroundColor: "green" }} onClick={() => { productClick(product) }}>view details</button>}
                        {product.outofstock != "true" && <button className='addtocart' onClick={() => additemtocart(product)}>Add to cart</button>}
                        {product.outofstock == "true" && <button className='outofstock'>Sorry out of stock</button>}
                    </div>
                ))}
            </div>
        </div>

    );
};

export default AdminPage;
