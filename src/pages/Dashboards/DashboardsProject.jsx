import React from "react";
import { Home } from "../Home";
import SuivieProj from "../../components/Cards/SuivieProj";
import VelociteProj from "../../components/Charts/BarCharts/VelociteProj";
import AvancementTemps from "../../components/Charts/PieCharts/AvancementTemps";
import SPVsCharge from "../../components/Cards/SPVsCharge";
import { Card } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import axios from "axios";
function DashboardsProject(){
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
            
             <SuivieProj/>
  
   <div className="flex">
    <Card  className="mt-6 w-3/4 mr-8">
    <VelociteProj selected={selected}/>
    </Card>

    <Card  className="mt-6 w-3/4">
    <AvancementTemps selected={selected}/>
    </Card>
    </div>
    <SPVsCharge selected={selected}/>
    
        </div>
    );
}
export default DashboardsProject;