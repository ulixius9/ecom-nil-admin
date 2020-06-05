const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');


const customerSchema = mongoose.Schema({
    accepts_marketing:{
        type: Boolean,
    },
    accepts_marketing_updated_at:{
        type: Date
    },
    addresses:[
        {
            customer_id:{
                type: String,
                required: true,
                default: uuidv4()
            },
            first_name:{
                type: String,
                required:true
            },
            last_name:{
                type: String,
                required:true
            },
            address1:{
                type: String,
                required: true
            },
            address2:{
                type: String,
            },
            city:{
                type: String,
                required:true
            },
            country:{
                type: String,
                required:true
            },
            zip: {
                type: String,
            },
            phone: {
                type: String
            },
            country_code: {
                type: String
            },
            country_name: {
                type: String
            },
            default: {
                type: Boolean,
                default: true
            }
        }
    ],
    created_at:{
        type: Date,
        default: Date.now
    },
    default_address:{
        first_name:{
            type: String,
            required:true
        },
        last_name:{
            type: String,
            required:true
        },
        address1:{
            type: String,
            required: true
        },
        address2:{
            type: String,
        },
        city:{
            type: String,
            required:true
        },
        country:{
            type: String,
            required:true
        },
        zip: {
            type: String,
        },
        phone: {
            type: String
        },
        country_code: {
            type: String
        },
        country_name: {
            type: String
        },
        default: {
            type: Boolean,
            default: true
        }
    },
    email:{
        type: String,
        unique: true
    },
    first_name:{
        type: String,
        required:true
    },
    last_name:{
        type: String,
        required:true
    },
    last_order_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    },
    last_order_name:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Order",
        name:{
            type: String,
        }
    },
    orders_count:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Order"
    }],
    phone: {
        type: String
    },
    verified_email:{
        type: String
    },
    updated_at:{
        type: Date
    }
});

module.exports = mongoose.model("Customer", customerSchema);