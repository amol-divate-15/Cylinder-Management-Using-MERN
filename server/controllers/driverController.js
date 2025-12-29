import Driver from "../model/driverModel.js";
import Delivery from "../model/deliveryModel.js";
import Cylinder from "../model/cylinderModel.js";
import History from "../model/cylinderHistoryModel.js";

// Add Driver
export const addDriver = async (req,res)=>{
  res.json(await Driver.create(req.body));
}

// View Drivers
export const getDrivers = async (req,res)=>{
  res.json(await Driver.find());
}

// Assign Order
export const assignOrder = async (req,res)=>{
  const { orderId, driverId } = req.body;

  const already = await Delivery.findOne({ orderId });
  if(already) return res.json({message:"Already Assigned"});

  const driver = await Driver.findById(driverId);
  if(!driver) return res.status(404).json({message:"Driver not found"});

  await Delivery.create({
    orderId,
    driverId,
    driverName: driver.name,
    status: "Assigned"
  });

  res.json({message:"Driver Assigned"});
};



// Mark Delivered + Update Cylinder


export const markDelivered = async (req,res)=>{
  const delivery = await Delivery.findByIdAndUpdate(req.params.id,{
    status:"Delivered",
    deliveredAt:new Date(),
    proof:req.body.proof
  },{new:true});

  if(!delivery) return res.status(404).json({message:"Delivery not found"});

  // Save history
  await History.create({
    cylinderId: delivery.cylinderId,
    fromOwner: "Warehouse",
    toOwner: "Customer",
    driverName: delivery.driverName,
    action: "Delivered",
    date: new Date()
  });

  await Cylinder.findOneAndUpdate(
    { cylinderId: delivery.cylinderId },
    { status:"Empty" }
  );

  res.json({message:"Delivered & History Saved"});
};



export const deleteDriver = async (req, res) => {
  try {
    await Driver.findByIdAndDelete(req.params.id);
    res.json({ message: "Driver Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
