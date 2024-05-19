import React from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import { useState, useEffect } from "react";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
function RatioBugs({selected}){
  const [Ratio, setRatio] = useState(null);

  useEffect(() => {
    if (selected) {
      axios
        .get(`http://localhost:5000/project/${selected}/bugToStoryRatio`)
        .then((res) => {
          if (Object.keys(res.data).length === 0) {
            setRatio(null); 
          } else {
            setRatio(res.data.bugToStoryRatio);
          }
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
          'rgba(255, 20, 147, 1)',
          'rgba(176, 196, 222, 1)'
        ],
        circumference: 180,
        rotation: 270
      },
    ],
  };
return(
  <div style={{ width: "300px" }}>
  {Ratio !== null ?(  <Doughnut 
    data={data}
    options={{
      plugins: {
        title: {
          display: true,
          text: "Ratio des bugs % Nbr US",
        },
      },
    }}
    />): (<div className="text-center text-red-500">pas de données!</div>)}
    </div>
 
)
}

export default RatioBugs;
