import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../pages/loading.css";
function GestionGroups() {
  const [data, setData] = useState({ value: [] });
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("http://localhost:5000/group")
      .then((res) => {
        console.log("Groupe azure:", res.data);
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching data:", err);
        setLoading(false);
      });
  }, []);
  const navigate = useNavigate();
  const handleDelete = (id) => {
    Swal.fire({
      title: "Êtes-vous sûr?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimer!",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/group/${id}`)
          .then((response) => {
            console.log("Item deleted successfully:", response);
            setData((prevData) => ({
              value: prevData.value.filter((user) => user.id !== id),
            }));
            Swal.fire("Supprimé!", "Groupe supprimé", "success");
          })
          .catch((error) => {
            console.error("Error deleting item:", error);
          });
      }
    });
  };
  const handleClick = () => {
    navigate("/AddGroup");
  };
  const handleClickM = (groupId) => {
    setSelectedGroupId(groupId);
    navigate(`/Members/${groupId}`);
  };

  return (
    <>
     {loading ? ( 
        <div className="flex items-center justify-center min-h-screen">
        <div className="loader"></div>;
        </div>
      ) :(
    <div className="flex items-center justify-center min-h-screen -mt-10">
      <div className="w-full max-w-screen-lg px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-base font-semibold leading-6 text-gray-900">Groupes</h1>
              </div>
              <div className="mt-4 mr-10 sm:mt-0 sm:flex-none">
                <button
                  type="button"
                  className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={handleClick}
                >
                  Ajouter groupe
                </button>
              </div>
            </div>
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                          >
                            ID
                          </th>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                          >
                            Nom du groupe
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {data.value.map((group, i) => (
                          <tr key={i}>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{i + 1}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{group.displayName}</td>
                            <td className="flex relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <button onClick={() => handleClickM(group.id)}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  className="w-6 h-6 text-indigo-600 hover:text-indigo-900"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                  />
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                  />
                                </svg>
                              </button>
                              <button onClick={() => handleDelete(group.id)}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  className="w-6 h-6 text-indigo-600 hover:text-indigo-900"
                                >
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>)}
  </>
  

  );
}

export default GestionGroups;
