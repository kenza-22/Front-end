import React, { useState, useEffect } from "react";
import BarChartParType from "../../components/Charts/BarCharts/BarChartParType";
import BarChartParStatut from "../../components/Charts/BarCharts/BarChartStatut";
import BarChartHoriz from "../../components/Charts/BarChartsHoriz/BarChartHoriz";
import PieChart from "../../components/Charts/PieCharts/PieChart";
import DoughnutChart from "../../components/Charts/DoughnutCharts/DoughnutChart";
import CardChargeEstime from "../../components/Cards/CardChargeEstime";
import BarChartHorizType from "../../components/Charts/BarChartsHoriz/BarChartHorizType";
import axios from "axios";
import { Home } from "../Home";
import { Card } from "@material-tailwind/react";

function DashboardIssues(){
    const [selected, setSelected] = useState(null);
    const [Project, setProject] = useState([]);
    useEffect(() => {
        axios
          .get("http://localhost:5000/projects")
          .then((res) => {
            console.log("All Projects from API:", res.data);
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

            
           <CardChargeEstime selected={selected}/>
           
     <br/><br/>
            <div className="flex">
           <BarChartParType selected={selected}/>
           <div className="mb-15 ml-auto">
           <BarChartParStatut selected={selected}/>
           </div>
           </div>
           <br/><br/>
           <div className="flex">
           <BarChartHoriz selected={selected}/>
           <div className="ml-auto">
           <BarChartHorizType selected={selected}/>
           </div>
           </div>
           <br/><br/>

            <div className="flex">
            <DoughnutChart selected={selected}/>
           <div className="ml-auto">
           <PieChart selected={selected}/>
           </div>
           </div>

        </div>
    );
}
export default DashboardIssues;