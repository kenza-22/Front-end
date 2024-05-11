import React from "react";
import { Pie } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { Chart, registerables } from 'chart.js';
import axios from "axios";
Chart.register(...registerables);
function PourcTraitBugs({ selected }){
    const [Pourcentage, setPourcentage]= useState(null);

  useEffect(() => {
    if (selected !== "Select a project") {
      axios.get(`http://localhost:5000/project/${selected}/timeConsumRatio`)
      .then((res)=>{
        console.log("points effort traité from API:", res.data);
        setPourcentage(res.data.Percentage);
      })
      .catch((err) => console.log(err));
    }
  }, [selected]);
  const remainingPercentage = 100 - Pourcentage;
    const dataPie = {
        labels: ["% Traitement des bugs"],
        datasets: [
          {
            label: "Pourcentage",
            data: [Pourcentage, remainingPercentage],
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
        <Pie 
        data={dataPie} 
        options={{
          plugins:{
            title:{
              display: true,
              text: "Charge traitement des bugs % Charge totale"
            }
          }
        }}
        />
        </div> 
)
}

export default PourcTraitBugs;