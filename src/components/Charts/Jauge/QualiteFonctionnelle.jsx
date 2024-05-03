import React from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import { useState, useEffect } from "react";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
function QualiteFonctionnelle({selected}){
  const [Qualite, setQualite] = useState(0);

  useEffect(() => {
    if (selected) {
      axios
        .get(`http://localhost:5000/project/${selected}/timeConsumedRatio`)
        .then((res) => {
          console.log('Qualité fonctionnelle', res.data)
          setQualite(res.data.ratio);
        })
        .catch((err) => console.log(err));
    }
  }, [selected]);
  const data = {
    labels: ["Qualité Fonctionnelle"],
    datasets: [
      {
        label: "Count",
        data: [Qualite],
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
