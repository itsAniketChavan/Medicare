
import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js"

export const getUserProfile = async (req, res) => {
    const userId = req.userId;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not Found" });
      }
  
      const { password, ...rest } = user._doc;
  
      res
        .status(200)
        .json({
          success: true,
          message: "Profile info is getting",
          data: { ...rest },
        });
    } catch (err) {
      console.error("Error in getUserProfile:", err);
      return res
        .status(500)
        .json({ success: false, message: "something went wrong cannot get" });
    }
  };

   

export const getPendingDoctors = async (req, res) => {
  try {
    const pendingDoctors = await Doctor.find({ isApproved: "pending" });

    // if (pendingDoctors.length === 0) {
    //   return res
    //     .status(200)
    //     .json({ success: false, message: "Not pending" });
    // }

    res.status(200).json({
      success: true,
      message: "Pending doctors retrieved successfully",
      data: pendingDoctors,
    });
  } catch (err) {
    console.error("Error in getPendingDoctors:", err);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong, cannot retrieve pending doctors" });
  }
};


export const getAlldoctors = async (req, res) => {
  try {
    const pendingDoctors = await Doctor.find({ isApproved: "approved" });

    // if (pendingDoctors.length === 0) {
    //   return res
    //     .status(200)
    //     .json({ success: false, message: "Not pending" });
    // }

    res.status(200).json({
      success: true,
      message: "Approved doctors retrieved successfully",
      data: pendingDoctors,
    });
  } catch (err) {
    console.error("Error in getAlldocotrs:", err);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong, cannot retrieve doctors" });
  }
};


export const updateStatus = async (req, res) => {
  const doctorId   = req.params.id;
  
  try {
    // Find the doctor by ID
    const doctor = await Doctor.findById(doctorId);

    // If doctor not found, return a 404 response
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found",  });
    }

    // Update the isApproved attribute to "approved"
    doctor.isApproved = "approved";

    // Save the updated doctor document
    await doctor.save();

    // Return the successful response
    res.status(200).json({
      success: true,
      message: "Doctor Approved Successfully."
       
    });
  } catch (err) {
    console.error("Error in updateStatus:", err);
    return res
      .status(500)  
      .json({ success: false, message: "Something went wrong, cannot update doctor status" });
  }
};

export const deleteDoctor = async (req, res) => {
  const doctorId = req.params.id;

  try {
    // Find and delete the doctor by ID
    const doctor = await Doctor.findByIdAndDelete(doctorId);

    // If doctor not found, return a 404 response
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found"
      });
    }

    // Return the successful response
    res.status(200).json({
      success: true,
      message: "Doctor deleted successfully"
    });
  } catch (err) {
    console.error("Error in delete:", err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, cannot delete doctor record"
    });
  }
};
