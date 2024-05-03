import React from "react";
import { Pie } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { Chart, registerables } from 'chart.js';
import axios from "axios";
Chart.register(...registerables);
function PieChart({ selected }){
  const [storyPointData, setStoryPointData] = useState([]);

  useEffect(() => {
    if (selected) {
      axios
        .get(`http://localhost:5000/tickets/${selected}/kpi/complexity-by-statut`)
        .then((res) => {
          setStoryPointData(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [selected]);
    const dataPie = {
        labels: storyPointData.map((item) => item._id),
        datasets: [
          {
            label: "Nombre de Story Points",
            data: storyPointData.map((item) => item.totalStoryPoints),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };
return(
    <div style={{ width: "300px" }}>
        <Pie data={dataPie} />
        </div> 
)
}

export default PieChart;