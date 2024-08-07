import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";
import { doctors } from "../../Frontend/src/assets/data/doctors.js";

export const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "successfuly updated",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to  update" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "successfuly deleted",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to  delete" });
  }
};

export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id).select("-password");

    res.status(200).json({
      success: true,
      message: "User found",
      data: user,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "No User found" });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");

    res.status(200).json({
      success: true,
      message: "Users found",
      data: users,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "No found" });
  }
};

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

// export const getMyAppointments = async (req, res) => {
//    
//   try {
//     // step -1 : retirieve appointsments from booking
// 
//     const bookings = await Booking.find({ user: req.userId })
//  
//     // step -2 : extract doctor ids from appoitment bookings
// 
//     const doctorIds = bookings.map((el) => el.doctor.id);
//   
// 
//     //step -3 :retieve doctors using doctors ids
// 
//     const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select(
//       "-password"
//     );
//   //  const doctors =["aniket"]
// 
//     res
//       .status(200)
//       .json({
//         success: true,
//         message: "Appoitments are getting ",
//         data:doctors,
//       });
//   } catch (err) {
//     return res
//       .status(500)
//       .json({
//         success: false,
//         message: "something went wrong cannot get",
//         err,
//       });
//   }
// };


export const getMyAppointments = async (req, res) => {
   
  try {
   

    const bookings = await Booking.find({ user: req.userId })
    
     
 
    const doctorIds = [];

    bookings.forEach(item => {
      doctorIds.push(item.doctor);
    });

     
 

    const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select(
      "-password"
    );
      
   

    res
      .status(200)
      .json({
        success: true,
        message: "Appoitments are getting ",
        data:doctors,
      });
  } catch (err) {
    return res
      .status(500)
      .json({
        success: false,
        message: "something went wrong cannot get",
        err,
      });
  }
};


 

export const deleteAppointment = async (req, res) => {
  const doctorId   = req.params.id; // Assuming you're passing doctorId as a URL parameter

  try {
    const result = await Booking.findOneAndDelete({ user: req.userId, doctor: doctorId });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong, cannot delete appointment",
      err,
    });
  }
};
