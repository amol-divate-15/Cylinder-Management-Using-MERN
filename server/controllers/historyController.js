import History from "../model/cylinderHistoryModel.js";
import CylinderHistory from "../model/historyModel.js";

export const getAllHistory = async (req,res)=>{
  const data = await History.find().sort({ date: -1 });
  res.json(data);
};


export const getHistory = async (req,res)=>{
  try{
    const data = await CylinderHistory.find().sort({date:-1});
    res.json(data);
  }catch(err){
    res.status(500).json({message:err.message});
  }
};

