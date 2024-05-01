import React from "react";
import { Doughnut } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
function DoughnutChart(){
    const dataDoughnut = {
        labels: ["Data 1", "Data 2", "Data 3"],
        datasets: [
          {
            label: "Count",
            data: [20, 30, 10],
            backgroundColor: [
              "rgba(43, 63, 229, 0.8)",
              "rgba(250, 192, 19, 0.8)",
              "rgba(253, 135, 135, 0.8)",
            ],
          },
        ],
      };
    return(
        <div style={{ width: "300px" }}>
      <Doughnut data={dataDoughnut}/>
        </div>
    )
}
export default DoughnutChart;