import React from "react";
import ChargeTraitBugs from "../../components/Cards/ChargeTraitBugs";
import Burndown from "../../components/Charts/LineCharts/Burndown";
import PourcChargeConsom from'../../components/Charts/PieCharts/PourcChargeConsom'
import RatioBugs from "../../components/Charts/Jauge/RatioBugs";
import QualiteFonctionnelle from "../../components/Charts/Jauge/QualiteFonctionnelle";
import BugGenerDev from "../../components/Cards/BugGenerDev";
import { Home } from "../Home";
import { Card } from "@material-tailwind/react";
function DashboardsSprintFinish(){
    return(
        <div className="bg-gray-50">
             {/* <Home/>  */}
            
            <ChargeTraitBugs/>
            <Card className="mt-6 w-3/4">
            <Burndown/>
            </Card>

            <Card className="mt-6 w-3/4">
            <PourcChargeConsom/>
            </Card>

            <Card className="mt-6 w-3/4">
            <QualiteFonctionnelle/>
            </Card>

            <Card className="mt-6 w-3/4">
            <RatioBugs/>
            </Card>

           
            <BugGenerDev/>
            


        </div>
    );
}
export default DashboardsSprintFinish;