// import Booking from "../model/bookingModel.js";
import mongoose from "mongoose";   // ADD THIS ON TOP
import Booking from "../model/bookingModel.js";
import Driver from "../model/driverModel.js";
import Delivery from "../model/deliveryModel.js";
import Cylinder from "../model/cylinderModel.js";



export const createBooking = async (req, res) => {
  try {
    const booking = new Booking({
  ...req.body,
  customerId: req.body.customerId
});

    await booking.save();

    // 👇 AUTO ASSIGN DRIVER (ADDED)
    const drivers = await Driver.find();
    if (drivers.length > 0) {
      const randomDriver = drivers[Math.floor(Math.random() * drivers.length)];

      await Delivery.create({
  driverId: randomDriver._id,
  driverName: randomDriver.name,
  cylinderId: req.body.cylinderId,
  orderId: booking._id,
  status: "Assigned"
});


      await Cylinder.findOneAndUpdate(
        { cylinderId: req.body.cylinderId },
        { status: "Assigned" }
      );
    }

    res.status(201).json({ message: "Booking Successful & Driver Assigned" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getAllBookings = async (req, res) => {
  try {
    const data = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




export const getAdminOrders = async (req,res)=>{
  const data = await Booking.aggregate([
    {
      $lookup:{
        from:"deliveries",
        localField:"_id",
        foreignField:"orderId",
        as:"delivery"
      }
    },
    { $unwind:{ path:"$delivery", preserveNullAndEmptyArrays:true } }
  ]);
  res.json(data);
};

export const deleteBooking = async (req,res)=>{
  try{
    const booking = await Booking.findById(req.params.id);
    if(!booking) return res.status(404).json({message:"Booking not found"});

    // Remove delivery record
    await Delivery.deleteOne({ orderId: booking._id });

    // Free the cylinder
    if(booking.cylinderId){
      await Cylinder.findOneAndUpdate(
        { cylinderId: booking.cylinderId },
        { status: "Available" }
      );
    }

    await Booking.findByIdAndDelete(req.params.id);

    res.json({message:"Booking deleted successfully"});
  }catch(err){
    res.status(500).json({message:err.message});
  }
};

export const getUserTracking = async (req,res)=>{
  const { email } = req.params;

  const data = await Booking.aggregate([
    { $match:{ email } },

    { $lookup:{
        from:"deliveries",
        localField:"_id",
        foreignField:"orderId",
        as:"delivery"
    }},
    { $unwind:{path:"$delivery", preserveNullAndEmptyArrays:true}},

    { $lookup:{
        from:"cylinders",
        localField:"delivery.cylinderId",
        foreignField:"cylinderId",
        as:"cylinder"
    }},
    { $unwind:{path:"$cylinder", preserveNullAndEmptyArrays:true}}
  ]);

  res.json(data);
};

