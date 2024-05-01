import React from "react";
import VelociteSprint from "../../components/Charts/LineCharts/VelociteSprint"
import NombreBugs from "../../components/Cards/NombreBugs";
import AvancementUS from "../../components/Charts/PieCharts/AvancementUS";
import SPVsCharge from "../../components/Cards/SPVsCharge";
import { Home } from "../Home";
import { Card } from "@material-tailwind/react";
function DashboardsSprintProg(){
    return(
        <div className="bg-gray-50">
             {/* <Home/>  */}
        <Card className="mt-6 w-3/4">
        <VelociteSprint/>
        </Card>

           <Card className="mt-6 w-3/4">
           <AvancementUS/>
           </Card>
           
           <NombreBugs/>
           <SPVsCharge/>
        </div>
    );
}
export default DashboardsSprintProg;