import React, { useState, useEffect } from 'react';
import './CartPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const CartPage = () => {
    const [products, setProducts] = useState([
        // Add more products as needed
    ]);
    useEffect(() => {

        const email = localStorage.getItem("mail");

        axios
            .get(`http://localhost:3001/getcart?q=${email}`).then((res) => {
                console.log(res.data.cart)
                setProducts(res.data.cart)
            }).catch(error => {
                console.log(error)
            })
    }, []);

    const [coupon, setCoupon] = useState('');
    const [discount, setDiscount] = useState(0);
    const [tax] = useState(0.08);





    const navigate = useNavigate();
    const handleQuantityChange = (_id, quantity) => {
        const updatedProducts = products.map((product) => {
            if (product._id === _id) {
                return { ...product, quantity: Math.max(quantity, 0) };
            }
            return product;
        });
        setProducts(updatedProducts);
    };

    const handleRemoveItem = (_id) => {
        const updatedProducts = products.filter((product) => product._id !== _id);

        setProducts(updatedProducts);
        console.log("updated prodcuts")
        console.log(updatedProducts)
        setProducts[updatedProducts]
        console.log(products)
        const email = localStorage.getItem("mail")
        axios.post("http://localhost:3001/cart", { cart: updatedProducts, email }).then(
            alert("cart updated")

        ).catch(error => {
            console.log(error)
        })
    };

    const handleCouponChange = (event) => {
        setCoupon(event.target.value);
    };

    const handleApplyCoupon = () => {
        if (coupon === 'DISCOUNT20') {
            setDiscount(0.2 * calculateSubtotal());
            alert("yay you received a discount!")
        } else {
            setDiscount(0);
        }
    };

    const calculateSubtotal = () => {
        return products.reduce(
            (subtotal, product) => subtotal + product.price * product.quantity,
            0
        );
    };

    const calculateTotal = () => {
        const subtotal = calculateSubtotal();
        const total = subtotal - discount + subtotal * tax;
        return total.toFixed(2);
    };

    const handleBuyNow = () => {

        const emptyarr = [];
        const email = localStorage.getItem("mail");

        products.forEach(product => {
            const title = product.title;
            const description = product.description;
            const quantity = product.quantity;
            const price = product.price;
            const category = product.category;
            const vendor = product.vendor;
            const customer = localStorage.getItem("mail");
            const status = "pending";
            axios.post("http://localhost:3001/addorder", { status, customer, title, description, quantity, price, category, vendor }).then(
           
            ).catch(error => {
                console.log(error)
            })
        })

        setProducts([]);
        axios.post("http://localhost:3001/cart", { cart: emptyarr, email }).then(
            alert("order placed!")

        ).catch(error => {
            console.log(error)
        })

    };

    return (
        <div className="cart-page">

            <div className="product-list-container">

                <div className="products-list">
                    {products.length == 0 && <div><h1>Cart is empty</h1> <button onClick={() => { navigate(-1) }} className='browse'>Browse Products</button></div>}
                    {products.map((product) => (
                        <div className="product-item" >
                            <div className="product-image">
                                <img src="https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" alt={product.name} />
                            </div>
                            <div className="product-info">
                                <h3>{product.title}</h3>
                                <p>Price: ${product.price.toFixed(2)}</p>
                                <div className="quantity-input">
                                    <button
                                        onClick={() =>
                                            handleQuantityChange(product._id, product.quantity - 1)
                                        }
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        min="0"
                                        value={product.quantity}
                                        onChange={(event) =>
                                            handleQuantityChange(
                                                product._id,
                                                event.target.valueAsNumber
                                            )
                                        }
                                    />
                                    <button
                                        onClick={() =>
                                            handleQuantityChange(product._id, product.quantity + 1)
                                        }
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    className="remove-item-button"
                                    onClick={() => handleRemoveItem(product._id)}
                                >
                                    Remove
                                </button>
                            </div>
                            <div className="product-subtotal" style={{ marginLeft: "15px" }}>
                                <p>Subtotal: ${(product.price * product.quantity).toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bill-container">
                <div className="cart-summary">
                    <h2>Order Summary</h2>
                    <div className="summary-section" >
                        <div className="summary-item">
                            <span style={{ fontSize: "22px" }}>Subtotal:</span>
                            <span style={{ fontSize: "22px" }}>${calculateSubtotal().toFixed(2)}</span>
                        </div>
                        <div className="summary-item">
                            <span style={{ fontSize: "22px" }}>Discount:</span>
                            <span style={{ fontSize: "22px" }}>-${discount.toFixed(2)}</span>
                        </div>
                        <div className="summary-item" >
                            <span style={{ fontSize: "22px" }}>Tax ({(tax * 100).toFixed(2)}%):</span>
                            <span style={{ fontSize: "22px" }}>${(calculateSubtotal() * tax).toFixed(2)}</span>
                        </div>
                        <div className="summary-item total">
                            <span style={{ fontSize: "22px" }}>Total:</span>
                            <span style={{ fontSize: "22px" }}>${calculateTotal()}</span>
                        </div>
                    </div>
                    <div className="coupon-section">
                        <input
                            type="text"
                            value={coupon}
                            onChange={handleCouponChange}
                            placeholder="Enter coupon code"
                        />
                        <button onClick={handleApplyCoupon}>Apply Coupon</button>
                    </div>
                    <div className="payment-section">
                        <h3>Payment Methods</h3>
                        <div className="payment-options">
                            <input type="radio" id="credit-card" name="payment-method" />
                            <label htmlFor="credit-card">Credit Card</label>

                            <input type="radio" id="paypal" name="payment-method" />
                            <label htmlFor="paypal">PayPal</label>

                            <input type="radio" id="google-pay" name="payment-method" />
                            <label htmlFor="google-pay">Google Pay</label>

                            {/* Add more payment options as needed */}
                        </div>
                        <button onClick={handleBuyNow} className="buy-now-button">
                            Buy Now
                        </button>
                        <button onClick={() => { navigate(-1) }} className='backhomebtn'>Browse more</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
