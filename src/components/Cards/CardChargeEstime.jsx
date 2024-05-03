import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
function CardChargeEstime({selected}) {
 
  const [ChargeEst, setChargeEst] = useState(null);

      useEffect(() => {
        if (selected !== "Select a project") {
          axios
            .get(`http://localhost:5000/tickets/${selected}/kpi/estimated-time`)
            .then((res) => {
              console.log("Charge estimé:", res.data);
              setChargeEst(res.data.totalEstimatedTime);
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
             
<div className="ml-3 absolute rounded-md bg-indigo-500 p-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 text-white" aria-hidden="true">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

              </div>
              <p className="mt-5 ml-20 truncate text-sm font-medium text-gray-500">Charge Estimé</p>
            </dt>
            <dd className="ml-20 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{ChargeEst !== null ? ChargeEst : "Chargement..."}</p>
            </dd>
          </div>
      </dl>
    </div>
  )
}
export default CardChargeEstime;
