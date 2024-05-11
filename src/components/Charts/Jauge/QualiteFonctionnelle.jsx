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
  const remainingPercentage = 100 - Qualite;
  const data = {
    labels: ["Qualité Fonctionnelle"],
    datasets: [
      {
        label: "Count",
        data: [Qualite, remainingPercentage],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)'
        ],
        circumference: 180,
        rotation: 270
      },
    ],
  };
return(

    <div style={{ width: "300px" }}>
        <Doughnut 
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Temps passé sur bugs % Temps passé sur dév de nv fonctionnalités",
            },
          },
        }}
        />
        </div> 
)
}

export default QualiteFonctionnelle;
