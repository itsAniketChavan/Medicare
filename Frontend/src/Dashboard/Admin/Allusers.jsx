import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { BASE_URL, token } from "../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
 


const Allusers = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const fetchUserData = async () => {
    try {
      const res = await fetch(`${BASE_URL}/admin/all/users`, {
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

  const handleDelete = async (userID) => {
    setDeleting(userID);
    try {
      const response = await fetch(`${BASE_URL}/admin/users/${userID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.message);
      }
  
      const result = await response.json();
  
      toast.success(result.message);
      setTimeout(() => {
        fetchUserData();
        setDeleting(null);
      }, 2000); // Refresh data after deletion
    } catch (err) {
      console.error(err);
      toast.error(err.message);
      setDeleting(null);
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
        {/* <td className="px-6 py-4 ">{user.ticketPrice}</td> */}
        <td className="px-6 py-4 ">{user.email}</td>
        <td className="px-6 py-4 ">
  <div className="group relative flex items-center justify-center">
    <FontAwesomeIcon
      className="text-xl text-blue-500 hover:text-blue-700 cursor-pointer"
      icon={faTrash}
      onClick={() => handleDelete(user._id)}
    />
    {deleting === user._id ? (
      <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
        Deleting...
      </span>
    ) : (
      <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
        Delete User
      </span>
    )}
  </div>
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
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Remove
            </th>
          </tr>
        </thead>
        <tbody>
          {userData.length > 0 ? (
            renderTableRows()
          ) : (
            <tr>
              <td colSpan="5" className="px-6 py-4 text-center">
                No Users Found
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

export default Allusers;
