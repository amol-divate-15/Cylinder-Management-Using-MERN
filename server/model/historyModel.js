import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  cylinderId:String,
  fromOwner:String,
  toOwner:String,
  driverName:String,
  action:String,
  date:{ type:Date, default:Date.now }
});

export default mongoose.model("History", historySchema);
