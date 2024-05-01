import React from "react";
import { Doughnut } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
function QualiteFonctionnelle(){
  const data = {
    labels: ["Data 1", "Data 2"],
    datasets: [
      {
        label: "Count",
        data: [20, 30],
        backgroundColor: [
          "rgba(43, 63, 229, 0.8)",
          "rgba(250, 192, 19, 0.8)",
        ],
        circumference: 180,
        rotation: 270
      },
    ],
  };
return(
    <div style={{ width: "300px" }}>
        <Doughnut data={data}/>
        </div> 
)
}

export default QualiteFonctionnelle;
