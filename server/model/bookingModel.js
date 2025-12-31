import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  type:String,
  customerId: { type: String, required: true },
  name: String,
  address: String,
  phone: String,
  email: String,
  price: { type: Number, default: 1000 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Booking", bookingSchema);