import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Historyorder.css"
const OrderHistory = () => {
  // Sample order data - Replace this with your actual order data
  const [orders, setOrders] = useState([

    // Add more order data here
  ]);
  const [diff, setDiff] = useState();
  const getDateDifference = (date) => {
    const date2 = new Date();
    const date1 = new Date(date);
    const diffInMilliseconds = (date2 - date1);
    const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    console.log(hours, "fun")
    return hours;
  }

  //getorderhistory
  useEffect(() => {
    const email = localStorage.getItem("mail")
    axios
      .get(`http://localhost:3001/getorderhistory?q=${email}`).then((res) => {
        console.log(res.data)
        setOrders(res.data)
      }).catch(error => {
        console.log(error)
      })
  }, []);
  useEffect(() => {
    const email = localStorage.getItem("mail")
    axios
      .get(`http://localhost:3001/getorderhistory?q=${email}`).then((res) => {
        console.log(res.data)
        setOrders(res.data)
      }).catch(error => {
        console.log(error)
      })
  }, [orders]);
  useEffect(() => {
    const email = localStorage.getItem("mail")
    axios
      .get(`http://localhost:3001/getorderhistory?q=${email}`).then((res) => {
        console.log(res.data)
        setOrders(res.data)
      }).catch(error => {
        console.log(error)
      })
  }, []);
  const navigate = useNavigate();
  const handleCancelOrder = (_id) => {

    setOrders(orders);

 
    axios.post("http://localhost:3001/removeorder", { _id }).then(
      (res) => {
        console.log(res)
      })

  };
  const isCancelButtonVisible = "true";
  return (
    <div className="order-history-container">


      <button onClick={() => { navigate(-1) }} className='outofstock' style={{ width: "100px" }}>Back to browsing</button>
      <h2 >Order History</h2>

      <div className="order-list">
        {orders.length == 0 && <h1>No products found</h1>}
        {orders.map((order) => (
          <div key={order._id} className={`order-item ${order.status.toLowerCase()}`}>
            <div className="order-info">
              <h3 >Order name: {order.title}</h3>
              <p >Price {order.price}</p>
              <p>Quantity: {order.quantity}</p>
              <p>Category: {order.category}</p>
              <p>Vendor: {order.vendor}</p>
              <p>Order placed {getDateDifference(order.time)} hours ago</p>
            </div>

            {isCancelButtonVisible == "true" && order.status === 'pending' && getDateDifference(order.time) < 24 && (
              <button
                className="cancel-button"
                onClick={() => handleCancelOrder(order._id)}
              >
                Cancel Order
              </button>
            )}
            {isCancelButtonVisible == "true" && order.status === 'pending' && (
              <button className="status-pending">{order.status}</button>
            )}
            {order.status === 'delievered' && (
              <button className="status-delivered" style={{ backgroundColor: "green" }}>{order.status}</button>
            )}
            {order.status === 'cancelled' && (
              <button className="status-cancelled" style={{ backgroundColor: "gray" }}>{order.status}</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;