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
        <div className="bg-gray-50">
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
            {/* <Home/> */}

            <div>
           <CardChargeEstime selected={selected}/>
            </div>
 <div>
            <Card className="mt-6 w-3/4">
            <div className="relative pl-16">
           <BarChartParType selected={selected}/>
           </div>
           </Card>

           <Card className="mt-6 w-3/4">
           <DoughnutChart selected={selected}/>
           </Card>

           <Card className="mt-6 w-3/4">
           <BarChartParStatut selected={selected}/>
           </Card>

        
           <Card className="mt-6 w-3/4">
           <BarChartHoriz selected={selected}/>
           </Card>
           <Card className="mt-6 w-3/4">
           <BarChartHorizType selected={selected}/>
           </Card>

           <Card className="mt-6 w-3/4">
           <PieChart selected={selected}/>
           </Card>
</div>
        </div>
    );
}
export default DashboardIssues;