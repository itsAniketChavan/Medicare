import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";

export const updateDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res
      .status(200)
      .json({
        success: true,
        message: "successfuly updated",
        data: updatedDoctor,
      });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to  update"
       });
  }
};

export const deleteDoctor = async (req, res) => {
    const id = req.params.id;
    try {
        
        await Doctor.findByIdAndDelete(
        id,
         
      );
  
      res
        .status(200)
        .json({
          success: true,
          message: "successfuly deleted"
           
        });
    } catch (err) {
      res
        .status(500)
        .json({ success: false, message: "Failed to  delete"});
    }
  };


  export const getSingleDoctor = async (req, res) => {
    const id = req.params.id;
    try {
      const doctor = await Doctor.findById(
        id,  
      ).populate('reviews').select("-password");
  
      res
        .status(200)
        .json({
          success: true,
          message: "Doctor found",
          data: doctor,
        });
    } catch (err) {
      res
        .status(404)
        .json({ success: false, message: "No Doctor found"
         });
    }
  };

   

export const getAllDoctor = async (req, res) => {
   
  try {
    const { query } = req.query;
    let doctors;

    if (query) {
      doctors = await Doctor.find({
        isApproved: 'approved',
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { specialization: { $regex: query, $options: 'i' } },
        ],
      }).select("-password");
    } else {
      doctors = await Doctor.find({ isApproved: 'approved' }).select("-password");
    }

    res.status(200).json({
      success: true,
      message: "Doctors found",
      data: doctors,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};


export const getDoctorProfile = async (req, res) => {
  const doctorId = req.userId;

  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not Found" });
    }

    const { password, ...rest } = doctor._doc;
    const appointments = await Booking.find({ doctor: doctorId }).populate('user');

    // Corrected the response status setting and function call
    res.status(200).json({
      success: true,
      message: "Profile info is getting",
      data: { ...rest, appointments },
    });
  } catch (err) {
    console.error("Error in getUserProfile:", err);
    return res.status(500).json({
      success: false,
      message: "something went wrong cannot get doctor profile",
    });
  }
};


export const deleteAppointment = async (req, res) => {
  const id   = req.params.id;
  // Assuming you're passing doctorId as a URL parameter

  try {
    const result = await Booking.findOneAndDelete({ _id: id });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Appointment not founded",
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
