import React from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import { useState, useEffect } from "react";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
function AvancementUS({selected}){
const [AvancementUS, setAvancementUS] = useState(null);
useEffect(()=>{
  if(selected){
    axios
        .get(`http://localhost:5000/project/${selected}/storyCompletionRatio`)
        .then((res) => {
          console.log("Avancement US :", res.data);
          if (Object.keys(res.data).length === 0) {
            setAvancementUS(null); 
          } else {
            setAvancementUS(res.data.ratio);
          }
        })
        .catch((err) => console.log(err));
  }
},[selected])
const remainingPercentage = 100 - AvancementUS;
    const dataPie = {
        labels: ["Avancement des Travaux: User Story"],
        datasets: [
          {
            label: "# of Votes",
            data: [AvancementUS, remainingPercentage],
            backgroundColor: [
              "rgba(255, 160, 122, 1)",
              "rgba(176, 196, 222, 1)"
            ],
            borderWidth: 1,
          },
        ],
      };
return(
  <div style={{ width: "300px" }}>
  {AvancementUS !== null ? (
    <Pie 
    data={dataPie} 
    options={{
      plugins: {
        title: {
          display: true,
          text: "Avancement des Travaux: User Story",
        },
      },
    }}
    />
  ) : (
    <div className="text-center text-red-500">pas de données!</div>
  )}
</div>
)
}

export default AvancementUS;