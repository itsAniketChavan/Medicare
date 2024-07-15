 


import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Approve from "./Approve";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { BASE_URL, token } from "../../config";

const Approvals = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    try {
      const res = await fetch(`${BASE_URL}/admin/approvals`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      setUserData(result.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleApprove = async (doctorID) => {
    try {
      const res = await fetch(`${BASE_URL}/admin/approvals/${doctorID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      toast.success(result.message);
      setTimeout(fetchUserData, 2000);
       // Refresh data after approval
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const renderTableRows = () => {
    return userData.map((user) => (
      <tr key={user._id}>
        <th
          scope="row"
          className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
        >
          <img
            src={user.photo}
            className="w-10 h-10 rounded-full"
            alt={user.name}
          />
          <div className="pl-3">
            <div className="text-base font-semibold">{user.name}</div>
          </div>
        </th>
        <td className="px-6 py-4 ">{user.gender}</td>
        <td className="px-6 py-4 ">{user.ticketPrice}</td>
        <td className="px-6 py-4 ">{user.email}</td>
        <td className="px-6 py-4 ">
          <button
            onClick={() => handleApprove(user._id)}
            className="bg-primaryColor w-[70px] h-[20px] text-white font-[600] flex items-center justify-center rounded-[100px] hover:bg-blue-800"
          >
            Approve
          </button>
        </td>
      </tr>
    ));
  };

  const renderTable = () => {
    return (
      <table className="w-full text-left text-sm text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Gender
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Make
            </th>
          </tr>
        </thead>
        <tbody>
          {userData.length > 0 ? (
            renderTableRows()
          ) : (
            <tr>
              <td colSpan="5" className="px-6 py-4 text-center">
                No approvals found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return renderTable();
};

export default Approvals;
