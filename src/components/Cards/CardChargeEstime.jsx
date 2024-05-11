import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
const TopCard = ({ title, tagContent, tagColor, prefix }) => {
  return (
    <div className="w-1/4 px-4 mb-8">
      <div className="bg-white shadow p-4 text-center">
        <h3 className="text-purple-800 font-bold mb-2">{title}</h3>
        <hr className="border-t border-gray-300 mb-2" />
        <div className="flex justify-between items-center">
          <div className="text-left">{prefix}</div>
          <div className="w-1/2">
            <span className={`px-3 py-1 inline-block rounded ${tagColor}`}>
              {tagContent}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
function CardChargeEstime({selected}) {
 
  const [ChargeEst, setChargeEst] = useState(null);

      useEffect(() => {
        if (selected !== "Select a project") {
          axios
            .get(`http://localhost:5000/tickets/${selected}/kpi/estimated-time`)
            .then((res) => {
              console.log("Charge estimé:", res.data);
              setChargeEst(res.data[0].totalEstimatedTime);
            })
            .catch((err) => console.log(err));
        }
      }, [selected]);
  return (
    <div className="justify-center">
<TopCard title={"Charge Estimé"} tagColor={"bg-cyan-500 text-white"} prefix={"Nombre"} tagContent={ChargeEst} />
    </div>
    
  )
}
export default CardChargeEstime;
