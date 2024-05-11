import React from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import { useState, useEffect } from "react";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
function RatioBugs({selected}){
  const [Ratio, setRatio] = useState(0);

  useEffect(() => {
    if (selected) {
      axios
        .get(`http://localhost:5000/project/${selected}/bugToStoryRatio`)
        .then((res) => {
          setRatio(res.data.bugToStoryRatio);
        })
        .catch((err) => console.log(err));
    }
  }, [selected]);
  const remainingPercentage = 100 - Ratio;
  const data = {
    labels: ["Ratio"],
    datasets: [
      {
        label: "Count",
        data: [Ratio, remainingPercentage],
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
              text: "Ratio des bugs % Nbr US",
            },
          },
        }}
        />
        </div> 
 
)
}

export default RatioBugs;
