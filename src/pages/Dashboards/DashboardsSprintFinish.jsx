import React from "react";
import ChargeTraitBugs from "../../components/Cards/ChargeTraitBugs";
import PourcChargeConsom from'../../components/Charts/PieCharts/PourcChargeConsom'
import RatioBugs from "../../components/Charts/Jauge/RatioBugs";
import QualiteFonctionnelle from "../../components/Charts/Jauge/QualiteFonctionnelle";
import PourcTraitementBugs from "../../components/Charts/DoughnutCharts/PourcTraitementBugs";
import { useState, useEffect } from "react";
import axios from "axios";
function DashboardsSprintFinish(){
    const [selected, setSelected] = useState(null);
    const [Project, setProject] = useState([]);
    useEffect(() => {
        axios
          .get("http://localhost:5000/projects")
          .then((res) => {
            setProject(res.data);
          })
          .catch((err) => console.log(err));
      }, []);
    return(
        <div className="bg-gray-100">
                 <div className="mt-1 relative">
        <select
          className="block appearance-none w-full cursor-default bg-white py-1.5 pl-3 pr-10 text-gray-900 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          <option disabled>Select a project</option>
          {Project.map((Project) => (
            <option key={Project.id} value={Project.key}>
              {Project.name}
            </option>
          ))}
        </select>
      </div>
            <br/>
            {selected ? (
      <>
         <ChargeTraitBugs selected={selected}/>
               
               <div className="graphBox">
            <div className="box">
            <PourcChargeConsom className="justify-center" selected={selected}/>
            </div>
            <div className="box">
              <div className="flex">
            <PourcTraitementBugs selected={selected}/>
            </div>
            </div>
          </div>
          <div className="graphBox">
            <div className="box">
            <QualiteFonctionnelle selected={selected}/>
            </div>
            <div className="box">
            <RatioBugs selected={selected}/>
            </div>
          </div>    
      </>
    ) : (
      <div className="text-center text-red-500">
        Veuillez sélectionner un projet
      </div>
    )}
            


        </div>
    );
}
export default DashboardsSprintFinish;