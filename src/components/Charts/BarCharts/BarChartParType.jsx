import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

function BarChartParType({ selected }) {
  const [ticketData, setTicketData] = useState([]);
  const [ticketTypes, setTicketTypes] = useState([]);
  const [ticketCounts, setTicketCounts] = useState([]);

  useEffect(() => {
    if (selected) {
      axios
        .get(`http://localhost:5000/tickets/${selected}/kpi/by-type`)
        .then((res) => {
          console.log("Tickets par type:", res.data);
          const types = res.data.map((item) => item._id);
          const counts = res.data.map((item) => item.count);
          setTicketTypes(types);
          setTicketCounts(counts);
        })
        .catch((err) => console.log(err));
    }
  }, [selected]);

  const dataBar = {
    labels: ticketTypes,
    datasets: [
      {
        label: 'Nombre de Tickets',
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
      }
    ]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div style={{ width: "500px" }}>
      <Bar data={dataBar} options={options}/>
    </div>
  );
}

export default BarChartParType;
