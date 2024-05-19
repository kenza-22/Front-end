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
        if (Object.keys(res.data).length === 0) {
          setEffortTrait(null); 
        } else {
          setEffortTrait(res.data.percentage);
        }
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
              "rgba(154, 205, 50, 1)",
              "rgba(176, 196, 222, 1)"
             
            ],
            
            borderWidth: 1,
          },
        ],
      };
return(
    <div style={{ width: "300px" }}>
      {EffortTrait !== null ? (<Pie 
        data={dataPie} 
        options={{
          plugins:{
            title:{
              display: true,
              text: "Points d'effort traités % Total points d'effort"
            }
          }
        }}
        />): ( <div className="text-center text-red-500">pas de données!</div>)}
        
        </div> 
)
}

export default PourcEffortTrait;