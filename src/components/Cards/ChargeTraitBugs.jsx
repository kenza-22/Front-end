import React from "react";
import Time from '../../pages/Images/iconTime.png'
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
function ChargeTraitBugs({selected}) {
  const [ChargeTrait, setChargeTrait] = useState(null);
  const[BugGenr, setBugGenr] = useState(null);
  useEffect(() => {
    if (selected !== "Select a project") {
      axios
        .get(`http://localhost:5000/project/${selected}/bugEffortDevRatio`)
        .then((res) => {
          console.log("bug généré effort dev from API:", res.data);
          setBugGenr(res.data.bugEffort);
          
        })
        .catch((err) => console.log(err));
      
    }
  }, [selected]);
  useEffect(() => {
    if (selected !== "Select a project") {
      axios
        .get(`http://localhost:5000/project/${selected}/bugTicketsTimeConsumed`)
        .then((res) => {
          console.log("charge traitement des bugs :", res.data);
          setChargeTrait(res.data.totalTempsConsomme);
        })
        .catch((err) => console.log(err));
      
    }
  }, [selected]);
  return (
    <div className="flex flex-wrap justify-center">
      <TopCard title={"Charge Traitement Des Bugs"} tagColor={"bg-red-500 text-white"} prefix={"Nombre"} tagContent={ChargeTrait} />
      <TopCard title={"Bug Généré Par Effort de Dev"} tagColor={"bg-red-500 text-white"} prefix={"Nombre"} tagContent={BugGenr} />
    </div>
  )
}
export default ChargeTraitBugs;