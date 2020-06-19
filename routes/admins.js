const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");
const { check, validationResult } = require("express-validator");
const passport = require("passport");

// @ Type -> Private Route
// @ Route -> /admin/api/<______>
// @ desc -> GET all customers
router.get("/customers", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json({ customers });
  } catch (e) {
    res.status(500).json({
      msg: "Server Error",
    });
  }
});

// @ Type -> Private Route
// @ Route -> /admin/api/:id
// @ desc -> POST add a customer
router.get(
  "/customers/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const customer = await Customer.findById(req.params.id);
      res.status(200).json({ customer });
    } catch (e) {
      res.status(500).json({
        msg: "Server Error",
      });
    }
  }
);

// @ Type -> Public Route
// @ Route -> /admin/api/<______>
// @ desc -> POST add a customer
router.post(
  "/customers",
  [
    check("customer.first_name", "Please Provide a First Name").not().isEmpty(),
    check("customer.last_name", "Please Provide a Last Name").not().isEmpty(),
    check("customer.email", "Please enter a Valid Email").isEmail(),
    check(
      "customer.phone",
      "Please enter a valid Phone Number"
    ).isMobilePhone(),
    check("customer.addresses[0].address1", "Please enter a Address")
      .not()
      .isEmpty(),
    check(
      "customer.addresses[0].phone",
      "Please enter a valid Phone Number"
    ).isMobilePhone(),
    check("customer.addresses[0].city", "Please provide a City")
      .not()
      .isEmpty(),
    check("customer.addresses[0].country", "Please enter a Country name")
      .not()
      .isEmpty(),
    check(
      "customer.addresses[0].zip",
      "Please enter a valid Zip Code"
    ).isPostalCode("IN"),
  ],
  async (req, res) => {
    const errorsArray = validationResult(req);
    if (!errorsArray.isEmpty()) {
      let errors = [];
      errorsArray.errors.forEach((error) => {
        errors.push(error.msg);
      });
      return res.status(422).json({
        errors,
      });
    }

    // Dealing With DB
    const {
      customer: {
        first_name,
        last_name,
        email,
        verified_email,
        addresses,
        phone,
        password,
      },
    } = req.body;
    const newCustomer = {
      accepts_marketing_updated_at: new Date(),
      addresses: addresses,
      default_address: addresses[0],
      email,
      verified_email,
      first_name,
      last_name,
      phone,
      password,
      updated_at: new Date(),
    };
    try {
      let customer = new Customer(newCustomer);
      customer.default_address = customer.addresses[0];
      customer = await customer.save();
      res.status(200).json(customer);
    } catch (e) {
      console.log(e.message);
      res.status(500).json({
        msg: "Server Error",
      });
    }
  }
);

// @ Type -> Private Route
// @ Route -> /admin/api/customers/:id/<______>
// @ desc -> PUT Update a customer

router.put(
  "/customers/:id",
  [
    check("customer.first_name", "Please Provide a First Name").not().isEmpty(),
    check("customer.last_name", "Please Provide a Last Name").not().isEmpty(),
    check("customer.email", "Please enter a Valid Email").isEmail(),
    check(
      "customer.phone",
      "Please enter a valid Phone Number"
    ).isMobilePhone(),
    check("customer.addresses[0].address1", "Please enter a Address")
      .not()
      .isEmpty(),
    check(
      "customer.addresses[0].phone",
      "Please enter a valid Phone Number"
    ).isMobilePhone(),
    check("customer.addresses[0].city", "Please provide a City")
      .not()
      .isEmpty(),
    check("customer.addresses[0].country", "Please enter a Country name")
      .not()
      .isEmpty(),
    check(
      "customer.addresses[0].zip",
      "Please enter a valid Zip Code"
    ).isPostalCode("IN"),
  ],
  async (req, res) => {
    const errorsArray = validationResult(req);
    if (!errorsArray.isEmpty()) {
      let errors = [];
      errorsArray.errors.forEach((error) => {
        errors.push(error.msg);
      });
      return res.status(422).json({
        errors,
      });
    }

    // Dealing With DB
    const {
      customer: {
        first_name,
        last_name,
        email,
        addresses,
        phone,
        accepts_marketing,
        tags,
        note,
        password,
      },
    } = req.body;
    const updatedCustomer = {
      accepts_marketing,
      accepts_marketing_updated_at: new Date(),
      addresses: addresses,
      default_address: addresses[0],
      email,
      first_name,
      last_name,
      phone,
      password,
      updated_at: new Date(),
      tags,
      note,
    };
    try {
      let customer = await Customer.findByIdAndUpdate(
        req.params.id,
        updatedCustomer
      );
      customer = await customer.save();
      res.status(200).json(customer);
    } catch (e) {
      res.status(500).json({
        msg: "Server Error",
      });
    }
  }
);

// @ Type -> Private Route
// @ Route -> /admin/api/customers/:id/<______>
// @ desc -> DELETE a customer
router.delete("/customers/:id", async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.json({
      msg: "Account Deleted",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "Server Error",
    });
  }
});

// @ Type -> Private Route
// @ Route -> /admin/api/customers/:id/<______>
// @ desc -> GET Count for customers
router.get("/customers/count", async (req, res) => {
  try {
    const customers = await Customer.find();
    const count = customers.length;
    res.json({
      count: count,
    });
  } catch (e) {
    res.status(500).json({
      msg: "Server Error",
    });
  }
});

// @ Type -> Private Route
// @ Route -> /admin/api/customers/:id/<______>
// @ desc -> GET all orders details for a Customer
router.get("/customers/:id/orders", (req, res) => {
  Customer.findById(req.params.id)
    .populate("orders")
    .exec(function (err, customer) {
      if (err) {
        return res.status(500).json({
          msg: "Server Error",
        });
      }
      res.json({
        orders: customer.orders,
      });
    });
});

module.exports = router;
