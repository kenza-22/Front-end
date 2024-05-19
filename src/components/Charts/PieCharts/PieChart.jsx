import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import axios from "axios";

Chart.register(...registerables);

function PieChart({ selected }) {
  const [ticketStatut, setTicketStatut] = useState([]);
  const [ticketCounts, setTicketCounts] = useState([]);

  useEffect(() => {
    if (selected) {
      axios
        .get(
          `http://localhost:5000/tickets/${selected}/kpi/complexity-by-statut`
        )
        .then((res) => {
          const statut = res.data.map((item) => item._id);
          const counts = res.data.map((item) => item.totalStoryPoints);
          setTicketStatut(statut);
          setTicketCounts(counts);
        })
        .catch((err) => console.log(err));
    }
  }, [selected]);

  const customColors = ticketStatut.map((statut) => {
    switch (statut) {
      case "Terminé(e)":
        return "RGBA(60, 179, 113, 1)";
      case "À faire":
        return "rgba(253, 159, 107, 1)";
      case "Assigned To Run":
        return "rgba(192, 192, 192, 1)";
      case "Backlog":
        return "rgba(255, 163, 101, 1)";
      case "En cours":
        return "rgba(255, 215, 0, 1)";
      case "In Rework":
        return "rgba(255, 228, 181, 1)";
      case "New Story":
        return "rgba(240, 128, 128, 1)";
      case "Ouvert":
        return "rgba(255, 140, 0, 1)";
      case "Ready For Test":
        return "rgba(238, 232, 170, 1)";
      case "Removed From Scope":
        return "rgba(128, 128, 128, 1)";
      case "Story To Do":
        return "rgba(244, 164, 96, 1)";
      case "Released":
        return "rgba(152, 251, 152, 1)";
      case "Fermée":
        return "rgba(143, 188, 143, 1)";
      default:
        return "rgba(0, 0, 0, 1)"; // Default color if status doesn't match any case
    }
  });

  const dataPie = {
    labels: ticketStatut,
    datasets: [
      {
        label: "Nombre de Story Points",
        data: ticketCounts,
        backgroundColor: customColors,
        borderColor: "#FFFF",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      {ticketStatut.length === 0 ? (
        <div className="text-center text-red-500">Pas de données!</div>
      ) : (
        <Pie
          data={dataPie}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Complexité des tickets par statut",
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default PieChart;
