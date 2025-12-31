import Cylinder from "../model/cylinderModel.js";

// ADD
export const addCylinder = async (req, res) => {
  try {

    const category = (req.body.category || "").trim();

    if(!category){
      return res.status(400).json({ message:"Category is required" });
    }

    const fixedCategory =
      category.toLowerCase()==="lpg" ? "Domestic" :
      category.toLowerCase()==="oxygen" ? "Medical" :
      category.toLowerCase()==="cng" || category.toLowerCase()==="png" ? "Commercial" :
      category.toLowerCase()==="nitrogen" || category.toLowerCase()==="argon" ? "Industrial" :
      category;

    const data = await Cylinder.create({
      ...req.body,
      category: fixedCategory,
      status: "Empty"
    });

    res.status(201).json(data);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// GET ALL
export const getCylinders = async (req, res) => {
  const data = await Cylinder.find().sort({ category:1 });
  res.json(data);
};


// UPDATE
export const updateCylinder = async (req, res) => {
  const updated = await Cylinder.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

// DELETE
export const deleteCylinder = async (req, res) => {
  await Cylinder.findByIdAndDelete(req.params.id);
  res.json({ message: "Cylinder Deleted" });
};
export const updateLocation = async(req,res)=>{
  await Cylinder.findOneAndUpdate(
    { cylinderId:req.body.cylinderId },
    { latitude:req.body.lat, longitude:req.body.lng, lastUpdated:new Date() }
  );
  res.json({message:"Live Location Updated"});
};
