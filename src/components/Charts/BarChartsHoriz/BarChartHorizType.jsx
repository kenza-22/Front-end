import React from "react";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { Chart, registerables } from "chart.js";
import axios from "axios";
import { useState, useEffect } from "react";
Chart.register(...registerables);
function BarChartHorizType({ selected }) {
  const [ticketTypes, setTicketTypes] = useState([]);
  const [timeCount, setTimeCount] = useState([]);

  useEffect(() => {
    if (selected) {
      axios
        .get(
          `http://localhost:5000/tickets/${selected}/kpi/estimated-time-by-type`
        )
        .then((res) => {
          console.log("Tickets par type:", res.data);
          const types = res.data.map((item) => item._id);
          const Estimated = res.data.map((item) => item.totalEstimatedTime);
          setTicketTypes(types);
          setTimeCount(Estimated);
        })
        .catch((err) => console.log(err));
    }
  }, [selected]);
  const customColors = ticketTypes.map((type) => {
    if (type === "Bug") {
      return "rgba(255, 0, 0, 0.5)";
    } else {
      if (type === "Sous-tâche") return "rgba(176, 224, 230, 1)";
      else {
        if (type === "Story") return "rgba(216, 191, 216, 1)";
        else {
          if (type === "Tâche") return "rgba(176, 196, 222, 1)";
          else {
            if (type === "Epic") return "rgba(138, 43, 226, 1)";
            else {
              if (type === "Support") return "rgba(255, 140, 0, 1)";
              else {
                if (type === "Tâche technique") return "rgba(100, 149, 237, 1)";
                else {
                  if (type === "Test task") return "rgba(255, 255, 0, 1)";
                  else {
                    if (type === "Testing task") return "rgba(255, 215, 0, 1)";
                    else {
                      if (type === "Bogue") return "rgba(205, 92, 92, 1)";
                      else {
                        if (type === "Bug Sub Task")
                          return "rgba(255, 67, 67, 1)";
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });
  const dataBar = {
    labels: ticketTypes,
    datasets: [
      {
        axis: "y",
        label: "Charge estimé",
        data: timeCount,
        fill: false,
        backgroundColor: customColors,
        borderColor: customColors,
        borderWidth: 1,
      },
    ],
  };
  const options = {
    indexAxis: "y",
  };

  return (
    <div>
      {ticketTypes.length === 0 ? (
        <div className="text-center text-red-500">Pas de données!</div>
      ) : (
        <Bar
          data={dataBar}
          options={{
            ...options,
            plugins: {
              title: {
                display: true,
                text: " Charge estimé par type",
              },
            },
          }}
        />
      )}
    </div>
  );
}
export default BarChartHorizType;
