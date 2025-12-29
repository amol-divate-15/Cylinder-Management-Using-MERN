import Cylinder from "../model/cylinderModel.js";
import Delivery from "../model/deliveryModel.js";
import History from "../model/cylinderHistoryModel.js";
import Driver from "../model/driverModel.js";

// ADMIN REPORT
export const getReports = async (req,res)=>{
  const totalCylinders = await Cylinder.countDocuments();
  const damaged = await Cylinder.countDocuments({status:"Damaged"});
  const pending = await Delivery.countDocuments({status:"Assigned"});

  const today = new Date();
  today.setHours(0,0,0,0);
  const deliveredToday = await Delivery.countDocuments({
    status:"Delivered",
    deliveredAt: {$gte: today}
  });

  // Driver Performance
  const driverPerformance = await Delivery.aggregate([
    { $match:{ status:"Delivered"} },
    { $group:{ _id:"$driverName", deliveries:{ $sum:1 }}}
  ]);

  // Customer wise usage
  const customerUsage = await History.aggregate([
    { $group:{ _id:"$toOwner", total:{ $sum:1 }}}
  ]);

  res.json({
    totalCylinders,
    deliveredToday,
    pending,
    damaged,
    driverPerformance,
    customerUsage
  });
};
