import React from "react";
import { Pie } from "react-chartjs-2";
import { useState, useEffect } from "react";
import axios from "axios";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
function PourcChargeConsom({selected}){
  const [PourcCharge, setPourcCharge] = useState(null);

  useEffect(() => {
    if (selected) {
      axios
        .get(`http://localhost:5000/project/${selected}/timeRatioFinish`)
        .then((res) => {
          console.log("Poucentage charge:", res.data);
          if (Object.keys(res.data).length === 0) {
            setPourcCharge(null); 
          } else {
            setPourcCharge(res.data.percentage);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [selected]);
  const remainingPercentage = 100 - PourcCharge;
    const dataPie = {
      labels: ["Charge consommé % Charge estimé"],
        datasets: [
          {
            label: "Count",
            data: [PourcCharge, remainingPercentage],
            backgroundColor: [
              "rgba(216, 191, 216, 1)",
              "rgba(173, 216, 230, 1)"
            ],
            borderWidth: 1,
          },
        ],
      };
return(
    <div style={{ width: "300px" }}>
        {PourcCharge !== null ?(     <Pie 
        data={dataPie} 
        options={{
          plugins: {
            title: {
              display: true,
              text: "Charge consommée % charge estimé",
            },
          },
        }}
        />): (<div className="text-center text-red-500">pas de données!</div>)}
     
        </div> 
)
}

export default PourcChargeConsom;