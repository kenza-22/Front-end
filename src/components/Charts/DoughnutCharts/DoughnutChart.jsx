import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";

function DoughnutChart({ selected }) {
  const [storyPointData, setStoryPointData] = useState([]);

  useEffect(() => {
    if (selected) {
      axios
        .get(`http://localhost:5000/tickets/${selected}/kpi/complexity-by-type`)
        .then((res) => {
          console.log("Story points par type:", res.data);
          setStoryPointData(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [selected]);

  const dataDoughnut = {
    labels: storyPointData.map((item) => item._id),
    datasets: [
      {
        label: "Nombre de Story Points",
        data: storyPointData.map((item) => item.totalStoryPoints),
        backgroundColor: [
          "rgba(80, 55, 90, 0.8)",
          "rgba(100, 30, 40, 0.8)",
          "rgba(20, 255, 6, 0.8)",
          "rgba(250, 70, 100, 0.8)",
          "rgba(255, 10, 150, 0.8)",
          // Ajoutez plus de couleurs si nécessaire
        ],
      },
    ],
  };

  return (
    <div style={{ width: "300px" }}>
      <Doughnut data={dataDoughnut} />
    </div>
  );
}

export default DoughnutChart;
