import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ChevronRightIcon } from "@heroicons/react/solid";
import axios from "axios";
const pages = [
  { name: "Utilisateurs", href: "/GestionUser", current: false },
  { name: "Attribuer utilisateur", href: "/AssignUser", current: true },
];

function AssignUser() {
  const [Group, setGroup] = useState([]);
  const [user, setUser]= useState([]);
  const [UserID, setUserID]= useState([]);
  const { userId } = useParams();
  useEffect(() => {
    if(userId){
      axios
      .get(`http://localhost:5000/user/${userId}`)
      .then((res) => {
        console.log("User:", res.data);
        setUser(res.data.displayName);
        setUserID(res.data.id)
      })
      .catch((err) => {
        console.log("Error fetching data:", err);
      });
    }
   
  }, [userId]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/role")
      .then((res) => {
        const groupsData = res.data.value.map((item) => ({
          id: item.id,
          displayName: item.displayName,
        }));
        console.log(groupsData);
        setGroup(groupsData);
      })
      .catch((err) => {
        console.log("Error fetching data:", err);
      });
  }, []);
  
  const [data, setData] = useState({
    userId: "", 
    groupId: "" 
  });
  
 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.groupId) {
      toast.error("Veuillez sélectionner un groupe !");
      return;
    }
    const formData = {
      userId: UserID, 
      groupId: data.groupId 
    };
    
    axios
      .post("http://localhost:5000/user/assign-role", formData)
      .then((res) => {
        console.log("Assign user", res);
        toast.success("Utilisateur ajouté au groupe avec succès !");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Erreur d'ajout de l'utilisateur au groupe");
    }
    );
  };
  
  return (
    <div>
      <ToastContainer/>
      <nav className="sm:ml-auto flex" aria-label="Breadcrumb">
        <ol role="list" className="flex items-center space-x-4">
          
          {pages.map((page) => (
            <li key={page.name}>
              <div className="flex items-center">
                <ChevronRightIcon
                  className="h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                <a
                  href={page.href}
                  className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                  aria-current={page.current ? "page" : undefined}
                >
                  {page.name}
                </a>
              </div>
            </li>
          ))}
        </ol>
      </nav>
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
            <div></div>

            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
              <div className="sm:col-span-3">
                <label
                  htmlFor="UserID"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Utilisateur
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="UserID"
                    id="UserID"
                    value={user}
                    readOnly
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>


              <div className="sm:col-span-3">
                <label
                  htmlFor="groupSelect"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Groupe
                </label>
                <div className="mt-2">
                  <select
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="groupSelect"
                    onChange={(e) =>
                      setData({
                        ...data,
                        groupId: e.target.value
                      })
                    }
                  >
                    <option value="">Sélectionner</option>
                    {Group.map((group, index) => (
                      <option key={group.id} value={group.id}>
                        {group.displayName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Ajouter
          </button>
        </div>
      </form>
      <br />
    </div>
  );
}
export default AssignUser;
