import React from "react";
import { Pie } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { Chart, registerables } from 'chart.js';
import axios from "axios";
Chart.register(...registerables);
function PourcEffortTrait({ selected }){
const [EffortTrait, setEffortTrait] = useState(null);

  useEffect(() => {
    if (selected !== "Select a project") {
      axios.get(`http://localhost:5000/project/${selected}/effortRatio`)
      .then((res)=>{
        console.log("points effort traité from API:", res.data);
        setEffortTrait(res.data.percentage);
      })
      .catch((err) => console.log(err));
    }
  }, [selected]);
  const remainingPercentage = 100 - EffortTrait;
    const dataPie = {
      labels: [
        "% Points d'effort traité",
      ],
        datasets: [
          {
            label: "Pourcentage",
            data: [EffortTrait, remainingPercentage],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)'
             
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
              text: "Points d'effort traités % Total points d'effort"
            }
          }
        }}
        />
        </div> 
)
}

export default PourcEffortTrait;