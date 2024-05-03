import React from "react";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { Chart, registerables, scales } from 'chart.js';
import axios from "axios";
import { useState, useEffect } from "react";
Chart.register(...registerables);
function BarChartParStatut({ selected }) {
  const [ticketData, setTicketData] = useState([]);
  const [ticketStatut, setTicketStatut] = useState([]);
  const [ticketCounts, setTicketCounts] = useState([]);

  useEffect(() => {
    if (selected) {
      axios
        .get(`http://localhost:5000/tickets/${selected}/kpi/by-statut`)
        .then((res) => {
          console.log("Tickets par type:", res.data);
          const statut = res.data.map((item) => item._id);
          const counts = res.data.map((item) => item.count);
          setTicketStatut(statut);
          setTicketCounts(counts);
        })
        .catch((err) => console.log(err));
    }
  }, [selected]);
    const dataBar = {
      labels: ticketStatut,
      datasets: [{
        label: 'My First Dataset',
        data: ticketCounts,
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
  return (
    <>
            <div style={{ width: "500px" }}>
            <Bar data={dataBar} options={options}/>
        </div>
        
    </>
  );
};
export default BarChartParStatut;
