const mongoose = require("mongoose")
const UserModel = require("../models/user")
const ProductModel = require("../models/products")
const AdminModel = require("../models/approvalproducts")
const CustomerModel = require("../models/customerproduct")
const OrderModel = require("../models/orders")
exports.sendforapproval = (req, res) => {
  
  const userobj = new AdminModel(req.body);
  console.log(":", req.body)
  userobj.save()
    .then(result => {
      console.log("new request product data")
      console.log(result)

    })
    .catch(err => {
      console.log(err);
    });
}

exports.loginfunction = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  console.log("login through number", email)
  const user = await UserModel.findOne({ email: req.body.email });
  const num = await UserModel.findOne({ number: req.body.email });
  //,password: req.body.password
  if (user) {
    const pass = (password == user.password) ? "true" : "false";
    if (pass == "true")
      res.send(user)
    else {
      res.send("password not correct")
    }
  }
  else if (num) {
    res.send(num)
  }
  else {
    res.send("account not found")
  }

}

exports.loginfunctionwithgoogle = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;


  const user = await UserModel.findOne({
    $or: [
      { email: email },
      { number: email }]
  });

  if (user) {
    res.send(user)

  }
  else {
    res.send(null)
  }
}

exports.signup = (req, res) => {



 
  let email = req.body.email;
  let password = req.body.password;
  let role = req.body.role;
  let number = req.body.phoneNumber;
  let body = {
    email,
    password,
    number
  }
  const user =  UserModel.findOne({
    $or: [
      { email: email },
      { number: email }]
  }).then(
    res.send("account already exist")
  );
  const userobj = new UserModel(req.body);

  userobj.save()
    .then(result => {
      // console.log("new user data")
      // console.log(result)

    })
    .catch(err => {
      console.log(err);
    });
  res.send("added");

}
exports.getavailableproducts = (req, res) => {
  const person = CustomerModel.find().then(function (models) {

    res.send(models)
  })
    .catch(function (err) {
      console.log(err);
    });
}
exports.gettingallproducts = (req, res) => {
  const userobj = new ProductModel();
  const mail = req.query.q;

  const person = ProductModel.find({
    $or: [
      { vendor: mail },
      { vendor: mail }]
  }).then(function (models) {

    res.send(models)
  })
    .catch(function (err) {
      console.log(err);
    });

}
exports.gettingorders = (req, res) => {

  const mail = req.query.q;
  const person = OrderModel.find({
    $or: [
      { vendor: mail },
      { vendor: mail }]
  }).then(function (models) {

    res.send(models)
  })
    .catch(function (err) {
      console.log(err);
    });

}
exports.getvendors = (req, res) => {
  const main = req.body.mail;
  const person = UserModel.find({ role: "vendor" }).then(function (models) {

    res.send(models)
  })
    .catch(function (err) {
      console.log(err);
    });
}
exports.getuser = (req, res) => {
  const mail = req.body.mail;
  console.log("testing", mail)
  const person = UserModel.findOne({
    $or: [
      { email: mail },
      { number: mail }]
  }).then(function (models) {

    res.send(models)
  })
    .catch(function (err) {
      console.log(err);
    });
}
exports.updateproduct = (req, res) => {
  let _id = req.body._id;
  let description = req.body.description;
  let category = req.body.category;
  let price = req.body.price;
  let discounted = req.body.discounted;
  let images = req.body.images;
  const person = ProductModel.findOneAndUpdate({
    $or: [
      { _id: req.body._id },
      { _id: req.body._id }]
  }, { description, category, price, discounted, images }).then(function (models) {

    console.log("updated product")
    console.log(person)
  })
    .catch(function (err) {
      console.log(err);
    });
}

exports.getorderhistory = (req, res) => {

  const mail = req.query.q;
  const person = OrderModel.find({
    $or: [
      { customer: mail },
      { customer: mail }]
  }).then(function (models) {

    res.send(models)
  })
    .catch(function (err) {
      console.log(err);
    });

}
//finish adding order through properties
exports.addorder = (req, res) => {

  let title = req.body.title;
  let description = req.body.description;
  let category = req.body.category;
  let price = req.body.price;
  let customer = req.body.email;
  let vendor = req.body.vendor;

  let quantity = req.body.quantity;
  console.log(req.body.email);

  let status = req.body.status;
  let body = {
    title, description, status, customer, category, price, vendor, status, customer, quantity
  }

  const userobj = new OrderModel(req.body);

  userobj.save()
    .then(result => {
      console.log("new order data")
      console.log(result)

    })
    .catch(err => {
      console.log(err);
    });

}

