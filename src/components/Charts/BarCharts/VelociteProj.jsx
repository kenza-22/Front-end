import React from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { useState, useEffect } from "react";

function VelociteProj({ selected }) {
  const [VelocityProject, setVelocityProject] = useState([]);

  useEffect(() => {
    if (selected) {
      axios
        .get(`http://localhost:5000/project/${selected}/velocity`)
        .then((res) => {
          console.log("Velocity project:", res.data);
          setVelocityProject(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [selected]);

  const labels = VelocityProject.map((item) => item.sprint);
  console.log('data', labels)
  const velocities = VelocityProject.map((item) => item.velocity);

  const customColors = [
    'rgba(255, 99, 132, 0.2)', 
    'rgba(255, 159, 64, 0.2)', 
    'rgba(255, 205, 86, 0.2)', 
    'rgba(75, 192, 192, 0.2)', 
    'rgba(54, 162, 235, 0.2)', 
    'rgba(153, 102, 255, 0.2)', 
    'rgba(201, 203, 207, 0.2)', 
  ];

  const dataBar = {
    labels: labels,
     datasets: [
      {
      label: "Vélocité agile",
      data: velocities,
     backgroundColor: customColors,
       borderColor: customColors,
      borderWidth: 1,
    }
  ]
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: "600px" }}>
      {VelocityProject.length > 0 ? (
        <Bar
          data={dataBar}
          options={{
            ...options,
            plugins: {
              legend: {
                display: false, 
              },
              title: {
                display: true,
                text: "Velocité Agile",
              },
            },
          }}
        />
      ) : (
        <div className="text-center text-red-500">
          pas de données!
        </div>
      )}
    </div>
  );
  
}

export default VelociteProj;