import React from "react";
import { Home } from "../Home";
import SuivieProj from "../../components/Cards/SuivieProj";
import VelociteProj from "../../components/Charts/LineCharts/VelociteProj";
import AvancementTemps from "../../components/Charts/PieCharts/AvancementTemps";
import SPVsCharge from "../../components/Cards/SPVsCharge";
import { Card } from "@material-tailwind/react";
function DashboardsProject(){
    return(
        <div className="bg-gray-50">
             {/* <Home/> */}
    
    <SuivieProj/>
  

    <Card  className="mt-6 w-3/4">
    <VelociteProj/>
    </Card>

    <Card  className="mt-6 w-3/4">
    <AvancementTemps/>
    </Card>

    <SPVsCharge/>
    
        </div>
    );
}
export default DashboardsProject;