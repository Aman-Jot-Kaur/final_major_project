const express = require("express")
const router = express.Router();
const appcontroller = require("./functioncontroller");

router.post('/usersignup', appcontroller.signup)
router.post('/userlogin', appcontroller.loginfunction)
router.post('/userloginwithgoogle', appcontroller.loginfunctionwithgoogle)
router.get('/getavailableproducts', appcontroller.getavailableproducts)//getting all products exclusive to sell to cuss
router.post('/cart', appcontroller.addingtocart)//add to cart
router.post('/sendforapproval', appcontroller.sendforapproval)//when vendor sends a product approval request
router.post('/approveproduct', appcontroller.approveproduct)//action after admin allows the product
router.get('/getapproval', appcontroller.getapproval)//to get approval list pending for admin
router.get('/getproducts', appcontroller.gettingallproducts)//getting vendor products 
router.get('/getcart', appcontroller.gettingcart)//get cart item for specific user
router.post('/addproduct', appcontroller.addingproduct)
router.post('/addorder', appcontroller.addorder)//add new order
//gettingorders
router.get('/getorders', appcontroller.gettingorders)
router.get('/getvendors', appcontroller.getvendors)//vendor list for DMIN PAGE
router.post('/getuser', appcontroller.getuser)//USER TO get into profile page
router.get('/getorderhistory', appcontroller.getorderhistory)//order history for all
router.post('/updateuser', appcontroller.updateuser)//update user from profile edit page
router.post('/removeorder', appcontroller.removeorder)//order cancel
router.post('/markoutofstock', appcontroller.markoutofstock)
//updateproduct
router.post('/updateproduct', appcontroller.updateproduct)
router.post('/updateuserdisable', appcontroller.updateuserdisable)
module.exports = router;