exports.updateuser = (req, res) => {
  const email = req.body.email;
  const displayName = req.body.displayName;
  const address = req.body.address;
  const password = req.body.password;
  const number = req.body.number;
  const disable = req.body.disable;
  const profile = req.body.profile;
  const _id=req.body._id;
  const person = UserModel.findOneAndUpdate({
    $or: [
      { email: email },
      { number: email }]
  }, { email, displayName, address, password, number, disable, profile }).then(function (models) {

    console.log("updated user")
    console.log(disable)
    console.log(person.email)
  })
    .catch(function (err) {
      console.log(err);
    });
}
exports.updateuserdisable = (req, res) => {
  const email = req.body.email;
  const displayName = req.body.displayName;
  const address = req.body.address;
  const password = req.body.password;
  const number = req.body.number;
  const disable = req.body.disable;
  const profile = req.body.profile;
  const _id=req.body._id;
  
UserModel.findByIdAndUpdate({ _id:_id}, {disable: "true" }).then(
    console.log("product marked out of stock in vendorlist")
  )
}
//removeorder
exports.removeorder = (req, res) => {

  const prod = req.body._id;
  const person = OrderModel.findOneAndUpdate({ _id: prod }, { status: "cancelled" }).then(function (models) {

    console.log("updated")
  })
    .catch(function (err) {
      console.log(err);
    });

}

//markoutofstock
exports.markoutofstock = (req, res) => {
  const product = req.body._id;
  //update both in vendor list and customer page
  ProductModel.findByIdAndUpdate({ _id: product }, { outofstock: "true" }).then(
    console.log("product marked out of stock in vendorlist")
  )
  CustomerModel.findByIdAndUpdate({ _id: product }, { outofstock: "true" }).then(
    console.log("product marked out of stock in customerlist")
  )

  res.send();
}
exports.approveproduct = (req, res) => {
  const userobj = new CustomerModel(req.body);
  userobj.save()
    .then(result => {
      // console.log("new user data")
      // console.log(result)

    })
    .catch(err => {
      console.log(err);
    });
  ProductModel.findByIdAndUpdate(req.body._id, { approved: true }).then(
    console.log("product approved and updated")
  )
  const person = AdminModel.findOneAndDelete(req.body).then(function (models) {


  })
    .catch(function (err) {
      console.log(err);
    });
  res.send();
}
exports.getapproval = (req, res) => {


  const person = AdminModel.find().then(function (models) {

    res.send(models)
  })
    .catch(function (err) {
      console.log(err);
    });

}
exports.addingproduct = (req, res) => {
  let title = req.body.title;
  let description = req.body.description;
  let category = req.body.category;
  let price = req.body.price;
  let discounted = req.body.discounted;
  let vendor = req.body.vendor;
  const images = req.body.images;
  let body = {
    title, description, category, price, discounted, vendor, images
  }

  const userobj = new ProductModel(req.body);

  userobj.save()
    .then(result => {
      console.log("new product data")
      console.log(result)

    })
    .catch(err => {
      console.log(err);
    });
  res.send();
}
//updatecart

exports.addingtocart = (req, res) => {
  const userobj = new UserModel();
  const prod = req.body.cart;
  const mail = req.body.email;

  const person = UserModel.updateOne({
    $or: [
      { email: mail },
      { number: mail }]
  }, { cart: prod }).then(function (models) {

    console.log("updated")
  })
    .catch(function (err) {
      console.log(err);
    });



  //   person.rating = [...person.cart,{ prod}]
  // person.save();

}

exports.gettingcart = (req, res) => {
  const userobj = new UserModel();
  const mail = req.query.q;
  console.log(mail)
  const person = UserModel.findOne({
    $or: [
      { email: mail },
      { number: mail }]
  }).then(function (models) {
    //    console.log(models)
    res.send(models)
  })
    .catch(function (err) {
      console.log(err);
    });




}
