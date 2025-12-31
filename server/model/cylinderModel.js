import mongoose from "mongoose";

const cylinderSchema = new mongoose.Schema({
  cylinderId: { type: String, required: true, unique: true },
  qrCode: String,

  gasType: String,
  category: String,            // 👈 ADD THIS (VERY IMPORTANT)
  capacity: String,

  status: { type: String, default: "Empty" },
  currentLocation: String,
  owner: String,

  latitude:String,
  longitude:String,

  lastUpdated: { type: Date, default: Date.now }
});

export default mongoose.model("Cylinder", cylinderSchema);
