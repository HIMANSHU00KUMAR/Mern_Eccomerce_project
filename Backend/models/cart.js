import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    items: [{
        productId: {
            type: String,
            required: true,
          },
          name: {
            type: String,
            required: true,
          },
          image:{
            type: String,
          },
          quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity cannot be less than 1.'],
            default: 1,
          },
          price: {
            type: Number,
            required: true,
          },
        },
      ],
      bill: {
        type: Number,
        required: true,
        default: 0,
      },
});

const Cart = mongoose.models.Cart || mongoose.model('Cart', CartSchema);
export default Cart;