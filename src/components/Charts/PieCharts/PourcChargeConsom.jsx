import React from "react";
import { Pie } from "react-chartjs-2";
import { useState, useEffect } from "react";
import axios from "axios";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
function PourcChargeConsom({selected}){
  const [PourcCharge, setPourcCharge] = useState(0);

  useEffect(() => {
    if (selected) {
      axios
        .get(`http://localhost:5000/project/${selected}/timeRatio`)
        .then((res) => {
          console.log("Poucentage charge:", res.data);
          setPourcCharge(res.data.percentage);
        })
        .catch((err) => console.log(err));
    }
  }, [selected]);
 
    const dataPie = {
      labels: ["Charge consommé % Charge estimé"],
        datasets: [
          {
            label: "Count",
            data: [PourcCharge],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };
return(
    <div style={{ width: "300px" }}>
        <Pie data={dataPie} />
        </div> 
)
}

export default PourcChargeConsom;