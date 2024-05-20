import React from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import { useState, useEffect } from "react";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
function AvancementTemps({selected}){
  const [AvancementTemps, setAvancementTemps] = useState(null);
  useEffect(() => {
    if (selected) {
      axios
        .get(`http://localhost:5000/project/${selected}/timeRatio`)
        .then((res) => {
          console.log("Avancement temps :", res.data);
          if (Object.keys(res.data).length === 0) {
            setAvancementTemps(null); 
          } else {
            setAvancementTemps(res.data.ratio);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [selected]);
  const remainingPercentage = 100 - AvancementTemps;
    const dataPie = {
        labels: ["Avancement des Travaux: Temps"],
        datasets: [
          {
            label: "# of Votes",
            data: [AvancementTemps, remainingPercentage],
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
  {AvancementTemps !== null ? (
    <Pie
      data={dataPie}
      options={{
        plugins: {
          title: {
            display: true,
            text: "Avancement des Travaux: Temps",
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

export default AvancementTemps;