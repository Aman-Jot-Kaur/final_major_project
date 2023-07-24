import React from 'react'
import Login from './components/Login'
import SignUpForm from './components/SignupPage/Signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CustomerPage from './components/customerpage/customer'
import VendorPage from './components/vendorpage/Vendor'
import AdminPage from './components/Admin/Adminpage'
import PendingPage from './components/Admin/pendingpage'
import VendorProductPage from './components/vendorpage/VendorProduct'
import Productdetail from './components/productDetail/productpage'
import Profile from './components/Profile/profile'
import OrderHistory from './components/historyorder/Historyorder'
import "./App.css"
import { Navigate } from 'react-router-dom'
import OrdersPage from './components/orders/Orders'
import CartPage from './components/cartpage/Cartpage'
import ProfileList from './components/vendorlist/Vendorlist'
const isLoggedIn=localStorage.getItem("loggedin");
function App() {
  return (
    <div className='app' >
      <BrowserRouter>
        <Routes>
          <Route element={<SignUpForm />} path="/"></Route>
          <Route element={<Login />} path="/login"></Route>
          <Route element={(isLoggedIn=='true') ? <CustomerPage /> : <Navigate to='/login'/>} path="/customer"></Route>
          <Route element={(isLoggedIn=='true') ? <VendorPage /> : <Navigate to='/login'/>}  path="/vendor"></Route>
          <Route element={(isLoggedIn=='true') ? <AdminPage /> : <Navigate to='/login'/>} path="/admin"></Route>
          <Route  element={(isLoggedIn=='true') ? <PendingPage /> : <Navigate to='/login'/>} path="/pending"></Route>
          <Route element={(isLoggedIn=='true') ? <VendorProductPage />  : <Navigate to='/login'/>} path="/myproducts"></Route>
          <Route element={(isLoggedIn=='true') ? <Productdetail />  : <Navigate to='/login'/>}   path="/productdetail"></Route>
          <Route element={(isLoggedIn=='true') ? <Profile /> : <Navigate to='/login'/>}  path="/profile"></Route>
          <Route  element={(isLoggedIn=='true') ? <OrdersPage /> : <Navigate to='/login'/>}  path="/orders"></Route>
          <Route element={(isLoggedIn=='true') ? <CartPage /> : <Navigate to='/login'/>}  path="/cart"></Route>
          <Route element={(isLoggedIn=='true') ? <OrderHistory /> : <Navigate to='/login'/>}  path="/orderhistory"></Route>
          <Route element={(isLoggedIn=='true') ? <ProfileList /> : <Navigate to='/login'/>}  path="/vendorprofile"></Route>
        </Routes></BrowserRouter>


    </div>
  )
}

export default App