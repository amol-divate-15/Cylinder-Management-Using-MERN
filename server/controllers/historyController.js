import History from "../model/cylinderHistoryModel.js";

export const getAllHistory = async (req,res)=>{
  const data = await History.find().sort({ date: -1 });
  res.json(data);
};
