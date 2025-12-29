import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },
  driverName: String,
  cylinderId: String,
  status: { type: String, default: "Assigned" },
  deliveredAt: Date,
  proof: String
});

export default mongoose.model("Delivery", deliverySchema);
