import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ChevronRightIcon } from "@heroicons/react/solid";
import axios from "axios";

const pages = [
  { name: "Utilisateurs", href: "/GestionUser", current: false },
  { name: "Ajouter utilisateur", href: "/AddUser", current: true },
];

function AddUser() {
  const initialData = {
    accountEnabled: true, // Set default to true
    displayName: "",
    mailNickname: "",
    userPrincipalName: "",
    passwordProfile: {
      forceChangePasswordNextSignIn: true, // Set default to true
      password: "",
    },
  };

  const [data, setData] = useState(initialData);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.displayName || !data.mailNickname || !data.userPrincipalName || !data.passwordProfile.password) {
      toast.error("Veuillez remplir les champs !");
      return; 
    }
    axios.post("http://localhost:5000/user", data)
      .then((res) => {
        console.log(res);
        toast.success("Utilisateur ajouté avec succès !");
        setData(initialData);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Erreur d'ajout de l'utilisateur");
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
                  Nom d'affichage
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
                  htmlFor="PrincipalName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nom principal 
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="PrincipalName"
                    id="PrincipalName"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) =>
                      setData({ ...data, userPrincipalName: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="accountEnabled"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Compte activé
                </label>
                <div className="mt-2">
                  <input
                    type="checkbox"
                    name="accountEnabled"
                    id="accountEnabled"
                    checked={data.accountEnabled}
                    disabled={true} // Disable the checkbox
                  />
                </div>
              </div>
              
              <div className="sm:col-span-3">
                <label
                  htmlFor="Password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                 Mot de passe
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    name="Password"
                    id="Password"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) =>
                      setData({
                        ...data,
                        passwordProfile: {
                          ...data.passwordProfile,
                          password: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="forceChangePasswordNextSignIn"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                 Forcer le changement de mot de passe lors de la prochaine connexion
                </label>
                <div className="mt-2">
                  <input
                    type="checkbox"
                    name="forceChangePasswordNextSignIn"
                    id="forceChangePasswordNextSignIn"
                    checked={data.passwordProfile.forceChangePasswordNextSignIn}
                    disabled={true} // Disable the checkbox
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

export default AddUser;
