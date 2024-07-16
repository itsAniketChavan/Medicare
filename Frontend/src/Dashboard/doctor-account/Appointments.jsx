import React, { useState, useEffect } from "react";
import { formateDate } from "../../utilis/formatDate";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BASE_URL } from "../../config";

const Appointments = ({ appointments }) => {
  const [appointmentList, setAppointmentList] = useState(appointments);

  useEffect(() => {
    setAppointmentList(appointments);
  }, [appointments]);

  const handleDelete = async (id, doctorId) => {
    try {
      const response = await fetch(`${BASE_URL}/doctors/profile/me/${id}`, {
        method: 'DELETE',
       
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete appointment');
      }

      // Remove the deleted appointment from the state
      setAppointmentList(prevAppointments => prevAppointments.filter(appointment => appointment._id !== doctorId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <table className="w-full text-left text-sm text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-100">
        <tr>
          <th scope="col" className="px-6 py-3">Name</th>
          <th scope="col" className="px-6 py-3">Gender</th>
          <th scope="col" className="px-6 py-3">Payment</th>
          <th scope="col" className="px-6 py-3">Price</th>
          <th scope="col" className="px-6 py-3">Booked On</th>
          <th scope="col" className="px-6 py-3">Status</th>
          <th scope="col" className="px-6 py-3">Actions</th>
        </tr>
      </thead>

      <tbody>
        {appointmentList?.map((item) => (
          <tr key={item._id}>
            <th scope="row" className="flex items-center px-6 py-8 text-gray-900 whitespace-nowrap">
              <img src={item.user.photo} className="w-10 h-10 rounded-full" alt="User"/>
              <div className="pl-3">
                <div className="text-base font-semibold">{item.user.name}</div>
                <div className="text-normal text-gray-500">{item.user.email}</div>
              </div>
            </th>

            <td className="px-6 py-4">{item.user.gender}</td>
            <td className="px-6 py-4">
              {item.isPaid ? (
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                  Paid
                </div>
              ) : (
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                  Unpaid
                </div>
              )}
            </td>

            <td className="px-6 py-4">{item.ticketPrice}</td>
            <td className="px-6 py-4">{formateDate(item.createdAt)}</td>
            <td className="px-6 py-4">{item.status}</td>
            <td className="relative px-6 py-4">
              <div className="group relative flex items-center justify-center">
                <FontAwesomeIcon
                  className="text-xl text-blue-500 hover:text-blue-700 cursor-pointer"
                  icon={faTrash}
                  onClick={() => handleDelete(item._id, item.doctorId)}
                />
                <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                  Delete appointment
                </span>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Appointments;
