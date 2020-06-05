const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

router.get('/', async(req, res) => {
    try{
        const customers = await Customer.find();
        res.status(200).json(customers);
    }catch(e){
        res.status(500).json({
            msg: 'Server Error'
        });
    }
});

router.get('/:id', async(req, res) => {
    try{
        const customer = await Customer.findById(req.params.id);
        res.status(200).json(customer);
    }catch(e){
        res.status(500).json({
            msg: 'Server Error'
        });
    }
});


router.post('/', async(req, res) => {
    const customer = req.body
    try{
        const newCustomer = new Customer(customer);
        const savedCustomer = newCustomer.save();
        res.json(savedCustomer);
    }catch(e){
        res.status(500).json({
            msg: 'Server Error'
        });
    }
});


router.put('/customers/:id', async(req, res) => {
    const customer = req.body
    try{
        const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, customer);
        const savedCustomer = updatedCustomer.save();
        res.json(savedCustomer);
    }catch(e){
        res.status(500).json({
            msg: 'Server Error'
        });
    }
});

router.delete('/customers/:id', async(req, res) => {
    try{
        await Customer.findByIdAndDelete(req.params.id, customer);
        res.json({
            msg: 'Account Deleted'
        });
    }catch(e){
        res.status(500).json({
            msg: 'Server Error'
        });
    }
});

router.get('/customers/count', async (req, res) => {
    try{
        const customers = await Customer.find();
        const count = customers.length;
         res.json(count);
    }catch(e){
        res.status(500).json({
            msg: 'Server Error'
        });
    }
});

router.get('/customers/count', async (req, res) => {
    try{
        const customers = await Customer.find();
        const count = customers.length;
         res.json(count);
    }catch(e){
        res.status(500).json({
            msg: 'Server Error'
        });
    }
});


router.get('/customers/:id/orders', (req, res) => {
   Customer.findById(req.params.id).populate("orders_count").exec((err, customer)=>{
       if(err){
        return  res.status(500).json({
            msg: 'Server Error'
        });
       }
       res.json(customer.orders_count);
   });
});

module.exports = router;