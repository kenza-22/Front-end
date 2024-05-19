import React from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import { useState, useEffect } from "react";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
function QualiteFonctionnelle({selected}){
  const [Qualite, setQualite] = useState(null);
  useEffect(() => {
    if (selected) {
      axios
        .get(`http://localhost:5000/project/${selected}/timeConsumedRatio`)
        .then((res) => {
          console.log('Qualité fonctionnelle', res.data)
          if (Object.keys(res.data).length === 0) {
            setQualite(null); 
          } else {
            setQualite(res.data.bugToStoryRatio);
          }
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
          'rgba(176, 196, 222, 1)'
        ],
        circumference: 180,
        rotation: 270
      },
    ],
  };
return(

    <div style={{ width: "300px" }}>
       {Qualite !== null ?(     <Doughnut 
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Temps passé sur bugs % Temps passé sur dév de nv fonctionnalités",
            },
          },
        }}
        />): (<div className="text-center text-red-500">pas de données!</div>)}
        
        </div> 
)
}

export default QualiteFonctionnelle;
