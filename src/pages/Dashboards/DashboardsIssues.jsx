import React from "react";
import BarChartParType from "../../components/Charts/BarCharts/BarChartParType";
import BarChartParStatut from "../../components/Charts/BarCharts/BarChartStatut";
import BarChartHoriz from "../../components/Charts/BarChartsHoriz/BarChartHoriz";
import PieChart from "../../components/Charts/PieCharts/PieChart";
import DoughnutChart from "../../components/Charts/DoughnutCharts/DoughnutChart";
import CardChargeEstime from "../../components/Cards/CardChargeEstime";
import { Home } from "../Home";
import { Card } from "@material-tailwind/react";
function DashboardIssues(){
   
    return(
        <div className="bg-gray-50">
            <Home/>
            <div>
           <CardChargeEstime/>
            </div>
 <div>
            <Card className="mt-6 w-3/4">
            <div className="relative pl-16">
           <BarChartParType/>
           </div>
           </Card>

           <Card className="mt-6 w-3/4">
           <DoughnutChart/>
           </Card>

           <Card className="mt-6 w-3/4">
           <BarChartParStatut/>
           </Card>

        
           <Card className="mt-6 w-3/4">
           <BarChartHoriz/>
           </Card>

           <Card className="mt-6 w-3/4">
           <PieChart/>
           </Card>
</div>
        </div>
    );
}
export default DashboardIssues;