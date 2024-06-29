const User = require('../models/users');
const Razorpay = require("razorpay");
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const razorpay = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET
});

const addMyStra = async (req, res) => {
    try {
        const user = await User.findOne({ Email: req.body.Email });
        const index = req.body.index;

        const options = {
            amount: req.body.amount * 100,
            currency: req.body.currency,
            receipt: `receipt_${Math.floor(Math.random() * 1000000)}`,
        };

        try {
            const response = await razorpay.orders.create(options);

            return res.json({
                order: {
                    id: response.id,
                    currency: response.currency,
                    amount: response.amount,
                },
                myStartegies: user.MyStartegies,
                Name: user.Name,
                Email: user.Email,
                MobileNo: user.MobileNo
            });
        } catch (error) {
            return res.json({ message: 'Error creating order', error });
        }
    } catch (error) {
        return res.json({ message: 'Internal Server Error', error });
    }
};

module.exports = addMyStra;
