import React from "react";
import Time from '../../pages/Images/iconTime.png'
import { useState, useEffect } from "react";
import axios from "axios";
function ChargeTraitBugs({selected}) {
  const [ChargeTrait, setChargeTrait] = useState(null);
  
  useEffect(() => {
    if (selected !== "Select a project") {
      axios
        .get(`http://localhost:5000/project/${selected}/bugTicketsTimeConsumed`)
        .then((res) => {
          console.log("charge traitement des bugs :", res.data);
          setChargeTrait(res.data.totalTempsConsommé);
        })
        .catch((err) => console.log(err));
      
    }
  }, [selected]);
  return (
    <div>
      <dl className="mt-0 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          <div
            className="relative overflow-hidden rounded-lg bg-white px-3 pb-3 pt-3 shadow sm:px-6 sm:pt-3"
          >
            <dt>
              <div className="ml-3 absolute rounded-md bg-red-600 p-3">
              <img src={Time} className="h-6 w-6 text-white"/>

              </div>
              <p className="mt-5 ml-20 truncate text-sm font-medium text-gray-500">Charge Traitement Des Bugs</p>
            </dt>
            <dd className="ml-20 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{ChargeTrait !== null ? ChargeTrait : "Chargement..."}</p>
            </dd>
          </div>
      </dl>
    </div>
  )
}
export default ChargeTraitBugs;