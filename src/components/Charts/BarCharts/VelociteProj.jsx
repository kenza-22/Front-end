import React from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { useState, useEffect } from "react";
function VelociteProj({selected}){
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
  const velocities = VelocityProject.map((item) => item.velocity);

  const dataBar = {
    labels: labels,
    datasets: [{
      label: 'Velocité',
      data: velocities,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }]
    };
    const options = {
      scales:{
        y:{
          beginAtZero: true
        }
      }
      }
    return(
        <div style={{ width: "500px" }}>
<Bar data={dataBar} options={options}/>
        </div>
    );
}
export default VelociteProj;