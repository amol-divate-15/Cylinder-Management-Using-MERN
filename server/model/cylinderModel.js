import mongoose from "mongoose";

const cylinderSchema = new mongoose.Schema({
  cylinderId: { type: String, required: true, unique: true },
  qrCode: String,
  gasType: String,
  capacity: String,
  status: { type: String, default: "Empty" },
  currentLocation: String,
  owner: String,
  lastUpdated: { type: Date, default: Date.now },
  latitude:String,
    longitude:String,

});

export default mongoose.model("Cylinder", cylinderSchema);
