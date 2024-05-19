import React from "react";
import { Doughnut } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { Chart, registerables } from 'chart.js';
import axios from "axios";
Chart.register(...registerables);
function PourcTraitementBugs({ selected }){
    const [Pourcentage, setPourcentage]= useState(null);

  useEffect(() => {
    if (selected !== "Select a project") {
      axios.get(`http://localhost:5000/project/${selected}/timeConsumRatio`)
      .then((res)=>{
        console.log("points effort traité from API:", res.data);
        if (Object.keys(res.data).length === 0) {
          setPourcentage(null); 
        } else {
          setPourcentage(res.data.Percentage);
        }
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
              "rgba(255, 0, 0, 1)",
              "rgba(176, 196, 222, 1)"
            ],
            borderWidth: 1,
          },
        ],
      };
return(
    <div style={{ width: "300px" }}>
      {Pourcentage !== null ? (  <Doughnut 
        data={dataPie} 
        options={{
          plugins:{
            title:{
              display: true,
              text: "Charge traitement des bugs % Charge totale"
            }
          }
        }}
        />): (<div className="text-center text-red-500">pas de données!</div>)}
      
        </div> 
)
}

export default PourcTraitementBugs;