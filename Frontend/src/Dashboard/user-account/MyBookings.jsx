import { useEffect, useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import DoctorCard from "./../../components/Doctors/DoctorCard";
import Error from "../../components/Error/Error";
import Loading from "../../components/Loader/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const MyBookings = () => {
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const {
    data: appointments,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/users/appointments/my-appointments`, [refreshFlag]); // Pass refreshFlag as a dependency

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    setFilteredAppointments(appointments);
  }, [appointments]);

  const handleDelete = async (doctorId) => {
    setDeleteLoading(true);
    setDeleteError(null);
    try {
      const response = await fetch(`${BASE_URL}/users/appointments/delete-appointment/${doctorId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete appointment');
      }
      setFilteredAppointments(prevAppointments => prevAppointments.filter(doctor => doctor._id !== doctorId));
      setRefreshFlag(prev => !prev); // Toggle the refresh flag to trigger re-fetch
      toast.success("Appointment deleted successfully..")
      
       
    } catch (error) {
      setDeleteError(error.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  const renderDoctorCards = () => {
    if (filteredAppointments.length === 0) {
      return (
        <h2 className="mt-5 text-center text-blue-900 text-2xl font-semibold">
          You did not book any doctor yet!...
        </h2>
      );
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredAppointments.map((doctor) => (
          <div key={doctor._id} className="flex flex-col items-center space-y-4">
            <DoctorCard doctor={doctor} />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center justify-center"
              onClick={() => handleDelete(doctor._id)}
              disabled={deleteLoading}
            >
              <FontAwesomeIcon icon={faTrash} />
              {deleteLoading && <span className="ml-2">Deleting...</span>}
            </button>
            {deleteError && <p className="text-red-500">{deleteError}</p>}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {loading && !error && <Loading />}
      {error && !loading && <Error errMessage={error} />}
      {!loading && !error && renderDoctorCards()}
    </div>
  );
};

export default MyBookings;
