import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },
  cylinderId: String,
  status: { type: String, default: "Assigned" },
  assignedAt: { type: Date, default: Date.now },
  deliveredAt: Date
});

export default mongoose.model("Delivery", deliverySchema);
