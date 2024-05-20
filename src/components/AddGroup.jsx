import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ChevronRightIcon } from "@heroicons/react/solid";
import axios from "axios";
const pages = [
  { name: "Groupes", href: "/GestionGroups", current: false },
  { name: "Ajouter Groupe", href: "/AddGroup", current: true },
];
function AddGroup() {
  const initialData = {
    securityEnabled: false,
    displayName: "",
    mailEnabled: false,
    mailNickname: "",
  };
  const [data, setData] = useState(initialData);
  const handleRadioChange = (value) => {
    setData({
      ...data,
      securityEnabled: value === "securityEnabled",
      mailEnabled: value === "mailEnabled",
      groupTypes: ["Unified"],

    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.displayName || !data.mailNickname) {
      toast.error("Veuillez remplir les champs !");
      return;
    }
    axios
      .post("http://localhost:5000/group", data)
      .then((res) => {
        console.log(res);
        toast.success("Groupe ajouté avec succès");
        setData(initialData);
      })
      .catch((err) => {
        toast.error("Erreur d'ajout du groupe");
        console.log(err);
      });
  };

  return (
    <div>
      <ToastContainer />
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
                  htmlFor="DisplayName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nom groupe
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="DisplayName"
                    id="DisplayName"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) =>
                      setData({ ...data, displayName: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="Mail-Nick-Name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Pseudonyme de messagerie
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="Mail-Nick-Name"
                    id="Mail-Nick-Name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) =>
                      setData({ ...data, mailNickname: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="securityEnabled"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Sécurité
                </label>
                <div className="mt-2">
                  <input
                    type="radio"
                    name="securityEnabled"
                    id="securityEnabled"
                    value="securityEnabled"
                    checked={data.securityEnabled}
                    onChange={(e) => handleRadioChange(e.target.value)}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="mailEnabled"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Microsoft 365
                </label>
                <div className="mt-2">
                  <input
                    type="radio"
                    name="mailEnabled"
                    id="mailEnabled"
                    value="mailEnabled"
                    checked={data.mailEnabled}
                    onChange={(e) => handleRadioChange(e.target.value)}
                  />
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
export default AddGroup;
