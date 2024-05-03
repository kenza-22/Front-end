import React from "react";
import Effort from "../../pages/Images/effort.png"
import { useState, useEffect } from "react";
import axios from "axios";
function BugGenerDev({selected}) {
  const[BugGenr, setBugGenr] = useState(null);
  useEffect(() => {
    if (selected !== "Select a project") {
      axios
        .get(`http://localhost:5000/project/${selected}/bugEffortDevRatio`)
        .then((res) => {
          console.log("bug généré effort dev from API:", res.data);
          setBugGenr(res.data.bugEffortRatio);
          
        })
        .catch((err) => console.log(err));
      
    }
  }, [selected]);
  return (
    <div>
      <dl className="mt-0 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3">
          <div
            className="relative overflow-hidden rounded-lg bg-white px-3 pb-3 pt-3 shadow sm:px-6 sm:pt-3"
          >
            <dt>
              <div className="ml-3 absolute rounded-md bg-red-600 p-3">
             <img  class="h-6 w-6 text-white" src={Effort}/>

              </div>
              <p className="mt-5 ml-20 truncate text-sm font-medium text-gray-500">Bug Généré Par Effort de Développement</p>
            </dt>
            <dd className="ml-20 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900"> {BugGenr !== null ? BugGenr : "Chargement..."}</p>
            </dd>
          </div>
      </dl>
    </div>
  )
}
export default BugGenerDev;