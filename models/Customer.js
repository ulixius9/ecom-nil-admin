const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');


const customerSchema = mongoose.Schema({
    accepts_marketing:{
        type: Boolean,
        default: false,
    },
    accepts_marketing_updated_at:{
        type: Date
    },
    tags:{
        type: String,
        default: '',
    },
    note:{
        type: String,
        default: '',
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

            },
            last_name:{
                type: String,

            },
            address1:{
                type: String,
                required: true
            },
            address2:{
                type: String,
                default: null
            },
            city:{
                type: String,

            },
            country:{
                type: String,

            },
            zip: {
                type: String,
            },
            phone: {
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
        default: Date.now()
    },
    default_address:{
        customer_id:{
            type: String
        },
        first_name:{
            type: String,
        },
        last_name:{
            type: String,
        },
        address1:{
            type: String,
        },
        address2:{
            type: String,
        },
        city:{
            type: String,
        },
        country:{
            type: String,
        },
        zip: {
            type: String,
        },
        phone: {
            type: String
        }
    },
    email:{
        type: String,
        unique: true
    },
    first_name:{
        type: String
    },
    last_name:{
        type: String
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
    orders:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Order"
    }],
    phone: {
        type: String
    },
    verified_email:{
        type: Boolean
    },
    updated_at:{
        type: Date
    }
});

module.exports = mongoose.model("Customer", customerSchema);