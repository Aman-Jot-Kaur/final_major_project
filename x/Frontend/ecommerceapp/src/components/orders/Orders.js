import React from 'react';
import './Orderspage.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const email = localStorage.getItem("mail");
        axios.get(`http://localhost:3001/getorders?q=${email}`)
            .then((res) => {
                console.log(res.data)
                setOrders(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    // Calculate total earnings
    const totalEarnings = orders.reduce(
        (total, order) => total + order.price * order.quantity,
        0
    );

    return (
        <div className="orders-page">

            <div className="orders-list">
                <button className='outofstock' style={{ width: "100px" }} onClick={() => { navigate(-1) }}>Back</button>
                <h1>All Orders</h1>





                <p className="earnings-label">Total Orders: {orders.length}</p>
                <p className="earnings-value">Total Earnings:</p>
                <p className="earnings-value">${totalEarnings.toFixed(2)}</p>

                <p className="earnings-value"></p>
                {orders.map((order) => (
                    <div className="order-card" key={order._id}>
                        <div className="order-header">
                            <h2>{order.title}</h2>
                            {/* <span className={`order-status ${order.status.toLowerCase()}`}>
                  {order.status}
              </span> */}
                        </div>
                        <div className="order-details">
                            <p>
                                <span className="order-label">Customer:</span> {order.customer}
                            </p>

                            <p>
                                <span className="order-label">Category:</span> {order.category}
                            </p>

                            <p>
                                <span className="order-label">Price:</span> ${order.price.toFixed(2)}
                            </p>
                            <p>
                                <span className="order-label">Quantity:</span> {order.quantity}
                            </p>


                            <div className="order-status-buttons">
                                {order.status === "pending" && <button className="status-pending">Pending</button>}
                                {order.status === "delivered" && <button className="status-delivered">Delivered</button>}
                                {order.status === "cancelled" && <button className="status-cancelled">Cancelled</button>}
                            </div>


                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrdersPage;
